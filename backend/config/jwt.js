const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async (user, res) => {
  return jwt.sign({ user: user.id }, process.env.SECRET, { expiresIn: "2min" });
};

module.exports = { generateToken };
