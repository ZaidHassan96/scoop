import React, { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

const Login = ({ users }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogin = (selectedUser) => {
    setLoggedInUser(selectedUser);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <h3>{user.username}</h3>
            {loggedInUser && loggedInUser.username === user.username ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={() => handleLogin(user)}>Login</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
