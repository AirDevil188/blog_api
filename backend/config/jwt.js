const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async (user, res) => {
  return jwt.sign({ user: user.id, role: user.role }, process.env.SECRET, {
    expiresIn: "10min",
  });
};

module.exports = { generateToken };
