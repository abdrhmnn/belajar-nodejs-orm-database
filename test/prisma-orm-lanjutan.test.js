import { prismaClient } from "../src/prisma-client"

test("create many records", async () => {
  const { count } = await prismaClient.product.createMany({
    data: [
      {
        id: "1",
        nama: "abdu",
        price: 1112,
        stock: 10,
        category: "test",
      },
      {
        id: "2",
        nama: "abdu2",
        price: 1112,
        stock: 12,
        category: "test2",
      },
      {
        id: "3",
        nama: "abdu3",
        price: 11125,
        stock: 17,
        category: "test3",
      },
      {
        id: "4",
        nama: "abdu4",
        price: 1112,
        stock: 12,
        category: "test4",
      },
      {
        id: "5",
        nama: "abdu5",
        price: 1112,
        stock: 12,
        category: "test5",
      },
    ]
  })

  expect(count).toBe(5)
})

// aggregate
test("test aggregate", async () => {
  const result = await prismaClient.product.aggregate({
    _max: {
      price: true
    },
    _min: {
      price: true
    },
    _avg: {
      price: true
    }
  })

  const resultWithGroupBy = await prismaClient.product.groupBy({
    by: ["category"],
    _max: {
      price: true
    },
    _min: {
      price: true
    },
    _avg: {
      price: true
    },
    having: {
      price: {
        _avg: {
          gt: 3000
        }
      }
    }
  })

  console.info(result)
  console.info(resultWithGroupBy)
})

// where conditions
test("test where conditions", async () => {
  // untuk kondisi where apa saja yang bisa dipakai, ada semua di dokumentasinya
  const result = await prismaClient.product.findMany({
    where: {
      OR: [
        {
          nama: "abdu"
        },
        {
          nama: "abdu3"
        },
      ]
    },
    orderBy: [
      {
        nama: 'asc'
      }
    ]
  })

  console.info(result)
})