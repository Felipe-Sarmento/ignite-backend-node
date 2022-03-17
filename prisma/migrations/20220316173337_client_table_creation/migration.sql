/*
  Warnings:

  - You are about to drop the column `passwords` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `usernames` on the `deliveryman` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `deliveryman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `deliveryman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `deliveryman` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "deliveryman_usernames_key";

-- AlterTable
ALTER TABLE "deliveryman" DROP COLUMN "passwords",
DROP COLUMN "usernames",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");

-- CreateIndex
CREATE UNIQUE INDEX "deliveryman_username_key" ON "deliveryman"("username");
