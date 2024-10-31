const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send(err)
})

app.listen(process.env.PORT, () => console.log(`App is listening on the ${process.env.PORT}`))
