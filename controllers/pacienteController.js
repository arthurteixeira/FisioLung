const { pacientes } = require('../models/');

module.exports = {
    async create(req, res){
        let { name, cpf, data_nascimento, sexo, peso, patologia, sus, fone} = req.body;

        if(data_nascimento == '' || data_nascimento == undefined)
            data_nascimento = null;
        if(sexo == '')
            sexo = null;
        if(peso == '')
            peso = null;
        if(patologia == '')
            patologia = null;
        if(sus == '')
            sus = null;
        if(fone == '')
            fone = null;

        const paciente = await pacientes.create({
            name,
            cpf,
            data_nascimento,
            sexo,
            peso,
            patologia,
            sus,
            fone,
        });
        
        res.json(paciente);
    }
};