import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, fetchNotes }) {
  // 1. Create a copy of the notes array using the spread operator ([...notes])
  // 2. Reverse the copy (.reverse())
  // 3. Store the result in a new variable
  const reversedNotes = [...notes].reverse();

  return (
    <div>
      <h2>All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {/* Use the reversed array for mapping */}
          {reversedNotes.map((note) => (
            <NoteItem key={note._id} note={note} fetchNotes={fetchNotes} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;