import { useEffect, useState } from "react";
import "./ui.css";

function CompletedPage() {
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          "https://jigsaw-backend-mnnx.onrender.com/session"
        );
        const data = await res.json();

        // 🔥 ONLY UPDATE STATE — NO NAVIGATION
        setSessionStarted(data.session.started);
      } catch (err) {
        console.error("Session check failed", err);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>✔ Puzzle Completed</h2>
      </div>
    </div>
  );
}

export default CompletedPage;
