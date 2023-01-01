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
  const title = "Hey Jude"
  const midiFilePath= "testPath"
  const theBeatles = await prisma.artist.create({
    data: {
      firstName: "The",
      lastName: "Beatles",
      songs: {
        create: [
          { title: "Hey Jude", midiFilePath: "TestPath3532" }
        ]
      }
    }
  })

  // const heyJude = await prisma.song.create({
  //   data: {
  //   }
  // })
  
  console.log({ alice, bob, post, theBeatles})
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