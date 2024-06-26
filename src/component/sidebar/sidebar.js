import React, { useContext } from "react";
import "./sidebar.css";
import NoteContext from "../../context/NoteContext";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const { notes, activeNote, setActiveNote, deleteNote } =
    useContext(NoteContext);

    const navigate = useNavigate();

    const handleNoteClick = (note) => {
        setActiveNote(note);
        navigate(`/${note.id}`);
        props.toggle();
    }

  return (
    <div className="sidebar-container">
      {notes &&
        notes.map((note) => {
          return (
            <div
              key={note.id}
              className={`sidebar-notes ${
                note.id === activeNote?.id && "sidebar-active-note"
              }`}
              onClick={() => handleNoteClick(note)}
            >
              <div className="sidebar-note-detail">
                <strong className="sidebar-note-title">{note.title}</strong>
                <p>{note.body && note.body.substr(0, 50) + "..."}</p>
                <small>
                  last modified:{" "}
                  {new Date(note.lastModified).toLocaleDateString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
              <button
                className="del-button"
                onClick={async () => {await deleteNote(note.id); navigate("/")}}
              >
                <MdDelete style={{ marginRight: "8px" }} />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Sidebar;
