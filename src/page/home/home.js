import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/sidebar/sidebar";
import Note from "../../component/note/note";
import { useParams, useNavigate } from "react-router-dom";
import NoteContext from "../../context/NoteContext";
import "./home.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Icon from "../../component/icon/icon";
import { IoMdClose } from "react-icons/io";

function Home() {
  const { notes, setActiveNote, isFetching, addNote } = useContext(NoteContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const checkParamNote = async () => {
    const note = notes.find((anote) => anote.id === noteId);
    if (note) {
      setActiveNote(note);
      console.log("note exists and active note set");
    } else {
      console.log("no active exist");
    }
  };

  const addNewNote = async () => {
    await addNote();
  }

  useEffect(() => {
    if (noteId && !isFetching) {
      checkParamNote();
    }
  }, [noteId, isFetching, setActiveNote, navigate]);

  return (
    // <div className="home-container">
    //   <div className="sidebar-section">
    //     <Header />
    //     <Sidebar />
    //   </div>
    //   <div className="note-section">
    //     <Note />
    //   </div>
    // </div>

    <div className="home">
      <div className="header-section">
        <div className="header-sidebar">
          <div className="hamburger" onClick={toggle}>
            <GiHamburgerMenu />
          </div>
          <div className="profile-icon">
            <Icon />
          </div>
        </div>
        <div className="header-nav">
          <h3>EVERYWHERE NOTES</h3>
          <button className="header-add-button" onClick={addNewNote}>NEW</button>
        </div>
      </div>
      <div className="note">
        <div className={`sidebar-overlay ${isOpen ? "active" : ""}`}>
          <div className={`sidebar-section`}>
            <div className="sidebar-header">
              <div className="close" onClick={toggle}>
                <IoMdClose />
              </div>
              <div className="profile-icon">
                <Icon />
              </div>
            </div>
            <button className="add-new-note" onClick={addNewNote}>ADD NEW NOTE</button>
            <Sidebar toggle={toggle} />
          </div>
        </div>

        <div className="note-section">
          <Note isOpen={isOpen}  />
        </div>
      </div>
    </div>
  );
}

export default Home;
