'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "pacientes", key: "id" },
      },
      fisioterapeuta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "fisioterapeutas", key: "id" },
      },
      tecnica_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "tecnicas", key: "id" },
      },
      sensor: {
        type: Sequelize.BOOLEAN, // true -> acelerometro, false -> vibracao
        allowNull: true,
      },
      vibracao_pico_x: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_pico_y: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_pico_z: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_tempo: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_media_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      vibracao_media_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      vibracao_media_z: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      vibracao_media_pico_x: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_media_pico_y: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_media_pico_z: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: true,
      },
      vibracao_tempo_total: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sessoes');
  }
};
