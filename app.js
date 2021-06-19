const express = require("express");
const path = require('path');
const SerialPort = require("serialport");
const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const { StringStream } = require('scramjet');
let CONEXAO = 0;

const app = require("express")();
const http = require("http").Server(app); 
const io = require("socket.io")(http);

http.listen("3000", function(){
	console.log("Servidor on-line em http://localhost:3000 - para sair Ctrl+C.");
});
app.disable('x-powered-by'); // afastar rotinas mais simples de varredura e ataques automatizados

//Configurando o CORS
app.use(cors());

//Configurando pastas dos arquivos estáticos.
app.use(express.static(__dirname + '/public'));

//Configurando o Morgan
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Adquirindo as Rotas
const index = require('./routes/index');

//Configurando as Rotas
app.use('/', index);


/**
 * mySerial - cria uma porta serial para comunicação com o Arduíno, define a velocidade de 
 * comunicação e interpreta o pular linha.
 * Onde eu estou colocando "/dev/ttyACM8" você deve substituir essa informação pela sua porta 
 * serial, onde o seu Arduíno está conectado. 
 */
 const mySerial = new SerialPort('COM4', {
 	baudRate : 9600,
 	parser : new SerialPort.parsers.Readline("\n")
 });


 mySerial.on("open", function(){
	console.log("Arduino conexão estabelecida!");
});


/**
 * io.on - Recebe conexão de cliente.
 */
 io.on("connection", function(socket){
	 console.log("Usuário está conectádo!");

	 socket.on("comecar", () => {
		if (CONEXAO === 0){		
			mySerial.pipe(new StringStream) // pipe the stream to scramjet StringStream
			.lines('\n')                  // split per line
			.each(                        // send message per every line
			data => io.sockets.emit('dadosArduino', data)
			);
			CONEXAO = 1;
		}

		else if (CONEXAO === 1) {
			mySerial.resume(function (err) {
				console.log('port closed', err);
			});	
		}
     });

	 socket.on("parar", () => {
        mySerial.pause(function (err) {
			console.log('port closed', err);
		});
     });
 });

 module.exports = app;