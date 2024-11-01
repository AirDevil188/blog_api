const { Router } = require("express");

const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/", postController.getPosts);

postRouter.post("/", postController.postPosts);

module.exports = postRouter;
