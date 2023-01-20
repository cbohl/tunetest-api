import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
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

  const score1 = await prisma.scoreRecord.create({
    data: {
      artistId: 1,
      username: "Phil",
      score: 2
    }
  })
  const score2 = await prisma.scoreRecord.create({
    data: {
      artistId: 2,
      username: "Jacqueline",
      score: 2
    }
  })  
  const score3 = await prisma.scoreRecord.create({
    data: {
      artistId: 3,
      username: "Steve",
      score: 1
    }
  })
  console.log({ theBeatles, theBackstreetBoys, easySongs, score1, score2, score3})
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