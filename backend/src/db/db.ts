import { PrismaClient } from "@prisma/client";

interface GlobalForPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma: GlobalForPrisma = global as unknown as GlobalForPrisma;

const db: PrismaClient = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
