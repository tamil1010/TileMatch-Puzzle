const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Session = require("../models/Session");

// Join game
router.post("/join", async (req, res) => {
  const { name } = req.body;
  const player = await Player.create({
    name,
    score: 0,
    startTime: new Date()
  });
  res.json(player);
});

// Check session status
router.get("/status", async (req, res) => {
  const session = await Session.findOne();
  res.json({ active: session?.active });
});

module.exports = router;
