import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Course from "./pages/Course";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import LearningUnit from "./pages/LearningUnit";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";

function App() {
  return (
    <main className="m-auto flex h-screen w-full max-w-screen-2xl flex-col">
      {/* Navbar stays on top */}
      <Navbar />

      <div className="h-[calc(100vh-4.25rem)] overflow-auto rounded-lg p-2.5 pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/content" element={<LearningUnit />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
