import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Topics from "./Topics";
import { UserContext } from "../contexts/User";
import "../../stylesheets/Navigation.css";

const Navigation = (topics, SetTopics) => {
  const { loggedInUser } = useContext(UserContext);
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);

  // const topicsArr = topics.topics.topics;

  const handleDropdownToggle = () => {
    setIsTopicsDropdownOpen((prev) => !prev);
  };
  return (
    <nav style={{ marginBottom: "10px" }}>
      <div className="nav-container">
        <div>
          <Link to="/" style={{ marginRight: "1rem" }}>
            <button>Home</button>
          </Link>
          <div
            style={{
              position: "relative",
              marginRight: "1rem",
              display: "inline-block",
            }}
            onMouseEnter={() => handleDropdownToggle(false)}
            onMouseLeave={() => handleDropdownToggle(true)}
          >
            <button style={{ width: "120px" }}>Articles ▼</button>

            {isTopicsDropdownOpen && topics !== null > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  zIndex: 9999,
                  width: "100%",
                }}
              >
                <Topics topics={topics} SetTopics={SetTopics} />
              </div>
            )}
          </div>
        </div>

        {loggedInUser ? (
          // If user is logged in, render link to profile page
          <Link
            to={`/profile/${loggedInUser.username}`}
            className="profile-link"
          >
            Profile
          </Link>
        ) : (
          // If user is not logged in, render link to login page
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
