const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { validateRegister } = require('../middleware/validation');
router.post('/register', validateRegister, vehicleController.registerVehicle);
module.exports = router;