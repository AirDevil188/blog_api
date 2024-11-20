const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const passport = require("passport");
const jwt = require("../config/jwt");

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty!"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must not be empty!"),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password must match!"),
];

const createUser = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json([errors]);
    }

    const { username, password } = req.body;
    const user = await db.findUser(username);
    if (user) {
      return res
        .status(400)
        .json([{ errors: [{ msg: "Username already exists!" }] }]);
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      const user = await db.createUser(username, hashedPassword);
      res.json(user);
    });
  }),
];

const logInUser = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }
      req.login(user, { session: false });
      req.user = user;
      const token = await jwt.generateToken(req.user);
      res.json({
        token,
      });
    }
  )(req, res, next);
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await db.getAllUsers();
  if (users.length === 0) {
    return res.status(404).json({ message: "Users not found!" });
  }
  return res.json(users);
});

const getDetailsUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await db.getUser(id);
  if (!user) {
    return res.json({ message: "User  not found!" });
  }
  return res.json(user);
});

module.exports = {
  createUser,
  logInUser,
  getAllUsers,
  getDetailsUser,
};
