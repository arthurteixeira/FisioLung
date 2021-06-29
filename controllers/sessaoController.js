const { sessoes } = require('../models/');

module.exports = {
    async create(req, res){
        let { 
            paciente_id,
            fisioterapeuta_id,
            tecnica_id,
            sensor,
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

        const sessao = await sessoes.create({
            paciente_id,
            fisioterapeuta_id,
            tecnica_id,
            sensor,
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
        
        res.json(sessao);
    }
};