import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="p-3" style={{ backgroundColor: "#0F3A3F" }}>
        <nav>
          <div className="container-fluid">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <h4 className="text-white">CWD Online Portal</h4>
              <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0 mx-auto gap-5">
                <li>
                  <NavLink to="/" className="nav-link px-2 text-white">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="about-us" className="nav-link px-2 text-white">
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="contact-us" className="nav-link px-2 text-white">
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="services" className="nav-link px-2 text-white">
                    Services
                  </NavLink>
                </li>
              </ul>
              <div className="text-end">
                <NavLink to="login">
                  <button
                    type="button"
                    className="btn btn-warning"
                    style={{ maxWidth: "px" }}
                  >
                    Sign in
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
