const express = require('express');
const router = express.Router();
const DashboardController = require('./dashboard.controller');

// phương thức get giao diện login
router.get('/dashboard', DashboardController.dashboard);

router.post('/product/createProduct', DashboardController.createProduct);

router.post('/product/updateProduct', DashboardController.updateProduct);

module.exports = router;