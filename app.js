 // Express é um framework que permite cria app web com facilidade com node.js.
 const app = require("express")();
 const express = require("express");
 
 // Na pasta public é onde colocaremos o arquivo Chart.js
 app.use(express.static(__dirname + '/public'));
 
 const http = require("http").Server(app);
 const io = require("socket.io")(http);
 
 const SerialPort = require("serialport");
 
 
/**
 * app.get - 
 */
 app.get("/", function(req, res){
 	res.sendFile(__dirname + '/public/views/index.html');
 });
 
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
 
/**
 * mySerial.on - Verifiica conexão com o arduino e informa no console.
 */
 mySerial.on("open", function(){
 	console.log("Arduino conexão estabelecida!");
 });
 
/**
 * mySerial.on -
 */
 mySerial.on("data", function(data){
 	// Recebe os dados enviados pelo arduino e exibe no console.
 	console.log(parseInt(data));
 	io.emit("dadosArduino", { // Emite um evento e o objeto data recebe valor.
 		valor: parseInt(data)
 	});
 });
 
/**
 * io.on - Recebe conexão de cliente.
 */
 io.on("connection", function(socket){
 	console.log("Usuário está conectádo!");
 });
 
/**
 * http.linten -  
 */
 http.listen("3000", function(){
 	console.log("Servidor on-line em http://localhost:3000 - para sair Ctrl+C.");
 });