/*
  Warnings:

  - You are about to drop the `_CategoryToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_CategoryToTag`;
