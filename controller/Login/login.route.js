const express = require('express');
const router = express.Router();
const LoginController = require('./login.controller');

// phương thức get giao diện login
router.get('/login', LoginController.login);

module.exports = router;