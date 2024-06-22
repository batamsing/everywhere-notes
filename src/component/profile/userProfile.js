import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import NoteContext from "../../context/NoteContext";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ toggle }) => {
  const { userDetails, handleLogOut, isFetching } = useContext(NoteContext);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSaveProfile = () => {
    alert("You can't update your profile right now. Please contact the email: batampuyam09@gmail.com");
  }


  useEffect(() => {
    if (userDetails) {
      setEditFullName(userDetails.fullName);
      setEditEmail(userDetails.email);
      setEditGender(userDetails.gender);
    }
  }, [userDetails]);

  return (
    <div className="overlay">
      <div className="profile-container">
        {isFetching ? (
          <h1>LOADING...</h1>
        ) : !userDetails ? (
          <div className="no-user">
            <h1>NO USER FOUND!</h1>
            <button className="signin-btn" onClick={handleSignIn}>
              PLEASE SIGN IN HERE
            </button>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <h2>{userDetails.fullName}</h2>
              <button className="close profile-btn" onClick={toggle}>CLOSE</button>
            </div>
            <div className="profile-details">
              <div className="profile-field">
                <label>Full Name</label>
                <input
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Email</label>
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.targer.value)}
                />
              </div>
              <div className="profile-field">
                <label>Gender</label>
                <input
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                />
              </div>
            </div>
            <div style={{display: "flex", justifyContent:"space-between"}}>
              <button className="signout profile-btn" onClick={handleLogOut}>SIGN OUT</button>
              <button className="save profile-btn" onClick={handleSaveProfile}>SAVE</button>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default UserProfile;
