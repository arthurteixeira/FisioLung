'use strict';
module.exports = (sequelize, DataTypes) => {
    const fisioterapeutas = sequelize.define(
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
    //fisioterapeutas.associate = function (models) {};

    return fisioterapeutas;
};