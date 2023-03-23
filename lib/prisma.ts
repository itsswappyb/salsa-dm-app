import { PrismaClient } from "@prisma/client";

const prisma = (global.prisma as PrismaClient) || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
