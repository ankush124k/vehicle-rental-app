const prisma = require('../prisma/client');

const getVehicles = async (queryParams) => {
  try {
    const { wheels, typeId } = queryParams;
    const where = {};
    if (wheels) {
      where.numberOfWheels = +wheels;
    }
    if (typeId) {
      where.id = +typeId;
    }

    const vehicleTypes = await prisma.vehicleType.findMany({
      where,
      include: {
        vehicles: true,
      },
    });

    return vehicleTypes;
  } catch (error) {
    console.error('Error in getVehicles service:', error);
    throw new Error('An error occurred while fetching vehicles.');
  }
};

module.exports = {
  getVehicles,
};
