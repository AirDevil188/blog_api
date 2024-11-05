const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/sign-up", userController.createUser);

userRouter.post("/log-in");

userRouter.get("/users", userController.getAllUsers);

module.exports = userRouter;
