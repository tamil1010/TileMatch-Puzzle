const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// Create session if not exists
router.get("/status", async (req, res) => {
  let session = await Session.findOne();
  if (!session) session = await Session.create({});
  res.json(session);
});

// Start session
router.post("/start", async (req, res) => {
  const session = await Session.findOne();
  session.active = true;
  await session.save();
  res.json({ message: "Session started" });
});

// End session
router.post("/end", async (req, res) => {
  const session = await Session.findOne();
  session.active = false;
  await session.save();
  res.json({ message: "Session ended" });
});

module.exports = router;
