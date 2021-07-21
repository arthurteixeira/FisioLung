const fs = require('fs');
const path = require('path');
const { format, endOfDay, subDays } = require('date-fns');
const { sessoes, pacientes } = require('../models/');
const pdf = require('../utils/createPDF');

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
        const sessao = await sessoes.findAll({
            where: {
                id,
            }
        });

        let diaAtual = format(endOfDay(new Date()), 'dd/MM/yyyy');

        let file = await pdf.createPDF("relatorioSessao", { name: "relatorioSessao", sessoes: sessao, data: diaAtual});
        res.sendFile(`${file}`);
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
        let file = await pdf.createPDF("relatorioGeral", { name: "relatorioSessao", sessa: sessao, pac: paciente, sessoes: JSON.stringify(sessao), pacientes: JSON.stringify(paciente), data: diaAtual});
        res.sendFile(`${file}`);
    }
};