const mongoose = require("mongoose");

const recording = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    fileUrl: { type: String, required: true, default: "Alarm.mp3" },
    duration: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

const Recording = mongoose.model("Recording", recording);

module.exports = Recording;
