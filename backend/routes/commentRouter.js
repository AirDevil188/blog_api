const { Router } = require("express");
const passport = require("passport");
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

const commentRouter = Router({ mergeParams: true });

commentRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this page" });
    }
  },
  commentController.createComment
);

commentRouter.delete(
  "/delete/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this page" });
    }
  },
  auth.roleCheck,
  commentController.deleteComment
);

commentRouter.put(
  "/update/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this page" });
    }
  },
  auth.roleCheck,
  commentController.updateComment
);

module.exports = commentRouter;
