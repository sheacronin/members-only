var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/sign-up', userController.userSignUpGet);
router.post('/sign-up', userController.userSignUpPost);

module.exports = router;
