module.exports = {
    async create(req, res){
        const { name, cpf } = req.body;
        console.log(name);
        console.log(cpf)
    }
};