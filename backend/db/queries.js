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
module.exports = {
  deserializeUser,
  findUser,
  createUser,
};
