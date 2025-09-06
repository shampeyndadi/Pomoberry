const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

const Account = require("../models/Account");
const Note = require("../models/Note");
const Recording = require("../models/Recordings");

const app = express();

const PORT = 3000;

require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/account", async (req, res) => {
  try {
    const { pomokey } = req.body;

    if (!pomokey) {
      return res.status(400).send("Pomokey is required");
    }

    const newAccount = await Account.create({ pomokey });

    const recording = await Recording.create({
      file: "Alarm.mp3",
      duration: 0,
    });

    newAccount.recordings.push(recording._id);
    await newAccount.save();

    if (!newAccount) {
      return res.status(500).send("Error creating account");
    }

    res.status(201).send("Account created");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
