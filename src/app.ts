import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PrismaClient } from '@prisma/client'

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

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const prisma = new PrismaClient()

// import express from 'express'
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  
  res.send("hi");
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

app.post('/post', async (req, res) => {
  // const { title, content, authorEmail } = req.body
  const email = "test@test.com"
  const post = await prisma.user.create({
    data: {
      email,
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
