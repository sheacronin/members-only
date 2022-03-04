var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', messageController.indexMessages);
router.post('/', messageController.deleteMessage);

router.get('/sign-up', userController.userSignUpGet);
router.post('/sign-up', userController.userSignUpPost);

router.get('/log-in', userController.logInGet);
router.post('/log-in', userController.logInPost);

router.get('/join-club', userController.joinClubGet);
router.post('/join-club', userController.joinClubPost);

router.get('/become-admin', userController.becomeAdminGet);
router.post('/become-admin', userController.becomeAdminPost);

router.get('/create-message', messageController.createMessageGet);
router.post('/create-message', messageController.createMessagePost);

router.get('/log-out', userController.logOut);

module.exports = router;
