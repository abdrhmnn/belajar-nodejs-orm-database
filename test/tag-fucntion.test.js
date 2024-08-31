import { prismaClient } from "../src/prisma-client";

function tagFunc(array, ...args){
  console.info(array)
  console.info(args)
}

test("test tag function", () => {
  const name = "abdu"

  tagFunc`Hallo ${name}, selamat pagi!`;
})

test("execute sql with tag function", async () => {
  const name = "abdu"
  const id = 1
  const email = "abdu@gmail.com"

  // cara ini juga berlaku untuk query update, delete, read dgn tag function dari prisma
  const inpected = await prismaClient.$executeRaw`INSERT INTO sample(id, nama, email) VALUES (${id}, ${name}, ${email})`
  expect(inpected).toBe(1)
})

test("execute sql select data with tag function", async () => {
  const id = 1

  const samples = await prismaClient.$queryRaw`SELECT * FROM sample`

  for(const sample of samples){
    console.info(`Nama ${sample.nama}, email ${sample.email}`)
  }
})