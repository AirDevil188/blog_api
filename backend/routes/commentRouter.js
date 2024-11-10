const { Router } = require("express");
const passport = require("passport");
const commentController = require("../controllers/commentController");

const commentRouter = Router({ mergeParams: true });

commentRouter.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

commentRouter.delete(
  "/delete/comment/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

commentRouter.put(
  "/update/comment/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);

module.exports = commentRouter;
