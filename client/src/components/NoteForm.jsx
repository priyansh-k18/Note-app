import React, { useState } from "react";
import API from "../api";

function NoteForm({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("All fields required");

    try {
      await API.post("api/notes/newNote", { title, description });
      setTitle("");
      setDescription("");
      fetchNotes(); // refresh after adding
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: "8px", fontSize: "16px", minHeight: "80px" }}
      />
      <button
        type="submit"
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
