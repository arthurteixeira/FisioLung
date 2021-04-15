const { Router } = require('express');
const routes = Router();
const fisioterapeutaController = require('../controllers/fisioterapeutaController');
const pacienteController = require('../controllers/pacienteController');
const sessaoController = require('../controllers/sessaoController');

const { pacientes, fisioterapeutas } = require('../models/');

routes.get('/', (req,res) => { 
    res.render('index');
});

//FISIOTERAPEUTA
routes.get('/cadastro/fisioterapeuta', (req,res) => { 
    res.render('fisioterapeuta');
});

routes.post('/cadastro/fisioterapeuta', fisioterapeutaController.create);

//PACIENTE
routes.get('/cadastro/paciente', (req,res) => { 
    res.render('paciente');
});

routes.post('/cadastro/paciente', pacienteController.create);

//SESSAO
routes.get('/sessao', async (req,res) => { 
    const paciente = await pacientes.findAll();
    const fisioterapeuta = await fisioterapeutas.findAll();
    res.render('sessao', { pacientes: paciente, fisioterapeutas: fisioterapeuta });
});

routes.post('/sessao', sessaoController.create);

module.exports = routes;