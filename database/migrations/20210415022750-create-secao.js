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
      },
      fisioterapeuta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vibracao_pico: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vibracao_tempo: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      vibracao_tempo_total: {
        type: Sequelize.INTEGER,
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
