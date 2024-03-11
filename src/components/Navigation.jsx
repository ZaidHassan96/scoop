import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/articles">
        <button>Articles</button>
      </Link>
    </nav>
  );
};

export default Navigation;
