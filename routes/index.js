const { Router } = require('express');
const routes = Router();

routes.get('/', (req,res) => { 
    res.render('index');
});

routes.get('/cadastro/fisioterapeuta', (req,res) => { 
    res.render('fisioterapeuta');
});

routes.get('/cadastro/paciente', (req,res) => { 
    res.render('paciente');
});

routes.get('/sessao/vibracao', (req,res) => { 
    res.sendFile('vibracao.html', { root: './views' });
});

module.exports = routes;