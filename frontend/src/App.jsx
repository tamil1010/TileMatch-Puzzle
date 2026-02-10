import { BrowserRouter, Routes, Route } from "react-router-dom";

import JoinArena from "./pages/JoinArena";
import AdminPage from "./pages/AdminPage";
import PuzzlePage from "./pages/PuzzlePage";
import CompletedPage from "./pages/CompletedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinArena />} />
        <Route path="/join" element={<JoinArena />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/puzzle/:teamName" element={<PuzzlePage />} />
        <Route path="/completed" element={<CompletedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
