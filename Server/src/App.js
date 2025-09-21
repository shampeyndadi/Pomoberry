const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URI,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const upload = multer({ storage: multer.memoryStorage() });

const Account = require("../models/Account");
const Note = require("../models/Note");
const Recording = require("../models/Recordings");

const app = express();

const PORT = 3000;

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
    origin: ["http://localhost:5173", "https://pomoberry.vercel.app"],
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

    const accounts = await Account.find();

    for (const acc of accounts) {
      const isMatch = await bcrypt.compare(pomokey, acc.pomokey);
      if (isMatch) {
        let populatedAccount = await Account.findById(acc._id)
          .populate("recordings")
          .populate("notes");

        const updatedRecordings = await Promise.all(
          populatedAccount.recordings.map(async (rec) => {
            if (!rec.fileUrl || rec.fileUrl.startsWith("/sounds")) return rec;

            const { data, error } = await supabase.storage
              .from("pomoberry-recordings")
              .createSignedUrl(rec.fileUrl, 60 * 60);

            return {
              ...rec.toObject(),
              fileUrl: error ? null : data.signedUrl,
            };
          })
        );

        populatedAccount = populatedAccount.toObject();
        populatedAccount.recordings = updatedRecordings;
        return res.status(200).send(populatedAccount);
      }
    }

    const hash = await bcrypt.hash(pomokey, 10);
    const newAccount = await Account.create({ pomokey: hash });

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

app.post("/api/account/login", async (req, res) => {
  try {
    const { pomokey } = req.body;

    if (!pomokey) return res.status(404).send("Pomokey required");

    const accounts = await Account.find();

    let matchedAccount = null;

    for (const acc of accounts) {
      const isMatch = await bcrypt.compare(pomokey, acc.pomokey);

      if (isMatch) {
        matchedAccount = acc;
        break;
      }
    }

    if (!matchedAccount) return res.status(404).send("Invalid pomokey");

    let populatedAccount = await Account.findById(matchedAccount._id)
      .populate("recordings")
      .populate("notes");

    const updatedRecordings = await Promise.all(
      populatedAccount.recordings.map(async (rec) => {
        if (!rec.fileUrl || rec.fileUrl.startsWith("/sounds")) return rec;

        const { data, error } = await supabase.storage
          .from("pomoberry-recordings")
          .createSignedUrl(rec.fileUrl, 60 * 60);

        return {
          ...rec.toObject(),
          fileUrl: error ? null : data.signedUrl,
        };
      })
    );

    populatedAccount = populatedAccount.toObject();
    populatedAccount.recordings = updatedRecordings;

    res.status(200).send(populatedAccount);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/api/account/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;

    let account = await Account.findById(accountId)
      .populate("recordings")
      .populate("notes");

    if (!account) {
      return res.status(404).send("Account not found");
    }

    const updatedRecordings = await Promise.all(
      account.recordings.map(async (rec) => {
        if (!rec.fileUrl || rec.fileUrl.startsWith("/sounds")) return rec;

        const { data, error } = await supabase.storage
          .from("pomoberry-recordings")
          .createSignedUrl(rec.fileUrl, 60 * 60);

        return {
          ...rec.toObject(),
          fileUrl: error ? null : data.signedUrl,
        };
      })
    );

    account = account.toObject();
    account.recordings = updatedRecordings;

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

app.post("/api/notes/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const { content } = req.body;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).send("Account not found");
    }

    const newNote = await Note.create({ content });

    account.notes.push(newNote._id);

    await account.save();

    const updatedAccount = await Account.findById(accountId).populate("notes");

    res.status(201).send(updatedAccount);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/notes/:accountId/:noteId", async (req, res) => {
  try {
    const { accountId, noteId } = req.params;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).send("Account not found");
    }

    account.notes = account.notes.filter((id) => id.toString() !== noteId);

    await account.save();

    await Note.findByIdAndDelete(noteId);

    const updatedAccount = await Account.findById(accountId).populate("notes");

    res.status(200).send(updatedAccount);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post(
  "/api/recording/upload/:accountId",
  upload.single("recording"),
  async (req, res) => {
    try {
      const { accountId } = req.params;
      const { type } = req.body;

      const account = await Account.findById(accountId).populate("recordings");

      if (!account) {
        return res.status(404).send("Account not found");
      }
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      if (!["pomodoro", "break", "long-break"].includes(type)) {
        return res.status(400).send("Invalid recording type");
      }

      const fileName = `${accountId}-${type}-${Date.now()}${path.extname(
        req.file.originalname
      )}`;

      const { data, error } = await supabase.storage
        .from("pomoberry-recordings")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) return res.status(500).send("Upload failed");

      const filePath = data.path;

      const newRecording = await Recording.create({
        title: req.file.originalname,
        fileUrl: filePath,
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

app.get("/api/recording/url/:path", async (req, res) => {
  try {
    const { path } = req.params;

    const { data, error } = await supabase.storage
      .from("pomoberry-recordings")
      .createSignedUrl(path, 60 * 60);

    if (error) return res.status(500).send("Could not create signed URL");

    res.json({ url: data.signedUrl });
  } catch (err) {
    res.status(500).send(err);
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
