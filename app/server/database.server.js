import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    prisma.$connect()
        .then(() => console.log("Connected to MongoDB"))
        .catch((e) => console.error(e));
} else {
    if (!global.__db__) {
        global.__db__ = new PrismaClient();
        global.__db__.$connect()
            .then(() => console.log("Connected to MongoDB"))
            .catch((e) => console.error(e));
    }
    prisma = global.__db__;
}

export { prisma };
