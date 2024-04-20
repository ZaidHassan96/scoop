import React, { useContext } from "react";
import { UserContext } from "../contexts/User";
import "../../stylesheets/Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      {loggedInUser && ( // Check if loggedInUser exists
        <div className="profile-container">
          <h1>Welcome, {loggedInUser.username}!</h1>
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username} profile picture `}
          />
          <Link to={"/"} className="logout">
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
