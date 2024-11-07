const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function findUser(username) {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}
async function deserializeUser(id) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function createUser(username, password) {
  return prisma.user.create({
    data: { username: username, password: password },
  });
}

async function getAllUsers() {
  try {
    return prisma.user.findMany({
      select: {
        username: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUser(id) {
  try {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        username: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// posts

async function getAllPosts() {
  try {
    return prisma.post.findMany({});
  } catch (err) {
    console.log(err);
  }
}

async function getPost(id) {
  try {
    return prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function createPost(title, text, user) {
  try {
    return prisma.post.create({
      data: {
        title: title,
        text: text,
        userId: user,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  deserializeUser,
  findUser,
  createUser,
  getAllUsers,
  getAllPosts,
  createPost,
  getPost,
  getUser,
};
