const mongoose = require("mongoose");

const notes = new mongoose.Schema({
  content: { type: String, trim: true, default: "" },
});

const Note = mongoose.model("Note", notes);

module.exports = Note;
