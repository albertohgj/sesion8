const router = require('express').Router();
//const { route } = require('./gods');
const gods = require('./gods');
const realms = require('./realms');
const users = require('./users');


router.get('/',(req,res)=>{
    res.json({'info':'welcome to API Gods'});
})

router.use('/gods',gods);
router.use('/realms',realms);
router.use('/users', users);

module.exports = router;