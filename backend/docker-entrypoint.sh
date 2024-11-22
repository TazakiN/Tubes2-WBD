#!/bin/sh

# Jalankan migrasi
echo "Running migrations..."
npm run db:migrate

# Generate Prisma Client
echo "Generating Prisma Client..."
npm run db:generate

# Start the application
echo "Starting the application..."
npm run dev