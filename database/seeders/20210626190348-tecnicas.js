"use strict";

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            "tecnicas",
            [
                {
                  nome: "Drenagem Postural",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Percussões Pulmonares Manuais",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Drenagem Postural",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Pressão Expiratória",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Tosse",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Aceleração do fluxo respiratório",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Drenagem Autógena",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Huffing",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Ciclo ativo da respiração",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Pressão expiratória positiva",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Terapia por Oscilação oral de alta frequência",
                  modo: "Técnica Não Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Aspiração traqueobrônquica",
                  modo: "Técnica Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Hiperinsuflação manual com ambu",
                  modo: "Técnica Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
                {
                  nome: "Manobra de PEEP/ZEEP",
                  modo: "Técnica Invasiva",  
                  created_at: "06/25/2021 16:58",
                  updated_at: "06/25/2021 16:58",
                },
            ],
            {}
        ),

    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("tecnicas", null, {}),
};