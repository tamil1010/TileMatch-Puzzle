# 🧩TileMatch-Puzzle

Puzzle Arena is a real-time, web-based image puzzle game built using the MERN stack. The application features a competitive puzzle-solving environment where players join a live session, solve a timed image puzzle, and have their performance tracked and ranked by an admin-controlled panel.
The project focuses on clean UI/UX, state management, and backend-driven data flow, demonstrating how frontend interactions are synchronized with MongoDB through RESTful APIs.



# 🚀 Key Features

- Live Puzzle Arena – Players can join an active session and solve a tile-based image puzzle
- Timed Gameplay – Countdown-based puzzle rounds
- Tile Swap Logic – Accurate piece swapping and validation
-  Admin Control Panel – Start/end sessions and monitor players in real time
- Leaderboard System – Ranks players based on completion time
- MongoDB Integration – Player progress and scores stored persistently
- Modern 3D UI – Dark theme with interactive depth and hover effects


# 🛠 Tech Stack

- Frontend: React, CSS (3D UI, responsive design)
- Backend: Node.js, Express
- Database: MongoDB
- Architecture: REST API (no sockets)



# 📁 Project Structure

    jigsaw-puzzle/
    │
    ├── backend/
    │   ├── routes/
    │   │   ├── admin.js
    │   │   ├── player.js
    │   │   └── session.js
    │   ├── models/
    │   │   └── Player.js
    │   ├── index.js
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── pages/
    │   │   │   ├── JoinArena.jsx
    │   │   │   ├── PuzzlePage.jsx
    │   │   │   ├── AdminPage.jsx
    │   │   │   └── CompletedPage.jsx
    │   │   ├── App.jsx
    │   │   ├── ui.css
    │   │   └── Admin.css
    │   └── vite.config.js
    │
    └── README.md


