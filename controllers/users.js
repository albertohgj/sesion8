const User = require("../models/users");


async function signUp(req,resp){
    let body = req.body;
    try{
        const user = await User.create(body);
        const {salt, hash} = User.createPassword(body["password"]);
        user.password_salt=salt;
        user.password_hash=hash;
        await user.save();
        resp.status(201).json(user);
    }catch(err){
        if (err.name === "SequelizeValidationError"|| err.name === "SequelizeUniqueConstraintError") {
            return resp.status(400).json({
                error: err.errors.map(e => e.message)
            })
        } else {
            console.log("ERROR:", err.name);
        }
    }
}

async function logIn(req, res){
    const body = req.body;
    const user = await User.findOne({where: {username:body["username"]}});
    if(!user){
        return res.status(404).json({error: "usuario no encontrado"});
    }
    console.log(user.password_salt);
    console.log(user.password_hash);

    if(User.validatePassword(body["password"], user.password_salt, user.password_hash)){
        // return res.status(200).json({mensaje:"Bienvenido"});
       return res.status(200).json({
            user:user.username,
            email: user.email,
            token : User.generateJWT(user)
       });
    }
    else{
        return res.status(400).json({error: "password incorrecto"});
    }
}

module.exports= {
    signUp,
    logIn
}