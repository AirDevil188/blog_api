const express = require("express");
const dotenv = require("dotenv");
const jwt = require("./config/jwt");

dotenv.config();

const app = express();

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/posts", commentRouter);
app.use("/", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`App is listening on the ${process.env.PORT}`)
);
