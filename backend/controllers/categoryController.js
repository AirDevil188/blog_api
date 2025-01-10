const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await db.getAllCategories();

  if (!categories) {
    return res.status(404).json({ message: "Categories Not Found!" });
  }

  return res.json(categories);
});

const createCategory = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const category = await db.createCategory(text, req.user.user);
  return res.json(category);
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await db.deleteCategory(req.params.id);
  return res.json(category);
});

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
