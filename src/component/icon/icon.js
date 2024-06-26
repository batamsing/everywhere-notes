import React, { useContext } from 'react';
import "./icon.css";
import NoteContext from '../../context/NoteContext'; 
import { useNavigate } from 'react-router-dom';

const Icon = () => {
    const { userDetails, isFetching } = useContext(NoteContext);
  const navigate = useNavigate();


  return (
    <>
    {isFetching ? (
        <h2>Loading...</h2>
      ) : userDetails ? (
        <div className="profile-name-icon" onClick={() => navigate("/profile")}>
          <h2>{userDetails.fullName.substr(0, 1)}</h2>
        </div>
      ) : (
        <div className="profile-name-icon" onClick={() => navigate("/profile")}>
          <h2>User</h2>
        </div>
      )}
      </>
  )
}

export default Icon