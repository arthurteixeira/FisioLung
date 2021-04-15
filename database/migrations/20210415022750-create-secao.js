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
      vibracao_pico_x: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false,
      },
      vibracao_pico_y: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false,
      },
      vibracao_pico_z: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false,
      },
      vibracao_tempo: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false,
      },
      vibracao_tempo_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
