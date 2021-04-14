const { Router } = require('express');
const routes = Router();
const fisioterapeutaController = require('../controllers/fisioterapeutaController');
const pacienteController = require('../controllers/pacienteController');

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

//VIBRACAO
routes.get('/sessao/vibracao', (req,res) => { 
    res.sendFile('vibracao.html', { root: './views' });
});

module.exports = routes;