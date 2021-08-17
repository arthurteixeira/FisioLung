'use strict';
module.exports = (sequelize, DataTypes) => {
    const sessoes = sequelize.define(
        'sessoes',
        {
            paciente_id: DataTypes.INTEGER,
            fisioterapeuta_id: DataTypes.INTEGER,
            tecnica_id: DataTypes.INTEGER,
            sensor: DataTypes.BOOLEAN,
            freq_respiratoria_inicial: DataTypes.FLOAT, 
			freq_cardiaca_inicial: DataTypes.FLOAT, 
			sat_oxigenio_inicial: DataTypes.FLOAT, 
			pressao_arterial_inicial: DataTypes.FLOAT, 
			grau_inicial: DataTypes.INTEGER,
            freq_respiratoria_final: DataTypes.FLOAT, 
			freq_cardiaca_final: DataTypes.FLOAT, 
			sat_oxigenio_final: DataTypes.FLOAT, 
			pressao_arterial_final: DataTypes.FLOAT, 
			grau_final: DataTypes.INTEGER,
            evolucao: DataTypes.STRING,
			estado_paciente: DataTypes.INTEGER,
			estado_fisio: DataTypes.INTEGER,
            vibracao_pico_x: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_pico_y: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_pico_z: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_tempo: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_media_x: DataTypes.FLOAT,
            vibracao_media_y: DataTypes.FLOAT,
            vibracao_media_z: DataTypes.FLOAT,
            vibracao_media_pico_x: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_media_pico_y: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_media_pico_z: DataTypes.ARRAY(DataTypes.FLOAT),
            vibracao_tempo_total: DataTypes.FLOAT,
        },{
            sequelize
        }
    );
    sessoes.associate = function (models) {
        sessoes.belongsTo(models.pacientes, { foreignKey: 'paciente_id', as: 'pacientes' });
        sessoes.belongsTo(models.fisioterapeutas, { foreignKey: 'fisioterapeuta_id', as: 'fisioterapeutas' });
        sessoes.belongsTo(models.fisioterapeutas, { foreignKey: 'tecnica_id', as: 'tecnicas' });
    };
    
    return sessoes;
};