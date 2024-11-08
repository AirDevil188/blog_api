const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  await db.createComment(text, req.params.id, req.user);
  return res.redirect(`/posts/post/${req.params.id}`);
});

module.exports = {
  createComment,
};
