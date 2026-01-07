const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const { validateScan, validateDashboard } = require('../middleware/validation');
router.post('/scan', validateScan, parkingController.scanQrCode);
router.get('/dashboard/:vehicle_id', validateDashboard, parkingController.getDashboard);
module.exports = router;