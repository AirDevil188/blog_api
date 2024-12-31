const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async (user, res) => {
  return jwt.sign(
    { user: user.id, username: user.username, role: user.role },
    process.env.SECRET,
    {
      expiresIn: "4h",
    }
  );
};

module.exports = { generateToken };
