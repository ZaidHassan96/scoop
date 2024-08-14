import React, { useContext } from "react";
import { UserContext } from "../contexts/User";
import "../../stylesheets/Profile.css";
import { Link, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Profile = (users, err, setErr, isLoading, setisLoading) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { username } = useParams();

  const userExists = () => {
    const user = users.users.find((user) => {
      return user.username.trim() === username.trim();
    });

    const exists = !!user; // Convert to boolean

    return exists;
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!userExists()) {
    return <ErrorPage errMsg={`User does not exist`} />;
  }
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
