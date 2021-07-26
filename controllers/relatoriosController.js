const fs = require('fs');
const path = require('path');
const { format, endOfDay, subDays } = require('date-fns');
const { sessoes, pacientes } = require('../models/');
const html_to_pdf = require('html-pdf-node');
const moment = require('moment');

module.exports = {
    async analiseSessao(req, res){
        const { id } = req.params;
        const sessao = await sessoes.findAll({
            where: {
                id,
            }
        });

        let diaAtual = format(endOfDay(new Date()), 'dd/MM/yyyy');
        return res.render('relatorios/relatorioSessao', { layout: 'relatorios', sessoes: sessao, data: diaAtual });
    },

    async analiseSessaoPDF(req, res){
        const { id } = req.params;

        let options = { format: 'A4' };
        let file = { url: `http://localhost:3000/relatorio/html/${id}` };
        let buffer = await html_to_pdf.generatePdf(file, options);
        
        moment.locale('pt-br');
        let milis = moment().valueOf();
        let data = moment().format('DDMMYYYY');
        fs.writeFileSync(`relatorio-espec-${id}-${data}${milis}.pdf`, buffer ,'binary');

        const pdfPath = path.join(__dirname + '/..' + `/relatorio-espec-${id}-${data}${milis}.pdf`);
        res.sendFile(`${pdfPath}`);
    },

    async analiseGeral(req, res){
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

        let diaAtual = format(endOfDay(new Date()), 'dd/MM/yyyy');

        return res.render('relatorios/relatorioGeral', { layout: 'relatorios', sessa: sessao, pac: paciente, sessoes: JSON.stringify(sessao), pacientes: JSON.stringify(paciente), data: diaAtual });
    },

    async analiseGeralPDF(req, res){
        const { id } = req.params;

        let options = { format: 'A4' };
        let file = { url: `http://localhost:3000/relatorio/geral/html/${id}` };
        let buffer = await html_to_pdf.generatePdf(file, options);

        moment.locale('pt-br');
        let milis = moment().valueOf();
        let data = moment().format('DDMMYYYY');
        fs.writeFileSync(`relatorio-geral-${id}-${data}${milis}.pdf`, buffer ,'binary');

        const pdfPath = path.join(__dirname + '/..' + `/relatorio-geral-${id}-${data}${milis}.pdf`);
        res.sendFile(`${pdfPath}`);
    }
};