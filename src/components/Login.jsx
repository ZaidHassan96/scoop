import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import "../../stylesheets/Login.css";

const Login = ({ users }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogin = (selectedUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(selectedUser));
    setLoggedInUser(selectedUser);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      <div className="container">
        {users.map((user) => {
          return (
            <div className="user-card" key={user.username}>
              <p>{user.username}</p>
              <img
                src={user.avatar_url}
                alt={`${user.username} profile picture`}
              />
              <Link to={`/`} className="login">
                {loggedInUser && loggedInUser.username === user.username ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button onClick={() => handleLogin(user)}>Login</button>
                )}
              </Link>
            </div>
          );
          2;
        })}
      </div>
    </div>
  );
};

export default Login;
