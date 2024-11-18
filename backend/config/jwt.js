const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async (user, res) => {
  return jwt.sign(
    { user: user.id, role: user.role, username: user.username },
    process.env.SECRET,
    {
      expiresIn: "10min",
    }
  );
};

module.exports = { generateToken };
