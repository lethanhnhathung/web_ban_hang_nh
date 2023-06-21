const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');

//phương thức post login

router.post('/login', AuthController.login);

router.post('/login/isAuthenticated', AuthController.isAuthenticated);

router.post('/logout',AuthController.logout);

router.post('/signup',AuthController.signup)

router.post('/getUser',AuthController.getuser )
//phương thức logout
//router.post('/logout' ,AuthController.logout);

module.exports = router;