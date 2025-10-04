import React, { useEffect, useState } from "react";
import API from "../api";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  // fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>My Notes app</h1>
      <NoteForm fetchNotes={fetchNotes} />
      <NoteList notes={notes} fetchNotes={fetchNotes} />
    </div>
  );
}

export default NotesPage;
