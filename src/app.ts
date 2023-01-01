import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PrismaClient } from '@prisma/client';
import { graphqlHTTP } from "express-graphql";
// import { buildSchema, BuildSchemaOptions } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
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

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const prisma = new PrismaClient()

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

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));



// import express from 'express'
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  
  res.send("hi333");
});

app.get("/super", (req: Request, res: Response, next: NextFunction) => {
  

  // const test = await prisma.user.create({
  //   data: {email: 'testuser@testtest.com'}
  // })
  const cars = {"bmw": "super"};
  res.json(cars);
})

// app.get("/users", (req: Request, res: Response, next: NextFunction) => {
//   const users = await prisma.user.findMany({});
//   res.json(users);
// })

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  console.log("users here", users)
  res.json(users)

  // const posts = await prisma.post.findMany()
  // console.log(posts)
  // res.json(users)
})
app.get('/stellar', async (req, res) => {
  const artists = await prisma.artist.findMany()
  const songs = await prisma.song.findMany()
  console.log("artists here", artists)
  res.json(songs)
  // res.send("testing!")
})

app.post('/post', async (req, res) => {
  // const { title, content, authorEmail } = req.body
  const email = "test22@test22.com";
  const name = "Maggie Johnson";
  const post = await prisma.user.create({
    data: {
      email,
      name
    },
  })
  res.json(post)
})

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

app.use(express.static('public'))


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

// app.listen(4000)