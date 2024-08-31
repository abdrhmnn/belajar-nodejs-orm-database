import { prismaClient } from "../src/prisma-client";

test("create data with orm prisma", async () => {
  const action = await prismaClient.customer.create({
    data: {
      id: "2",
      nama: "eunha",
      umur: 111
    }
  })

  expect(action.id).toBe("2")
  expect(action.nama).toBe("eunha")
  expect(action.umur).toBe(111)
})

test("update data with orm prisma", async () => {
  const action = await prismaClient.customer.update({
    data: {
      nama: "abdu rahman",
    },
    where: {
      id: "1"
    }
  })

  expect(action.id).toBe("1")
  expect(action.nama).toBe("abdu rahman")
})

test("find by unique data with orm prisma", async () => {
  const action = await prismaClient.customer.findUnique({
    where: {
      id: "2"
    }
  })

  expect(action.id).toBe("2")
  expect(action.nama).toBe("eunha")
})

test("delete data with orm prisma", async () => {
  const action = await prismaClient.customer.delete({
    where: {
      id: "2"
    }
  })

  expect(action.id).toBe("2")
  expect(action.nama).toBe("eunha")
})

// transaction data with prisma
test("test sequential transaction", async () => {

  // ini akan execute semua transaction nya
  const [abdu, eunha] = await prismaClient.$transaction([
    prismaClient.customer.create({
      data: {
        id: "3",
        nama: "sowon",
        umur: 1112
      }
    }),
    prismaClient.customer.create({
      data: {
        id: "4",
        nama: "umji",
        umur: 1113
      }
    }),
  ])

  expect(abdu.nama).toBe("sowon")
  expect(eunha.nama).toBe("umji")
})

test("test interactive transaction", async () => {

  // kalo ini kita bisa custome transaction nya
  const [abdu, eunha] = await prismaClient.$transaction(async (prisma) => {
    const abdu = await prisma.customer.create({
      data: {
        id: "2",
        nama: "yerin",
        umur: 1112
      }
    })

    return [abdu]
  })

  expect(abdu.nama).toBe("yerin")
})

// CRUS Many
test("create many records", async () => {
  const { count } = await prismaClient.customer.createMany({
    data: [
      {
        id: "5",
        nama: "yerin",
        umur: 1112
      },
      {
        id: "6",
        nama: "yerin",
        umur: 1112
      }
    ]
  })

  expect(count).toBe(2)
})

test("update many records", async () => {
  // bedanya dengan yg single yaitu di kondisi where nya, kalo yg single itu hrs pakai column yang unique
  // kalo yg many itu ga perlu
  const { count } = await prismaClient.customer.updateMany({
    data: {
      umur: 100
    },
    where: {
      nama: "yerin"
    }
  })

  expect(count).toBe(3)
})

test("delete many records", async () => {

  // untuk mekanisme nya sama seperti updateMany
  const { count } = await prismaClient.customer.deleteMany({
    where: {
      nama: "yerin"
    }
  })

  expect(count).toBe(3)
})

test("select many records", async () => {
  const customers = await prismaClient.customer.findMany({})
  expect(customers.length).toBe(3)

  // bisa juga dibuat paging dengan findMany
  const forPage1 = await prismaClient.customer.findMany({
    skip: 0,
    take: 2,

    // bisa juga sorting data nya
    orderBy: [
      {
        nama: 'asc'
      }
    ],

    // bisa juga membatasi field yang di select setelah melakukan operasi CRUD
    // property ini berlaku untuk semua operasi
    select: {
      nama: true,
      umur: true
    }
  })

  console.info(forPage1)
  expect(forPage1.length).toBe(2)
})

test("test count data", async () => {
  const total = await prismaClient.customer.count({
    where: {
      nama: "umji"
    }
  })

  expect(total).toBe(1)
})