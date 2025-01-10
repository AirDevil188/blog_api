const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/sign-up", userController.createUser);

userRouter.post("/log-in", userController.logInUser);

userRouter.post("/cms-log-in", userController.logInAdmin);

userRouter.get("/users", userController.getAllUsers);

userRouter.get("/users/:id", userController.getDetailsUser);

module.exports = userRouter;
