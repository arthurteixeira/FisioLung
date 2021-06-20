'use strict';
module.exports = (sequelize, DataTypes) => {
    const pacientes = sequelize.define(
        'pacientes',
        {
            name: DataTypes.STRING,
            cpf: DataTypes.INTEGER,
            data_nascimento: DataTypes.DATE,
            sexo: DataTypes.CHAR,
            peso: DataTypes.INTEGER,
            patologia: DataTypes.CHAR,
            sus: DataTypes.INTEGER,
            fone: DataTypes.INTEGER,
        },{
            sequelize
        }
    );
    //pacientes.associate = function (models) {};
    
    return pacientes;
};