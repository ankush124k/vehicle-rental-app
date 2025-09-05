const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { createNewBooking } = require('../controllers/bookingContoller');

//Creates a new booking 
router.post('/create',createNewBooking) ;

module.exports = router;
