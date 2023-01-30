import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
// import createGraphQLLogger from "graphql-log";

// const x = 5;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const prisma = new PrismaClient();

const typeDefs = `
  type Artist {
    id: Int
    firstName: String
    lastName: String
    songs: [Song]
  }

  type Song {
    title: String!
    midiFilePath: String
  }

  type ScoreRecord {
    artistId: Int
    username: String
    score: Int
  }

  type Query {
    allArtists: [Artist!]!
    allSongs: [Song!]!
    allScoreRecords: [ScoreRecord!]!
    getArtistInfo(id: Int): Artist!
    getArtistScoreRecords(artistId: Int): [ScoreRecord!] !
  }

  type Mutation {
    createScoreRecord(artistId: Int, username: String, score: Int): ScoreRecord
  }
  `;

const resolvers = {
  Query: {
    allArtists: () => {
      return prisma.artist.findMany({
        include: { songs: true },
      });
    },
    allSongs: () => {
      return prisma.song.findMany();
    },
    allScoreRecords: () => {
      return prisma.scoreRecord.findMany();
    },
    getArtistInfo: (_: undefined, args: { id: number }) => {
      return prisma.artist.findUnique({
        where: {
          id: args.id,
        },
        include: { songs: true },
      });
    },
    getArtistScoreRecords: (_: undefined, args: { artistId: number }) => {
      return prisma.scoreRecord.findMany({
        where: {
          artistId: args.artistId,
        },
      });
    },
  },
  Mutation: {
    createScoreRecord: (
      _: undefined,
      args: { artistId: number; username: string; score: number },
    ) => {
      return prisma.scoreRecord.create({
        data: {
          artistId: args.artistId,
          username: args.username,
          score: args.score,
        },
      });
    },
  },
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

// const logExecutions = createGraphQLLogger();

app.use(
  cors({
    origin: '*',
  }),
);
// origin: ['http://localhost:3000', 'https://transcendent-lolly-8e296f.netlify.app/' ]

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    // extensions({ result }) {},
  }),
);

app.get('/test', (req: Request, res: Response) => {
  res.send('Test route');
});

app.use('/static', express.static('public'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
