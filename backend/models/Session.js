const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model("Session", SessionSchema);
