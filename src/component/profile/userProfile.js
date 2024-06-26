import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import NoteContext from "../../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const UserProfile = ({ toggle }) => {
  const { userDetails, handleLogOut, isFetching } = useContext(NoteContext);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      setEditFullName(userDetails.fullName);
      setEditEmail(userDetails.email);
      setEditGender(userDetails.gender);
    }
  }, [userDetails]);

  return (

    <div className="profile-container">
      <div className="back-btn">
        <IoMdArrowRoundBack onClick={() => navigate(-1)} size={25}/>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          flexDirection: "column",
          borderBottom: "1px solid gray",
          paddingBottom: "50px",
        }}
      >
        <h3>Profile</h3>
        <div className="profile-pic-icon">
          {userDetails && !userDetails.profile && (
            <CgProfile size={150} style={{ color: "gray" }} />
          )}
        </div>
        <div className="profile-name">
          {isFetching ? (
            ""
          ) : userDetails ? (
            <div style={{ textAlign: "center" }}>
              <h3>{userDetails.fullName}</h3>
              <p>{userDetails.email}</p>
            </div>
          ) : (
            "GUEST"
          )}
          
        </div>
        <button className="edit-profile-btn"
            onClick={() =>
              alert(
                `Can't update at the moment. Please contact the email: "batampuyam09@gmail.com"`
              )
            }
          >
            Edit Profile
          </button>
      </div>
      <div className="setting-section">
        <p onClick={() => alert(`Can't update at the moment. Please contact the email: "batampuyam09@gmail.com"`)}>Change Password</p>
        <p onClick={() => alert(`Can't update at the moment. Please contact the email: "batampuyam09@gmail.com"`)}>Setting</p>
        <p>Change Theme</p>
      </div>
      <div className="contact-section">
            <h4 onClick={() => alert("Available Soon")}>Help & Support</h4>
            <h4 onClick={() => alert("Available Soon")}>About the Software</h4>
            <h4 onClick={() => navigate('/aboutDeveloper')}>About the Developer</h4>
      </div>
      <button className="signout-btn" onClick={handleLogOut}>
        {userDetails ? "SIGN OUT" : "SIGN IN"}
      </button>
  
    </div>
  );
};

export default UserProfile;
