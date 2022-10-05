require('dotenv').config()

const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes');
const auth = require('./config/auth');

var app = express();
app.use(express.json());

app.use(auth.opcional);

app.use('/', routes);

try{
    sequelize.authenticate();
    sequelize.sync();
    console.log('conectados a la BD');
}catch(e){
    console.log('no se pudo conectar a la BD', e);
}

//const PORT = 3000;

app.listen(process.env['PORT']||3000, ()=>{
    console.log("Server listen in port", process.env['PORT']||3000);
});