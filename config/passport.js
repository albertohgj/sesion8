const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
},function(email, password, done){
    User.findOne({where:{email:email}}).then(function(user){
        if(!user || !user.validatePassword(password)){
            return done(null, false,{errors: {'email o contraseña incorrectos':'incorrectos'}})
        }
        return done(null, user);
    }).catch(done)
}))
