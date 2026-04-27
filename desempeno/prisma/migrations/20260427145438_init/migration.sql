-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENTE', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "TransportStatus" AS ENUM ('ACTIVO', 'INACTIVO', 'MANTENIMIENTO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENTE',
    "refreshTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" SERIAL NOT NULL,
    "busType" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "passengerCapacity" INTEGER NOT NULL,
    "status" "TransportStatus" NOT NULL DEFAULT 'ACTIVO',
    "assignedRoute" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_plate_key" ON "Transport"("plate");
