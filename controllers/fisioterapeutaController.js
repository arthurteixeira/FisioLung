const { fisioterapeutas } = require('../models/');

module.exports = {
    async create(req, res){
        let { name, cpf, data_nascimento, sexo, crefito, fone} = req.body;

        if(data_nascimento == '' || data_nascimento == undefined)
            data_nascimento = null;
        if(sexo == '')
            sexo = null;
        if(crefito == '')
            crefito = null;
        if(fone == '')
            fone = null;

        await fisioterapeutas.create({
            name,
            cpf,
            data_nascimento,
            sexo,
            crefito,
            fone,
        });
        
        res.redirect('/');
    }
};