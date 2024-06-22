import React, { useContext, useState, useEffect } from "react";
import "./note.css";
import NoteContext from "../../context/NoteContext";

const Note = () => {
  const { activeNote, onUpdateNote, isUpdating } = useContext(NoteContext);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");



  useEffect(() => {
    if (activeNote) {
      setEditTitle(activeNote.title);
      setEditBody(activeNote.body);
    }
  }, [activeNote, isUpdating]);

  const onEditField = (key, value) => {
    if (key === "title") {
      setEditTitle(value);
    } else {
      setEditBody(value);
    }
  };

  const handleSave = () => {
    const updatedNote = {
      ...activeNote,
      title: editTitle,
      body: editBody,
      lastModified: Date.now(),
    };
    onUpdateNote(updatedNote);
  };

  if (!activeNote) {
    return (
      <div className="note-container no-active-note">
        <p>No note is selected</p>
      </div>
    );
  }
  
  if(isUpdating) {
    return <div className="saving">SAVING...</div>
  }

  return (
    <div className="note-container">
      <div className="edit-container">
        <input
          placeholder="Your Title Here"
          type="text"
          value={editTitle}
          onChange={(e) => onEditField("title", e.target.value)}
        />
        <textarea
          placeholder="Write your note here..."
          value={editBody}
          onChange={(e) => onEditField("body", e.target.value)}
        />
        
      </div>
      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Note;
