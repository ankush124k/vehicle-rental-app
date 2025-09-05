-- CreateTable
CREATE TABLE "public"."VehicleType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfWheels" INTEGER NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleTypeId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "public"."VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_name_vehicleTypeId_key" ON "public"."Vehicle"("name", "vehicleTypeId");

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "public"."VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
