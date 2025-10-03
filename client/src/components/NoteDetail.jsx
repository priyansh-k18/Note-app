import React, { useEffect, useState, useCallback } from "react"; // <-- Import useCallback
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  // 1. Wrap fetchNote with useCallback
  const fetchNote = useCallback(async () => {
    try {
      // The API call uses 'id', but 'id' is defined outside this function
      // and is part of the dependency array below.
      const res = await API.get(`api/notes/${id}`);
      setNote(res.data);
    } catch (err) {
      console.error("Failed to fetch note:", err);
    }
  }, [id]); // <-- fetchNote only changes when 'id' changes

  useEffect(() => {
    // 2. Call the stable fetchNote function
    fetchNote();
  }, [id, fetchNote]); // <-- Include the stable 'fetchNote' in dependencies

  // Optional: Also wrap handleDelete and handleEdit for consistency, 
  // though they don't cause an immediate ESLint error here.
  const handleDelete = useCallback(async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await API.delete(`api/notes/${id}`);
      navigate("/"); // go back to homepage
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }, [id, navigate]); // Dependencies: 'id' for the API call, 'navigate' for navigation

  const handleEdit = useCallback(() => {
    navigate(`/notes/${id}/edit`);
  }, [id, navigate]); // Dependencies: 'id' for the URL, 'navigate' for the function

  if (!note) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>{note.title}</h2>
      <p style={{ whiteSpace: "pre-line" }}>{note.description}</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDelete}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
        <button
          onClick={handleEdit}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "blue",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;