'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'fisioterapeutas',
        {
            name: DataTypes.STRING,
            cpf: DataTypes.INTEGER,
            data_nascimento: DataTypes.DATE,
            sexo: DataTypes.CHAR,
            crefito: DataTypes.INTEGER,
            fone: DataTypes.INTEGER,
        },{
            sequelize
        }
    );
};