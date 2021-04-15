const { sessoes } = require('../models/');

module.exports = {
    async create(req, res){
        const { 
            paciente_id,
            fisioterapeuta_id,
            vibracao_pico_x,
            vibracao_pico_y,
            vibracao_pico_z,
            vibracao_tempo,
            vibracao_tempo_total,
        } = req.body;

        const sessao = await sessoes.create({
            paciente_id,
            fisioterapeuta_id,
            vibracao_pico_x,
            vibracao_pico_y,
            vibracao_pico_z,
            vibracao_tempo,
            vibracao_tempo_total,
        });
        
        res.json(sessao);
    }
};