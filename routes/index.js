const router = require('express').Router();
const dataDisplay = require('../controllers/');

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
})

router.get('/', dataDisplay.dataDisplay);
// router.use('/employees', require('./employees'));
// router.use('/teams', require('./teams'))

module.exports = router;