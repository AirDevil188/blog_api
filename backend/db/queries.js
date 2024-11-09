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
      select: {
        id: false,
        createdAt: true,
        updatedAt: true,
        text: true,
        title: true,
        comments: {
          select: {
            id: false,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: false,
                password: false,
                username: true,
              },
            },
          },
        },
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

async function deletePost(id) {
  try {
    return prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// comments

async function getAllComments(postId) {
  try {
    return prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function createComment(text, postId, userId) {
  try {
    return prisma.comment.create({
      data: {
        text: text,
        postId: postId,
        userId: userId,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(id) {
  try {
    return prisma.comment.delete({
      where: {
        id: id,
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
  getAllComments,
  createComment,
  deleteComment,
  createPost,
  deletePost,
  getPost,
  getUser,
};
