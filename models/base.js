const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const baseSchema = mongoose.Schema({
  name: { type: String, unique: true },
  vs: { type: Object },
});
module.exports = mongoose.model("Base", baseSchema);
