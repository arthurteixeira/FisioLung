const fs = require('fs');
const path = require('path');

const { sessoes } = require('../models/');

module.exports = {
    async create(req, res){
        let { 
            paciente_id,
            fisioterapeuta_id,
            tecnica_id,
            sensor,
            freq_respiratoria_inicial, 
			freq_cardiaca_inicial, 
			sat_oxigenio_inicial, 
			pressao_arterial_inicial, 
			grau_inicial,
            vibracao_pico_x,
            vibracao_pico_y,
            vibracao_pico_z,
            vibracao_tempo,
            vibracao_media_x,
            vibracao_media_y,
            vibracao_media_z,
            vibracao_media_pico_x,
            vibracao_media_pico_y,
            vibracao_media_pico_z,
            vibracao_tempo_total,
        } = req.body;

        if (tecnica_id == 'null')
            tecnica_id = null;

        if(freq_respiratoria_inicial == "")
            freq_respiratoria_inicial = null;
        
        if(freq_cardiaca_inicial == "")
            freq_cardiaca_inicial = null;
        
        if(sat_oxigenio_inicial == "")
            sat_oxigenio_inicial = null;
        
        if(pressao_arterial_inicial == "")
            pressao_arterial_inicial = null;

        const sessao = await sessoes.create({
            paciente_id,
            fisioterapeuta_id,
            tecnica_id,
            sensor,
            freq_respiratoria_inicial, 
			freq_cardiaca_inicial, 
			sat_oxigenio_inicial, 
			pressao_arterial_inicial, 
			grau_inicial,
            vibracao_pico_x,
            vibracao_pico_y,
            vibracao_pico_z,
            vibracao_tempo,
            vibracao_media_x,
            vibracao_media_y,
            vibracao_media_z,
            vibracao_media_pico_x,
            vibracao_media_pico_y,
            vibracao_media_pico_z,
            vibracao_tempo_total,
        });
        
        const writeStream = fs.createWriteStream(path.resolve(__dirname, `../logs/sessao-${sessao.id}.txt`));

        writeStream.write(`Id\n`);
        writeStream.write(`${sessao.id}\n`);
        writeStream.write(`Paciente\n`);
        writeStream.write(`${paciente_id}\n`);
        writeStream.write(`Fisioterapeuta\n`);
        writeStream.write(`${fisioterapeuta_id}\n`);
        console.log(sensor);
        if(sensor === 'true') {
            writeStream.write(`Vibracao X\n`);
            vibracao_pico_x.forEach(value => writeStream.write(`${value}\n`));
            writeStream.write(`Vibracao Y\n`);
            vibracao_pico_y.forEach(value => writeStream.write(`${value}\n`));
            writeStream.write(`Vibracao Z\n`);
            vibracao_pico_z.forEach(value => writeStream.write(`${value}\n`));
            
        } else if (sensor === 'false'){
            writeStream.write(`Vibracao\n`);
            vibracao_pico_x.forEach(value => writeStream.write(`${value}\n`));
        }

        writeStream.write(`Tempo\n`);
        vibracao_tempo.forEach(value => writeStream.write(`${value}\n`));

        writeStream.end();

        res.json(sessao);
    }
};