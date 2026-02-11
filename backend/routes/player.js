const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Session = require("../models/Session");

/* ===============================
   START GAME (JOIN)
================================ */
router.post("/start", async (req, res) => {
  const { name } = req.body;

  const session = await Session.findOne();
  if (!session || !session.active) {
    return res.status(400).json({ message: "Session not active" });
  }

  // 🔥 Check if already joined
  let existing = await Player.findOne({ name });
  if (existing) {
    return res.status(200).json(existing);
  }

  const player = await Player.create({
    name,
    startTime: new Date(),
    score: 0
  });

  res.json(player);
});


/* ===============================
   END GAME
================================ */
router.post("/end", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    const player = await Player.findOne({ name });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Prevent double ending
    if (player.endTime) {
      return res.status(400).json({ message: "Game already ended" });
    }

    player.endTime = new Date();

    // Example scoring logic (based on completion time)
    const timeTaken =
      (player.endTime - player.startTime) / 1000;

    player.score = Math.max(0, 100 - Math.floor(timeTaken));

    await player.save();

    res.status(200).json({
      message: "Game ended",
      player
    });

  } catch (error) {
    console.error("Error ending game:", error);
    res.status(500).json({ message: "Failed to end game" });
  }
});

router.get("/players", async (req, res) => {
  try {
    const players = await Player.find();

    // Calculate time taken and sort manually
    const ranked = players
      .filter(p => p.endTime) // only finished players
      .map(p => ({
        ...p._doc,
        timeTaken: p.endTime - p.startTime
      }))
      .sort((a, b) => a.timeTaken - b.timeTaken);

    res.status(200).json(ranked);

  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Failed to fetch players" });
  }
});

module.exports = router;
