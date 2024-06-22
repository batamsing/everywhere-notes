import React, { useContext, useEffect } from "react";
import Sidebar from "../../component/sidebar/sidebar";
import Header from "../../component/header/header";
import Note from "../../component/note/note";
import { useParams, useNavigate } from "react-router-dom";
import NoteContext from "../../context/NoteContext";
import "./home.css";

function Home() {
  const { notes, setActiveNote, isFetching } = useContext(NoteContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const checkParamNote = async () => {
    const note = notes.find((anote) => anote.id === noteId);
    if (note) {
      setActiveNote(note);
      console.log("note exists and active note set");
    } else {
      console.log("no active exist");
    }
  };

  useEffect(() => {
    if (noteId && !isFetching) {
      checkParamNote();
    }
  }, [noteId, isFetching, setActiveNote, navigate]);

  return (
    <div className="home-container">
      <div className="sidebar-section">
        <Header />
        <Sidebar />
      </div>
      <div className="note-section">
        <Note />
      </div>
    </div>
  );
}

export default Home;
