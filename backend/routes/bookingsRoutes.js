const express = require('express');
const router = express.Router();
const { createNewBooking } = require('../controllers/bookingContoller');
router.post('/', createNewBooking);

module.exports = router;
