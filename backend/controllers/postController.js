const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler((req, res, next) => {
  res.send("GET Posts Route");
});

const createPost = asyncHandler((req, res, next) => {
  res.send("POST Posts Route");
});

module.exports = {
  getPosts,
  postPosts,
};
