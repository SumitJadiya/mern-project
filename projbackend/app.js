require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  });

const port = process.env.DATABASE_PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
