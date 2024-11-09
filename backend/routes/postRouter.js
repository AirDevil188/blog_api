const { Router } = require("express");

const postRouter = Router();
const postController = require("../controllers/postController");
const passport = require("passport");

postRouter.get("/", postController.getAllPosts);

postRouter.get("/post/:id", postController.getPostDetails);

postRouter.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

postRouter.delete(
  "/post/delete/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = postRouter;
