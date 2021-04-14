const { fisioterapeutas } = require('../models/');

module.exports = {
    async create(req, res){
        const { name, cpf } = req.body;

        const fisioterapeuta = await fisioterapeutas.create({
            name,
            cpf,
        });
        
        res.json(fisioterapeuta);
    }
};