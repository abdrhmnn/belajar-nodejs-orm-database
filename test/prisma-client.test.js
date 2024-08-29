import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should connect db", async () => {
    await prismaClient.$connect;

    // do something


    await prismaClient.$disconnect;
  })
})