const bookingService = require('../services/bookingService');

const createNewBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json(newBooking);

  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createNewBooking,
};
