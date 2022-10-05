const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const God = require('./gods');

const Realms = sequelize.define('Realm',{
    name: {
        type:DataTypes.CHAR(64)
    },
    description:{
        type:DataTypes.TEXT
    }
});

//relacion 1 a muchos
//Realms.hasMany(God);
//God.belongsTo(Realms);

module.exports = Realms;