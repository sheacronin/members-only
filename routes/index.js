var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Members Only' });
});

router.get('/sign-up', userController.userSignUpGet);
router.post('/sign-up', userController.userSignUpPost);

router.get('/log-in', userController.logInGet);
router.post('/log-in', userController.logInPost);

router.get('/join-club', userController.joinClubGet);
router.post('/join-club', userController.joinClubPost);

module.exports = router;
