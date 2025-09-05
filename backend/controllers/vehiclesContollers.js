const vehicleService = require('../services/vehicleService');
const getVehiclesList = async (req, res) => {
  try {
    const queryParams = req.query;
    const listData = await vehicleService.getVehicles(queryParams);
    res.status(200).json(listData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVehiclesList,
};
