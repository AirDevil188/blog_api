const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await db.getAllPosts();
  if (posts.length === 0) {
    return res.status(404).json({ message: "There are no Posts!" });
  }
  return res.json(posts);
});

const getPostDetails = asyncHandler(async (req, res, next) => {
  const post = await db.getPost(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found!" });
  }
  return res.json(post);
});

const createPost = asyncHandler(async (req, res, next) => {
  const { title, text, publish } = req.body;
  const post = await db.createPost(title, text, publish, req.user.user);
  return res.json(post);
});

const getUpdatePost = asyncHandler(async (req, res, next) => {
  const post = await db.getPost(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found!" });
  }
  return res.json(post);
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { title, text, publish } = req.body;
  const post = await db.updatePost(title, text, publish, req.params.id);
  return res.json(post);
});

const deletePost = asyncHandler(async (req, res, next) => {
  const post = await db.deletePost(req.params.id);
  return res.json(post);
});

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getUpdatePost,
  updatePost,
  getPostDetails,
};
