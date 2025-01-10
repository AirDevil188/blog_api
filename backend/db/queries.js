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
    return prisma.post.findMany({
      select: {
        text: true,
        title: true,
        createdAt: true,
        id: true,
        publish: true,
        user: {
          select: {
            username: true,
            id: false,
            password: false,
          },
        },
      },
    });
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
        publish: true,
        comments: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            text: true,
            user: {
              select: {
                id: false,
                password: false,
                username: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                title: true,
                userId: false,
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

async function createPost(title, text, categories, publish, user) {
  try {
    return prisma.post.create({
      data: {
        title: title,
        text: text,
        publish: publish,
        userId: user,
        categories: {
          create: categories.map((category) => ({
            category: { connect: { id: category } },
          })),
        },
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

async function updatePost(title, text, categories, publish, id) {
  try {
    await deletePostCategory(id);
    return prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        text: text,
        publish: publish,
        categories: {
          create: categories.map((category) => ({
            category: {
              connect: { id: category },
            },
          })),
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// comments

async function getComment(commentId) {
  try {
    return prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

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

async function editComment(id, text, postId) {
  try {
    return prisma.comment.update({
      where: {
        id: id,
        postId: postId,
      },
      data: {
        text: text,
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

async function getAllCategories() {
  try {
    return prisma.category.findMany({
      select: {
        title: true,
        id: true,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getPostCategory(postId) {
  try {
    return prisma.postCategory.findMany({
      where: {
        postId: postId,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createCategory(title, userId) {
  try {
    return prisma.category.create({
      data: {
        title: title,
        userId: userId,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function deleteCategory(id) {
  try {
    return prisma.category.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function deletePostCategory(id) {
  try {
    return prisma.postCategory.deleteMany({
      where: { postId: id },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  deserializeUser,
  findUser,
  createUser,
  getAllUsers,
  getAllPosts,
  getComment,
  getAllComments,
  createComment,
  editComment,
  deleteComment,
  createPost,
  updatePost,
  deletePost,
  getPost,
  getUser,
  getAllCategories,
  getPostCategory,
  createCategory,
  deleteCategory,
};
