import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PuzzlePage.css";

const SIZE = 80;
const ROWS = 2;
const COLS = 2;
const PUZZLES = ["/puzzle.jpg"];
const ROUND_TIME = 20;

function PuzzlePage() {
  const { teamName } = useParams();
  const navigate = useNavigate();

  const [pieces, setPieces] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [timeUp, setTimeUp] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  /* ---------------- SESSION ---------------- */

  useEffect(() => {
    fetch("https://jigsaw-backend-mnnx.onrender.com/session")
      .then(res => res.json())
      .then(data => {
        setSessionActive(data.session.started);
        setSessionChecked(true);
      });
  }, []);

  useEffect(() => {
    if (!sessionChecked || !sessionActive) return;
    fetch("https://jigsaw-backend-mnnx.onrender.com/player/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    });
  }, [teamName, sessionChecked, sessionActive]);

  /* ---------------- SESSION WATCHER ---------------- */

  useEffect(() => {
    if (!sessionActive) return;
    const interval = setInterval(async () => {
      const res = await fetch("https://jigsaw-backend-mnnx.onrender.com/session");
      const data = await res.json();
      if (!data.session.started) navigate("/completed");
    }, 2000);
    return () => clearInterval(interval);
  }, [sessionActive, navigate]);

  /* ---------------- TIMER ---------------- */

  const autoEndGame = useCallback(async () => {
    setTimeUp(true);
    await fetch("https://jigsaw-backend-mnnx.onrender.com/player/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    });
    navigate("/completed");
  }, [teamName, navigate]);

  useEffect(() => {
    if (!sessionActive || timeUp) return;
    if (timeLeft <= 0) {
      autoEndGame();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, autoEndGame, sessionActive, timeUp]);

  /* ---------------- INIT PUZZLE ---------------- */

  useEffect(() => {
    if (!sessionActive) return;

    const base = [];
    const positions = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        base.push({
          id: `${r}-${c}`,
          correctX: c,
          correctY: r,
          x: c,
          y: r,
          img: PUZZLES[0],
        });
        positions.push({ x: c, y: r });
      }
    }

    positions.sort(() => Math.random() - 0.5);

    setPieces(
      base.map((p, i) => ({
        ...p,
        x: positions[i].x,
        y: positions[i].y,
      }))
    );
  }, [sessionActive]);

  /* ---------------- CLICK / SWAP (FIXED) ---------------- */

  const handleClick = (id) => {
    if (!sessionActive || timeUp) return;

    if (selectedId === null) {
      setSelectedId(id);
      return;
    }

    if (selectedId === id) {
      setSelectedId(null);
      return;
    }

    setPieces(prev => {
      const p1 = prev.find(p => p.id === selectedId);
      const p2 = prev.find(p => p.id === id);

      return prev.map(p => {
        if (p.id === p1.id) return { ...p, x: p2.x, y: p2.y };
        if (p.id === p2.id) return { ...p, x: p1.x, y: p1.y };
        return p;
      });
    });

    setSelectedId(null);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    const solved = pieces.every(
      p => p.x === p.correctX && p.y === p.correctY
    );

    if (!solved) {
      alert("Complete the puzzle first!");
      return;
    }

    await fetch("https://jigsaw-backend-mnnx.onrender.com/player/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    });
    navigate("/completed");
  };

  if (!sessionChecked) return <h3 className="center">Checking session…</h3>;
  if (!sessionActive) return <h2 className="center">Session Ended</h2>;

  return (
    <div className="puzzle-stage">
      <h3 className={`timer ${timeLeft <= 10 ? "danger" : ""}`}>
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h3>

      <div className="board">
        {pieces.map(p => (
          <div
            key={p.id}
            className={`tile ${selectedId === p.id ? "selected" : ""}`}
            onClick={() => handleClick(p.id)}
            style={{
              left: p.x * SIZE,
              top: p.y * SIZE,
              backgroundImage: `url(${p.img})`,
              backgroundPosition: `-${p.correctX * SIZE}px -${p.correctY * SIZE}px`,
              backgroundSize: `${COLS * SIZE}px ${ROWS * SIZE}px`,
            }}
          />
        ))}
      </div>

      {!timeUp && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default PuzzlePage;
