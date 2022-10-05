const God = require('../models/gods');

function createGod(req, res){
    var body = req.body;
    God.create(body).then(god=>{
        res.status(201).json(god);
    });

    //const god = await God.create(body);
    //res.status(201).json(god);
}

async function getGod(req, res){
    var id = req.params.id;
    const god = await God.findByPk(id);
    res.status(200).json(god);
}

async function getGods(req, res){
    const gods = await God.findAll();
    res.status(200).json(gods);
}

async function updateGod(req, res){
    const id=req.params.id;
    const god = req.body;
    const update = await God.update(god, {where:{id}});
    const  godUpdated = await God.findByPk(id);
    res.status(200).json(godUpdated);
}

async function deleteGod(req, res){
    const id = req.params.id;
    const deleted = God.destroy({where:{id:id}
    });
    res.status(200).json(deleted);
}

module.exports = {
    createGod,
    getGod,
    getGods,
    updateGod, 
    deleteGod
}