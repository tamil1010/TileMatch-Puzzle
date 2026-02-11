const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const Player = require("../models/Player");

/* ===============================
   ENSURE SINGLE SESSION DOCUMENT
================================ */
const getOrCreateSession = async () => {
  let session = await Session.findOne();

  if (!session) {
    session = await Session.create({
      active: false,
      startedAt: null,
      endedAt: null,
    });
  }

  return session;
};

/* ===============================
   GET SESSION STATUS
================================ */
router.get("/session", async (req, res) => { 
  try { 
    const session = await getOrCreateSession(); 
    res.status(200).json({ session }); 
  } catch (error) { 
    console.error("Error fetching session:", error); 
    res.status(500).json({ message: "Failed to fetch session" }); 
  } 
});

/* ===============================
   START SESSION
================================ */
router.post("/session/start", async (req, res) => {
  try {
    const session = await getOrCreateSession();

    session.active = true;
    session.startedAt = new Date();
    session.endedAt = null;

    await session.save();

    // Clear previous players
    await Player.deleteMany({});

    res.status(200).json({
      message: "Session started",
      session,
    });

  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({ message: "Failed to start session" });
  }
});

/* ===============================
   END SESSION
================================ */
router.post("/session/end", async (req, res) => {
  try {
    const session = await getOrCreateSession();

    session.active = false;
    session.endedAt = new Date();

    await session.save();

    res.status(200).json({
      message: "Session ended",
      session,
    });

  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ message: "Failed to end session" });
  }
});

/* ===============================
   GET ALL PLAYERS (LEADERBOARD)
================================ */
router.get("/players", async (req, res) => {
  try {
    const players = await Player.find();

    // 🔥 Proper Ranking Logic
    const ranked = players
      .filter(p => p.endTime) // only finished players
      .sort((a, b) => {

        // 1️⃣ Higher score first
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        // 2️⃣ If score same → faster completion wins
        const timeA = new Date(a.endTime) - new Date(a.startTime);
        const timeB = new Date(b.endTime) - new Date(b.startTime);

        return timeA - timeB;
      });

    // Unfinished players go to bottom
    const unfinished = players.filter(p => !p.endTime);

    res.status(200).json([...ranked, ...unfinished]);

  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Failed to fetch players" });
  }
});

module.exports = router;
