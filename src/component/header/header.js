import React, { useContext, useState } from "react";
import NoteContext from "../../context/NoteContext";
import "./header.css";
import UserProfile from "../profile/userProfile";

const Header = () => {
  const { userDetails, isFetching, addNote } = useContext(NoteContext);
  const [showProfile, setShowProfile] = useState(false);

  const toggle = () => {
    setShowProfile(!showProfile);
  };

  const handleAddNote = () => {
    addNote();
  };

  return (
    <div className="header-container">
      {isFetching ? (
        <h2>Loading...</h2>
      ) : userDetails ? (
        <div className="profile-name-icon" onClick={toggle}>
          <h2>{userDetails.fullName.substr(0, 1)}</h2>
          {showProfile && <UserProfile toggle={toggle} />}
        </div>
      ) : (
        <div className="profile-name-icon" onClick={toggle}>
          <h2>User</h2>
          {showProfile && <UserProfile toggle={toggle} />}
        </div>
      )}
      <div className="header-title">
        <h1>NOTE</h1>
        <button onClick={handleAddNote} className="add-button">
          ADD
        </button>
      </div>
    </div>
  );
};

export default Header;
