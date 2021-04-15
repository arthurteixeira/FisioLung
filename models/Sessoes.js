'use strict';
module.exports = (sequelize, DataTypes) => {
    const sessoes = sequelize.define(
        'sessoes',
        {
            paciente_id: DataTypes.INTEGER,
            fisioterapeuta_id: DataTypes.INTEGER,
            vibracao_pico_x: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_pico_y: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_pico_z: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_tempo: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_tempo_total: DataTypes.INTEGER,
        },{
            sequelize
        }
    );
    sessoes.associate = function (models) {
        sessoes.belongsTo(models.pacientes, { foreignKey: 'paciente_id', as: 'pacientes' });
        sessoes.belongsTo(models.fisioterapeutas, { foreignKey: 'fisioterapeuta_id', as: 'fisioterapeutas' });
    };
    
    return sessoes;
};