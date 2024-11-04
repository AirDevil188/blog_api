const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send(err);
});

app.listen(process.env.PORT, () =>
  console.log(`App is listening on the ${process.env.PORT}`)
);
