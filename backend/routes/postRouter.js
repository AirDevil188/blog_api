const { Router } = require("express");

const postRouter = Router({ mergeParams: true });
const postController = require("../controllers/postController");
const passport = require("passport");

const roleCheck = require("../middlewares/roleCheck");

postRouter.get("/", postController.getAllPosts);

postRouter.get(
  "/post/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this page" });
    }
  },
  postController.getPostDetails
);

postRouter.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  roleCheck.roleCheck,
  postController.createPost
);

postRouter.delete(
  "/post/delete/:id",
  passport.authenticate("jwt", { session: false }),
  roleCheck.roleCheck,
  postController.deletePost
);

postRouter.put(
  "/post/update/:id",
  passport.authenticate("jwt", { session: false }),
  roleCheck.roleCheck,
  postController.updatePost
);

module.exports = postRouter;
