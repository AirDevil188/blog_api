const express = require("express");
const dotenv = require("dotenv");
const jwt = require("./config/jwt");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/posts/:postId", commentRouter);
app.use("/", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`App is listening on the ${process.env.PORT}`)
);
