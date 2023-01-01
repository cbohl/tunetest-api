import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

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


// import express from 'express'
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// const app = express()

// app.get('/feed', async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   })
//   res.json(posts)
// })

// app.post('/post', async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(post)
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
