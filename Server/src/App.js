const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

require("dotenv").config();

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
