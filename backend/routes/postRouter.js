const { Router } = require("express");

const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/posts", postController.getAllPosts);

postRouter.get("/posts/:id", postController.getPostDetails);

postRouter.post("/posts/create-post", postController.createPost);

module.exports = postRouter;
