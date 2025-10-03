import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function NoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Fetch the specific note to prefill the form
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/api/notes/${id}`);
        // Assuming your backend sends the note data directly
        setUpdatedTitle(res.data.title);
        setUpdatedDescription(res.data.description);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedTitle || !updatedDescription)
      return alert("All fields required");

    try {
      await API.put(`/api/notes/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });

      navigate("/"); // redirect to home or notes list page
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  return (
    // New Wrapper DIV for Centering the Form
    <div
      style={{
        maxWidth: "600px",          // Limit the overall width
        margin: "50px auto",         // Center the block horizontally
        padding: "20px",
        border: "1px solid #444",    // Optional: for visual debugging/styling
        borderRadius: "8px",
        backgroundColor: "#1f1f1f"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <textarea
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", minHeight: "80px" }}
        />
        {/* Button Container to put them side-by-side */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <button
                type="submit"
                style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    flexGrow: 1, // Make it take available space
                    marginRight: "5px"
                }}
            >
                Update Note
            </button>
            <button
                onClick={(e) => { e.preventDefault(); navigate("/"); }} // Use e.preventDefault() to stop form submission
                style={{
                    background: "blue",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    flexGrow: 1, // Make it take available space
                    marginLeft: "5px"
                }}
            >
                Back
            </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEdit;