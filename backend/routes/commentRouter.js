const { Router } = require("express");
const passport = require("passport");
const commentController = require("../controllers/commentController");

const commentRouter = Router();

commentRouter.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

module.exports = commentRouter;
