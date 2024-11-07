const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async (user, res) => {
  jwt.sign(
    { user: user.id },
    process.env.SECRET,
    { expiresIn: "2min" },
    (err, token) => {
      return res.json({
        token,
      });
    }
  );
};

module.exports = { generateToken };
