"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const client_1 = require("@prisma/client");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("@graphql-tools/schema");
const cors_1 = __importDefault(require("cors"));
const graphql_log_1 = __importDefault(require("graphql-log"));
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB();
const app = (0, express_1.default)();
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
const prisma = new client_1.PrismaClient();
const typeDefs = `
  type User {
    email: String!
    name: String
  }

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
    allUsers: [User!]!
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
        allUsers: () => {
            return prisma.user.findMany();
        },
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
        getArtistInfo: (_, args) => {
            return prisma.artist.findUnique({
                where: {
                    id: args.id,
                },
                include: { songs: true },
            });
        },
        getArtistScoreRecords: (_, args) => {
            return prisma.scoreRecord.findMany({
                where: {
                    artistId: args.artistId,
                },
            });
        },
    },
    Mutation: {
        createScoreRecord: (_, args) => {
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
const schema = (0, schema_1.makeExecutableSchema)({
    resolvers,
    typeDefs,
});
const logExecutions = (0, graphql_log_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
// origin: ['http://localhost:3000', 'https://transcendent-lolly-8e296f.netlify.app/' ]
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
    extensions({ result }) { },
}));
app.get("/test", (req, res, next) => {
    res.send("Test route");
});
app.use("/static", express_1.default.static("public"));
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
