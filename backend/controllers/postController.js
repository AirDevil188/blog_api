const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler((req, res, next) => {
  res.send("GET Posts Route");
});

const postPosts = asyncHandler((req, res, next) => {
  res.send("POST Posts Route");
});

module.exports = {
  getPosts,
  postPosts,
};
