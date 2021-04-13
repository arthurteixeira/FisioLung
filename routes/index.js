const { Router } = require('express');
const routes = Router();

routes.get('/', (req,res) => { 
    res.render('index');
});

routes.get('/sessao/vibracao', (req,res) => { 
    res.sendFile('vibracao.html', { root: './views' });
});

module.exports = routes;