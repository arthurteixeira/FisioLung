'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
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
};