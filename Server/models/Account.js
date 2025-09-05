const mongoose = require("mongoose");

const account = new mongoose.Schema({
  pomokey: { type: String, required: true, unique: true },
});

const Account = mongoose.model("Account", account);

module.exports = Account;
