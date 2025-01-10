const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const passport = require("passport");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.post(
  "/create-category",
  passport.authenticate("jwt", { session: false }),
  auth.roleCheck,
  categoryController.createCategory
);

categoryRouter.delete(
  "/category/:id",
  passport.authenticate(
    "jwt",
    { session: false },
    auth.roleCheck,
    categoryController.deleteCategory
  )
);

module.exports = categoryRouter;
