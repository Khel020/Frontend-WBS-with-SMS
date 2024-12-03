import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/404.css";
const Page404 = () => {
  return (
    <div className="page-404-container">
      <div className="page-404-content">
        <h1 className="page-404-heading">404</h1>
        <p className="page-404-message">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="page-404-description">
          It seems the page you were trying to access has either been moved or
          doesn't exist anymore. Please check the URL or go back to the home
          page.
        </p>
        <NavLink to="/" className="page-404-button">
          Go Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Page404;
