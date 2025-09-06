const mongoose = require("mongoose");

const account = new mongoose.Schema({
  pomokey: { type: String, required: true, unique: true },
  recordings: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recording" }],
    default: [],
  },
  notes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    default: [],
  },
});

const Account = mongoose.model("Account", account);

module.exports = Account;
