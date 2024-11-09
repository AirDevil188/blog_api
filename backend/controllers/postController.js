const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await db.getAllPosts();
  if (posts.length === 0) {
    return res.json({ message: "There are no posts!" });
  }
  return res.json(posts);
});

const getPostDetails = asyncHandler(async (req, res, next) => {
  const post = await db.getPost(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }
  return res.json(post);
});

const createPost = asyncHandler(async (req, res, next) => {
  const { title, text } = req.body;
  await db.createPost(title, text, req.user);
  res.redirect("/posts");
});

const deletePost = asyncHandler(async (req, res, next) => {
  await db.deletePost(req.params.id);
  res.redirect("/posts");
});

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostDetails,
};
