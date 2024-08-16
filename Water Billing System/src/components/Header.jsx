import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3" style={{ backgroundColor: "#0F3A3F" }}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink to="/" className="navbar-brand">
            <h4 className="text-white">CWD Online Portal</h4>
          </NavLink>

          <div className="d-lg-none d-flex align-items-center ms-1">
            <NavLink to="login">
              <button
                className="btn btn-success"
                style={{ textDecoration: "none" }}
              >
                Sign in
              </button>
            </NavLink>
          </div>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <li className="nav-item mx-3">
                <NavLink to="/" className="nav-link text-white">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink to="about-us" className="nav-link text-white">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink to="contact-us" className="nav-link text-white">
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink to="services" className="nav-link text-white">
                  Services
                </NavLink>
              </li>
            </ul>
            <div className="d-none d-lg-flex ms-auto">
              <NavLink to="login">
                <button
                  className="btn btn-success"
                  style={{ textDecoration: "none" }}
                >
                  Sign in
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
