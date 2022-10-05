const router = require('express').Router();

const {createRealms, getRealms} = require('../controllers/realms');

router.get('/', getRealms);
router.post('/', createRealms);

module.exports = router;