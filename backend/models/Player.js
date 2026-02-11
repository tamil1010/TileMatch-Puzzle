const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model("Player", PlayerSchema);
