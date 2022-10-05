const { DataTypes } = require("sequelize");

const {Sequelize, Datatypes, Op} = require('sequelize');
const sequelize = require('../config/db.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const secret = require('../config/secret');  

const User = sequelize.define('user',{
    username:{
        type : DataTypes.CHAR(64),
        allowNull:false,
        unique: true,
        primaryKey: true,
        validate:{
            isLowercase: true,
            is: /^[a-zA-Z0-9_-]+$/
        }
    },
    name:{
        type : DataTypes.CHAR(64),
        allowNull:false
    },
    surname:{
        type: DataTypes.CHAR(64),
        allowNull:false
    },
    email:{
        type: DataTypes.CHAR(64),
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true
        },
    },
    password_hash:{
        type: DataTypes.TEXT
    },
    password_salt:{
        type:DataTypes.TEXT
    },
    tarjeta:{
        type: DataTypes.CHAR(64),
        allowNull:false,
       // unique: true,
        validate:{
            isCreditCard:true
        }
    },
    tipoTarjeta:{
        type:DataTypes.CHAR(64),
        allowNull:true,
    }
});

User.createPassword = function(plaintext){
    console.log("entre crea pass", plaintext);
    const salt = crypto.randomBytes(16).toString('hex');
    console.log ("salt", salt)
    const hash = crypto.pbkdf2Sync(plaintext, salt, 10000, 512 ,"sha512").toString("hex");
    console.log ("hash", hash)

    return {salt:salt, hash:hash};
}
User.validatePassword = function (password,user_salt, user_hash){
    const hash = crypto.pbkdf2Sync(password, user_salt, 10000, 512 ,"sha512").toString("hex");
    return (user_hash===hash);
}

User.generateJWT = function(user){
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        user:user.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
}

module.exports =  User;