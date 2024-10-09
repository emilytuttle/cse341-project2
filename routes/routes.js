const router = require('express').Router();
const dataDisplay = require('../controllers/');

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
})

router.get('/', dataDisplay.dataDisplay);
router.use('/users', require('./users'));

module.exports = router;