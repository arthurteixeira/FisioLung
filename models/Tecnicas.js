'use strict';
module.exports = (sequelize, DataTypes) => {
    const tecnicas = sequelize.define(
        'tecnicas',
        {
            nome: DataTypes.STRING,
            modo: DataTypes.STRING,
        },{
            sequelize
        }
    );
    //pacientes.associate = function (models) {};
    
    return tecnicas;
};