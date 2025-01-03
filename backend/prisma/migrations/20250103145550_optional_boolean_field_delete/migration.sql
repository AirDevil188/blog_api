/*
  Warnings:

  - Made the column `publish` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "publish" SET NOT NULL,
ALTER COLUMN "publish" SET DEFAULT true;
