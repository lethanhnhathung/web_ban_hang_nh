const express = require('express');
const router = express.Router();
const HomePageController = require('./homepage.controller');

// phương thức get giao diện login
router.get('/homePage', HomePageController.homePage);

module.exports = router;