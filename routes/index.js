const { Router } = require('express');
const routes = Router();

const fisioterapeutaController = require('../controllers/fisioterapeutaController');
const pacienteController = require('../controllers/pacienteController');
const sessaoController = require('../controllers/sessaoController');

const { pacientes, sessoes, fisioterapeutas, tecnicas } = require('../models/');

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
    const tecnica = await tecnicas.findAll();
    res.render('sessao', { pacientes: paciente, fisioterapeutas: fisioterapeuta, tecnicas: tecnica });
});

routes.post('/sessao', sessaoController.create);

//ANALISE GERAL

routes.get('/selecionar/paciente/geral', async (req, res) => {
    const pc = await pacientes.findAll();
    return res.render('analisePacienteGeral', { pacientes: pc });
});

routes.get('/selecionar/paciente/geral/:id', async (req, res) => {
    const { id } = req.params;
    const sessao = await sessoes.findAll({
        include: [{
            association: 'fisioterapeutas',
            attributes: ['name'],
        }],

        where: {
            paciente_id: id,
        }
    });

    const paciente = await pacientes.findAll({
        where: {
            id,
        }
    });
    return res.render('analiseGeral', { sessa: sessao, sessoes: JSON.stringify(sessao), pacientes: JSON.stringify(paciente) });
});

//ANALISE SESSAO

routes.get('/selecionar/paciente', async (req, res) => {
    const pc = await pacientes.findAll();
    return res.render('analisePaciente', { pacientes: pc });
});

routes.get('/paciente/:id', async (req,res) => { 
    const { id } = req.params;
    const sessao = await sessoes.findAll({
        where: {
            paciente_id: id,
        }
    });
    return res.render('analise', { sessoes: sessao });
});

routes.get('/analise/:id', async (req, res) => {
    const { id } = req.params;
    const sessao = await sessoes.findAll({
        where: {
            id,
        }
    });
    return res.render('analiseSessao', { sessoes: sessao });
});

module.exports = routes;