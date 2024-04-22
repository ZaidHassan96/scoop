import React from "react";
import "../../stylesheets/ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = ({ errMsg }) => {
  return (
    <div className="error-container">
      <h1>Hold up something went wrong...</h1>
      <p>{errMsg}</p>
      <Link to={"/"}>Return to Homepage </Link>
    </div>
  );
};

export default ErrorPage;
