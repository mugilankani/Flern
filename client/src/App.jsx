import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Course from "./pages/Course";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <main className="m-auto flex h-screen w-full max-w-screen-2xl flex-col">
      <Navbar />

      <div className="h-[calc(100vh-4.25rem)] overflow-hidden rounded-lg p-2.5 pt-0">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/course" element={<Course />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
