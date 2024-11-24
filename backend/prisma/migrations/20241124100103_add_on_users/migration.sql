/*
  Warnings:

  - Added the required column `profile_photo_path` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "full_name" VARCHAR(255),
ADD COLUMN     "profile_photo_path" VARCHAR(255) NOT NULL,
ADD COLUMN     "skills" TEXT,
ADD COLUMN     "work_history" TEXT;
