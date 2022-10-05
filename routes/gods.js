const router = require('express').Router();
const {
    createGod,
    getGod,
    getGods,
    updateGod, 
    deleteGod
} = require('../controllers/gods');

const auth = require('../config/auth');

router.get('/',getGods);
router.get('/:id',getGod);
router.post('/',auth.required, createGod);
router.patch('/:id',auth.required, updateGod);
router.put('/:id',auth.isAdmin, deleteGod);

module.exports= router;