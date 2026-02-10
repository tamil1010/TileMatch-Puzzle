const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  score: Number,
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model("Player", PlayerSchema);
