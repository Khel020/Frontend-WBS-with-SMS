import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaFileInvoiceDollar,
} from "react-icons/fa"; // Importing required icons

const Header = () => {
  return (
    <div>
      <header
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom px-5"
        style={{ backgroundColor: "#000B58", padding: "1rem" }}
      >
        {/* Logo and Title */}
        <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
          <NavLink
            to="/"
            className="d-inline-flex align-items-center text-decoration-none"
          >
            <img
              src="/Logo/OIP.jpg"
              alt="Logo"
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="text-white fw-bold" style={{ fontSize: "20px" }}>
              Casiguran Water District
            </span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink to="/" className="nav-link px-2 link-light">
              <FaHome style={{ fontSize: "18px", marginRight: "8px" }} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className="nav-link px-2 link-light">
              <FaInfoCircle style={{ fontSize: "18px", marginRight: "8px" }} />
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us" className="nav-link px-2 link-light">
              <FaEnvelope style={{ fontSize: "18px", marginRight: "8px" }} />
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link px-2 link-light">
              <FaFileInvoiceDollar
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              My Water Bills
            </NavLink>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="col-md-3 text-end">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-4"
            style={{ transform: "scale(1.5)" }}
          >
            <FaFacebook style={{ fontSize: "20px" }} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-4"
            style={{ transform: "scale(1.5)" }}
          >
            <FaTwitter style={{ fontSize: "20px" }} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            style={{ transform: "scale(1.5)" }}
          >
            <FaInstagram style={{ fontSize: "20px" }} />
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
