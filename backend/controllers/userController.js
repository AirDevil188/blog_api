const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

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
      console.log(errors);
      console.log("error");
      return res.status(422).json({ message: errors });
    }

    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      await db.createUser(username, hashedPassword);
      res.redirect("/");
    });
  }),
];

module.exports = {
  createUser,
};
