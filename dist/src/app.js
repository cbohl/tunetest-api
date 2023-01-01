"use strict";
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
// import { buildSchema, BuildSchemaOptions } from "graphql";
const schema_1 = require("@graphql-tools/schema");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
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
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
const app = (0, express_1.default)();
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
const prisma = new client_1.PrismaClient();
const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
  }

  `;
// type Mutation {
//   createSpecial(name: String!, email: String!): User!
// }
const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.user.findMany();
        }
    }
};
// Mutation: {
//   createSpecial: (parent: any, args: any) => {
//     return prisma.user.create({
//       email: "special@speciallly.com",
//       name: "SuperSpecialName"
//     });
//   }
// }
const schema = (0, schema_1.makeExecutableSchema)({
    resolvers,
    typeDefs,
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true
}));
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// import express from 'express'
app.get("/test", (req, res, next) => {
    res.send("hi333");
});
app.get("/super", (req, res, next) => {
    // const test = await prisma.user.create({
    //   data: {email: 'testuser@testtest.com'}
    // })
    const cars = { "bmw": "super" };
    res.json(cars);
});
// app.get("/users", (req: Request, res: Response, next: NextFunction) => {
//   const users = await prisma.user.findMany({});
//   res.json(users);
// })
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    console.log("users here", users);
    res.json(users);
    // const posts = await prisma.post.findMany()
    // console.log(posts)
    // res.json(users)
}));
app.get('/stellar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield prisma.artist.findMany();
    console.log("artists here", artists);
    res.json(artists);
    // res.send("testing!")
}));
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { title, content, authorEmail } = req.body
    const email = "test22@test22.com";
    const name = "Maggie Johnson";
    const post = yield prisma.user.create({
        data: {
            email,
            name
        },
    });
    res.json(post);
}));
// const app = express()
// app.get('/feed', async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   })
//   res.json(posts)
// })
// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   })
//   res.json(post)
// })
// app.delete('/user/:id', async (req, res) => {
//   const { id } = req.params
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   })
//   res.json(user)
// })
// const server = app.listen(3000)
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
// app.listen(4000)
