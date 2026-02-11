import { useEffect, useState } from "react";
import "./ui.css";

function CompletedPage() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/admin/session"
        );
        const data = await res.json();

        // ✅ Use correct backend property
        setSessionActive(data.session.active);

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
        <p>
          {sessionActive
            ? "Next round is active."
            : "Waiting for admin to start next session."}
        </p>
      </div>
    </div>
  );
}

export default CompletedPage;
