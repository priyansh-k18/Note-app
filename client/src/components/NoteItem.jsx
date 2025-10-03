import React from "react";
import { Link } from "react-router-dom";

function NoteItem({ note }) {
  // short preview of description
  const preview =
    note.description.length > 60
      ? note.description.substring(0, 60) + "..."
      : note.description;

  return (
    <li
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        textAlign: "left",
      }}
    >
      <h3>{note.title}</h3>
      <p>{preview}</p>
      <Link
        to={`/notes/${note._id}`}
        style={{
          display: "inline-block",
          marginTop: "5px",
          padding: "5px 10px",
          background: "blue",
          color: "white",
          textDecoration: "none",
          borderRadius: "3px",
        }}
      >
        View
      </Link>
    </li>
  );
}

export default NoteItem;
