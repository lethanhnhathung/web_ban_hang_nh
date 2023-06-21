const express = require('express');
const router = express.Router();
const DetailController = require('./detail.controller');

// phương thức get giao diện login
router.get('/detail/:id', DetailController.detail);

module.exports = router;