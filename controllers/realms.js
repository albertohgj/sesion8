const Realms = require('../models/realms');

function createRealms(req, res){
    const body = req.body;
    Realms.create(body).then(realms =>{
        res.status(201).json(realms);
    });
}

async function getRealms(req, res){
     const realms = await Realms.findAll();
    res.status(200).json(realms);
}

module.exports = {createRealms, getRealms}
