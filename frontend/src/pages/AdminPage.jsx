import { useEffect, useState } from "react";
import "./ui.css";
import "./Admin.css";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [session, setSession] = useState({ active: false });
  const [players, setPlayers] = useState([]);

  /* ===============================
     AUTH
  ================================ */
  const handleLogin = () => {
    if (password === "11") setAuthorized(true);
    else alert("Wrong password");
  };

  /* ===============================
     FETCH
  ================================ */
  const fetchSession = async () => {
    const res = await fetch("http://localhost:5000/admin/session");
    const data = await res.json();
    setSession(data.session);
  };

  const fetchPlayers = async () => {
    const res = await fetch(
      "http://localhost:5000/admin/players"
    );
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    if (!authorized) return;

    fetchSession();
    fetchPlayers();

    const interval = setInterval(() => {
      fetchSession();
      fetchPlayers();
    }, 3000);

    return () => clearInterval(interval);
  }, [authorized]);

  /* ===============================
     ACTIONS
  ================================ */
  const startSession = async () => {
    try {
      await fetch(
        "http://localhost:5000/admin/session/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );

      fetchSession();
      fetchPlayers();

    } catch (error) {
      console.error("Start session error:", error);
    }
  };

  const endSession = async () => {
    await fetch(
      "http://localhost:5000/admin/session/end",
      { method: "POST" }
    );
    fetchSession();
  };

  /* ===============================
     LOGIN UI
  ================================ */
  if (!authorized) {
    return (
      <div className="page">
        <div className="card">
          <h2>Admin Login</h2>
          <p>Enter admin password to access control panel</p>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  /* ===============================
     ADMIN UI
  ================================ */
  return (
    <div className="admin-page">
      <div className="admin-top">
        <h1 className="admin-title">Admin Control Panel</h1>

        <div className="admin-controls">
          <button className="start-btn" onClick={startSession}>
            Start Session
          </button>
          <button className="end-btn" onClick={endSession}>
            End Session
          </button>
        </div>

        <div
          className={`session-status ${
            session.active ? "active" : "inactive"
          }`}
        >
          {session.active ? "SESSION ACTIVE" : "SESSION INACTIVE"}
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={p._id}>
                  <td className="rank">
                    {p.endTime ? i + 1 : "-"}
                  </td>
                  <td>{p.name}</td>
                  <td>
                    {p.startTime
                      ? new Date(p.startTime).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td>
                    {p.endTime
                      ? new Date(p.endTime).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td className="rank">
                    {p.endTime ? p.score : "-"}
                  </td> 
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
