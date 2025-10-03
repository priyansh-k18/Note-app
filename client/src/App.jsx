import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./components/NotePage";
import NoteDetail from "./components/NoteDetail";
import NoteEdit from "./components/NoteEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/notes/:id/edit" element={<NoteEdit/>}/> //workflow
      </Routes>
    </Router>
  );
}

export default App;
