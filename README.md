📌 Project Description

Puzzle Arena is a real-time, web-based image puzzle game built using the MERN stack. The application features a competitive puzzle-solving environment where players join a live session, solve a timed image puzzle, and have their performance tracked and ranked by an admin-controlled panel.

The project focuses on clean UI/UX, state management, and backend-driven data flow, demonstrating how frontend interactions are synchronized with MongoDB through RESTful APIs.

🚀 Key Features

🎮 Live Puzzle Arena – Players can join an active session and solve a tile-based image puzzle

⏱ Timed Gameplay – Countdown-based puzzle rounds

🔄 Tile Swap Logic – Accurate piece swapping and validation

🧑‍💼 Admin Control Panel – Start/end sessions and monitor players in real time

📊 Leaderboard System – Ranks players based on completion time

🗄 MongoDB Integration – Player progress and scores stored persistently

🎨 Modern 3D UI – Dark theme with interactive depth and hover effects

🛠 Tech Stack

Frontend: React, CSS (3D UI, responsive design)

Backend: Node.js, Express

Database: MongoDB

Architecture: REST API (no sockets)

📁 Project Structure
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

▶️ How to Run the Project
✅ Prerequisites

Node.js (v16 or above)

MongoDB (local or MongoDB Atlas)

npm or yarn

1️⃣ Clone the Repository
git clone https://github.com/your-username/puzzle-arena.git
cd puzzle-arena

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Start backend server:

npm start


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

4️⃣ Admin Access

Navigate to /admin

Enter admin password (configured in code)

Start a session to allow players to join

📂 Use Cases

College mini-project / final-year project

MERN stack learning reference

Admin-controlled multiplayer game prototype

📌 Highlights

No third-party UI libraries

Clean separation of frontend and backend logic

MongoDB-driven leaderboard updates

Scalable and easy to extend

👤 Author

Tamilvani S
MERN Stack Developer
GitHub: add your GitHub profile link here

🧠 Final Note

This project is built with a focus on clarity, structure, and real-world MERN practices, making it suitable for academic evaluation and portfolio presentation.
