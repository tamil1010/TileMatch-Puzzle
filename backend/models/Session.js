const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false
  },
  startedAt: Date,
  endedAt: Date
});

module.exports = mongoose.model("Session", SessionSchema);
