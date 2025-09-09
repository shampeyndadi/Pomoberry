const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "uploads", "recordings");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/sounds", express.static(path.join(__dirname, "sounds")));

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

    const defaultTypes = ["pomodoro", "break", "long-break"];

    const recordings = await Promise.all(
      defaultTypes.map((type) =>
        Recording.create({
          title: "Default Alarm",
          fileUrl: `/sounds/Alarm.mp3`,
          duration: 0,
          type,
        })
      )
    );

    newAccount.recordings.push(...recordings.map((r) => r._id));
    await newAccount.save();

    if (!newAccount) {
      return res.status(500).send("Error creating account");
    }

    res.status(201).send(newAccount);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/api/account/:pomokey", async (req, res) => {
  try {
    const { pomokey } = req.params;

    const account = await Account.findOne({ pomokey })
      .populate("recordings")
      .populate("notes");

    if (!account) {
      return res.status(404).send("Account not found");
    }

    res.status(200).send(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/account/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("logout failed");
      }

      res.clearCookie("connect.sid");
      res.status(200).send({ message: "logout successful" });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post(
  "/api/recording/upload/:pomokey",
  upload.single("recording"),
  async (req, res) => {
    try {
      const { pomokey } = req.params;
      const { type } = req.body;

      const account = await Account.findOne({ pomokey }).populate("recordings");

      if (!account) {
        return res.status(404).send("Account not found");
      }
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      if (!["pomodoro", "break", "long-break"].includes(type)) {
        return res.status(400).send("Invalid recording type");
      }

      const oldRecording = account.recordings.find((r) => r.type === type);

      if (oldRecording) {
        await Recording.findByIdAndDelete(oldRecording._id);
        account.recordings = account.recordings.filter(
          (r) => r._id.toString() !== oldRecording._id.toString()
        );
      }

      const newRecording = await Recording.create({
        title: req.file.originalname,
        fileUrl: `/uploads/recordings/${req.file.filename}`,
        type,
        duration: 0,
      });

      account.recordings.push(newRecording._id);
      await account.save();

      res.status(201).send(newRecording);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
