'use strict';
module.exports = (sequelize, DataTypes) => {
    const pacientes = sequelize.define(
        'pacientes',
        {
            name: DataTypes.STRING,
            cpf: DataTypes.INTEGER,
        },{
            sequelize
        }
    );
    //pacientes.associate = function (models) {};
    
    return pacientes;
};