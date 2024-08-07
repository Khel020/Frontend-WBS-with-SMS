import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="p-3" style={{ backgroundColor: "#0F3A3F" }}>
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <h4 className="text-white">CWD Online Portal</h4>
            <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0 mx-auto gap-5">
              <li>
                <a href="/home" className="nav-link px-2 text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about-us" className="nav-link px-2 text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="nav-link px-2 text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/FAQs" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/announcement" className="nav-link px-2 text-white">
                  Announcements
                </a>
              </li>
            </ul>
            <div className="text-end">
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ maxWidth: "px" }}
                >
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
