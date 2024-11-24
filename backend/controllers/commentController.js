const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createComment = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { text } = req.body;
  await db.createComment(text, req.params.postId, req.user.user);
  return res.redirect(`/posts/post/${req.params.postId}`);
});

const deleteComment = asyncHandler(async (req, res, next) => {
  await db.deleteComment(req.params.id);
  return res.redirect(`/posts/post/${req.params.id}`);
});

const updateComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  await db.editComment(req.params.id, text, req.params.postId);
  res.redirect(`/posts/post/${req.params.postId}`);
});

module.exports = {
  createComment,
  deleteComment,
  updateComment,
};
