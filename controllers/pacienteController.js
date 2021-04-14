const { pacientes } = require('../models/');

module.exports = {
    async create(req, res){
        const { name, cpf } = req.body;

        const paciente = await pacientes.create({
            name,
            cpf,
        });
        
        res.json(paciente);
    }
};