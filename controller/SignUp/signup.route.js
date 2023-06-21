const express = require('express');
const router = express.Router();
const SignUpController = require('./signup.controller');

// phương thức get giao diện login
router.get('/signUp', SignUpController.signUp);

module.exports = router;