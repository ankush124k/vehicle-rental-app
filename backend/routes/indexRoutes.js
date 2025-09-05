const express = require('express');
const router = express.Router();
const vehicleRoutes = require('./vehiclesRoutes');
const bookingsRoutes = require('./bookingsRoutes');

router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingsRoutes);

module.exports = router;
