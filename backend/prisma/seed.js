// Import the PrismaClient constructor from the @prisma/client node module
const { PrismaClient } = require('@prisma/client');

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Define an async function to run the seeding logic
async function main() {
  console.log('Start seeding ...');

  // Clear existing data to start fresh
  // The order is important to avoid foreign key constraint errors
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();
  console.log('Cleared existing data.');

  // Create Car Types and their specific models in one go using nested writes.
  const carTypes = [
    {
      name: 'Hatchback',
      numberOfWheels: 4,
      vehicles: {
        create: [
          { name: 'Maruti Suzuki Swift' },
          { name: 'Hyundai i20' },
        ],
      },
    },
    {
      name: 'SUV',
      numberOfWheels: 4,
      vehicles: {
        create: [
          { name: 'Hyundai Creta' },
          { name: 'Kia Seltos' },
        ],
      },
    },
    {
      name: 'Sedan',
      numberOfWheels: 4,
      vehicles: {
        create: [
          { name: 'Honda City' },
          { name: 'Hyundai Verna' },
        ],
      },
    },
  ];

  // Create Bike Types and their specific models
  const bikeTypes = [
    {
      name: 'Cruiser',
      numberOfWheels: 2,
      vehicles: {
        create: [
          { name: 'Royal Enfield Hunter 350' },
          { name: 'Jawa 42' },
        ],
      },
    },
    {
        name: 'Sports',
        numberOfWheels: 2,
        vehicles: {
            create: [
                { name: 'KTM Duke 200' },
                { name: 'Yamaha R15 V4' },
            ],
        },
    }
  ];

  // Loop through the carTypes array and create each record in the database
  for (const type of carTypes) {
    await prisma.vehicleType.create({
      data: type,
    });
  }
  
  // Loop through the bikeTypes array and create each record in the database
  for (const type of bikeTypes) {
    await prisma.vehicleType.create({
      data: type,
    });
  }

  console.log('Seeding finished.');
}

// Execute the main function, handle success and errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });
