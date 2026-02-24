import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaMariaDb({
      host: "localhost",
      user: "root",
      password: "Nishit@1975",
      port: 3306,
      database: "todo_list",
    }),
  });

// Always persist on globalThis so HMR hot-reloads in dev
// don't create new PrismaClient instances (and new connection pools).
globalForPrisma.prisma = prisma;

export default prisma;
