import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice'
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob'
    },
  })

  // const theBeatles = await prisma.artist.create({
  //     data: {
  //       "The",
  //       "Beatles"
  //     }
  //   },
  // )

  const email = "234234@emailservice.com";
  const name = "Will Mallti";
  const post = await prisma.user.create({
    data: {
      email,
      name
    },
  })

  const firstName = "The"
  const lastName = "Beatles"
  const post33 = await prisma.artist.create({
    data: {
      firstName,
      lastName
    }
  })
  
  console.log({ alice, bob, post, post33})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })