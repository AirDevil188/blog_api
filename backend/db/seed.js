const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

const db = require("../db/queries");
const dotenv = require("dotenv");

dotenv.config();

async function startUp() {
  const admin = prisma.user.create({
    data: {
      username: "admin",
      password: await bcryptjs.hash(process.env.SECRET, 10),
      role: "admin",
      categories: {
        createMany: {
          data: [
            { title: "Uncategorized" },
            { title: "General" },
            { title: "Lifestyle" },
            { title: "Sport" },
            { title: "Technology" },
            { title: "Blog" },
          ],
        },
      },
      posts: {
        create: {
          title: "Hello World",
          text: "Hello I'm new here! Howdy!",
        },
      },
    },
  });

  return admin;
}

startUp();
