const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { getVehiclesList } = require('../controllers/vehiclesContollers');

router.get('/getList', getVehiclesList);

module.exports = router;
