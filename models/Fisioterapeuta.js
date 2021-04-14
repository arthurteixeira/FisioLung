'use strict';
module.exports = (sequelize, DataTypes) => {
    const fisioterapeutas = sequelize.define(
        'fisioterapeutas',
        {
            name: DataTypes.STRING,
            cpf: DataTypes.INTEGER,
        },{
            sequelize
        }
    );
    //fisioterapeutas.associate = function (models) {};

    return fisioterapeutas;
};