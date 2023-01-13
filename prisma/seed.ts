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
          { title: "Eight Days A Week", midiFilePath: "midi_songs/EightDaysAWeek.mid" },
          { title: "With A Little Help From My Friends", midiFilePath: "midi_songs/WithALittleHelpFromMyFriends.mid" },
          { title: "Hey Jude", midiFilePath: "midi_songs/HeyJude.mid" }
        ]
      }
    }
  })
  const theBackstreetBoys = await prisma.artist.create({
    data: {
      firstName: "The",
      lastName: "Backstreet Boys",
      songs: {
        create: [
          { title: "I Want It That Way", midiFilePath: "midi_songs/IWantItThatWay.mid" },
          { title: "Quit Playing Games With My Heart", midiFilePath: "midi_songs/QuitPlayingGamesWithMyHeart.mid" },
          { title: "As Long As You Love Me", midiFilePath: "midi_songs/AsLongAsYouLoveMe.mid" },
        ]
      }
    }
  })
  const easySongs = await prisma.artist.create({
    data: {
      firstName: "The",
      lastName: "Easy Songs",
      songs: {
        create: [
          { title: "Twinkle Twinkle Little Star", midiFilePath: "midi_songs/TwinkleTwinkleLittleStar.mid" },
          { title: "Fur Elise", midiFilePath: "midi_songs/FurElise.mid" },
          { title: "Happy Birthday", midiFilePath: "midi_songs/HappyBirthday.mid" },
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