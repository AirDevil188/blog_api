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
  const { title, text, category, tags, publish } = req.body;
  const arrTags = tags.toString().split(/,\s*/);

  const post = await db.createPost(
    title,
    text,
    category,
    arrTags,
    publish,
    req.user.user
  );
  return res.json(post);
});

const getUpdatePost = asyncHandler(async (req, res, next) => {
  const [postCategories, allCategories, post] = await Promise.all([
    db.getPostCategory(req.params.id),
    db.getAllCategories(),
    db.getPost(req.params.id),
  ]);

  const tagArr = [];
  post.tags.map((tag) => {
    tagArr.push({ input: tag.title });
  });

  if (!post) {
    return res.status(404).json({ message: "Post Not Found!" });
  }
  return res.json({ postCategories, allCategories, post, tagArr });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { title, text, category, tags, publish } = req.body;
  const arrTags = tags.toString().split(/,\s*/);
  const post = await db.updatePost(
    title,
    text,
    category,
    arrTags,
    publish,
    req.params.id,
    req.user.user
  );
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
