const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const data = await db.createComment(text, req.params.postId, req.user.user);
  return res.json(data);
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const data = await db.deleteComment(req.params.id);
  return res.json(data);
});

const updateComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const data = await db.editComment(req.params.id, text, req.params.postId);
  return res.json(data);
});

module.exports = {
  createComment,
  deleteComment,
  updateComment,
};
