const prisma = require('../prisma/client');
const ServiceError = require('../utils/error'); 

const createBooking = async (bookingData) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = bookingData;

  if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
    throw new ServiceError('Missing required fields.', 400);
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      vehicleId: vehicleId,
      AND: [
        { startDate: { lt: end } },
        { endDate: { gt: start } },
      ],
    },
  });

  if (overlappingBooking) {
    throw new ServiceError('This vehicle is already booked for the selected dates.', 409); 
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        vehicleId,
        startDate: start,
        endDate: end,
      },
    });
    return newBooking;
  } catch (error) {
    console.error('Error in createBooking service:', error);
    throw new ServiceError('An error occurred while creating the booking.', 500);
  }
};

module.exports = {
  createBooking,
};

