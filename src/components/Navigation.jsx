import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topics from "./Topics";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const Navigation = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsTopicsDropdownOpen((prev) => !prev);
  };
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div
        onMouseEnter={() => handleDropdownToggle(true)}
        onMouseLeave={() => handleDropdownToggle(false)}
      >
        <Link to="/articles">
          <button>Articles ▼</button>
        </Link>

        {isTopicsDropdownOpen && <Topics />}
      </div>
      <Link to="/login">
        <button>Login Page</button>
      </Link>
      {loggedInUser && <p>User: {loggedInUser.username}</p>}
    </nav>
  );
};

export default Navigation;
