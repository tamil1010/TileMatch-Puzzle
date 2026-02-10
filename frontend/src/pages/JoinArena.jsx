import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinArena() {
  const [playerName, setPlayerName] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [joining, setJoining] = useState(false);

  const navigate = useNavigate();

  /* ---------------- CHECK SESSION ---------------- */

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const res = await fetch(
          "https://jigsaw-backend-mnnx.onrender.com/session"
        );
        const data = await res.json();

        if (mounted) {
          setSessionStarted(data.session.started);
          setSessionChecked(true);
        }
      } catch (err) {
        console.error("Session check failed", err);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* ---------------- JOIN GAME ---------------- */

  const handleJoin = async () => {
    if (!playerName.trim()) return;
    if (!sessionStarted || joining) return;

    try {
      setJoining(true);

      const res = await fetch(
        "https://jigsaw-backend-mnnx.onrender.com/player/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: playerName.trim() }),
        }
      );

      if (!res.ok) {
        throw new Error("Join failed");
      }

      navigate(`/puzzle/${encodeURIComponent(playerName.trim())}`);
    } catch (err) {
      alert("Unable to join game. Try again.");
      setJoining(false);
    }
  };

  /* ---------------- LOADING ---------------- */

  if (!sessionChecked) {
    return (
      <div className="page">
        <div className="card">
          <h3>Checking session…</h3>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="page">
      <div className="card">
        <h2>Join Arena</h2>

        <p>
          {sessionStarted
            ? "Session is live. Enter your name to join."
            : "Waiting for admin to start the session"}
        </p>

        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          disabled={!sessionStarted || joining}
        />

        <button
          onClick={handleJoin}
          disabled={!sessionStarted || joining}
        >
          {joining ? "Joining..." : "Join Game"}
        </button>

        {!sessionStarted && (
          <p className="error-text">
            Session has not started yet
          </p>
        )}
      </div>
    </div>
  );
}

export default JoinArena;
