import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaUserCircle,
} from "react-icons/fa";

import "../styles/Header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle Dropdown Menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className="navbar navbar-expand-lg navbar-dark px-3"
      style={{
        backgroundColor: "#000B58",
        position: "sticky",
        top: "0", // Para naka-fix sa pinaka-ibabaw
        zIndex: "1020", // Para mas mataas kaysa ibang elements
      }}
    >
      {/* Logo and Title */}
      <NavLink
        to="/"
        className="navbar-brand d-flex align-items-center"
        style={{
          fontWeight: "bold",
        }}
      >
        <img
          src="/Logo/OIP.jpg"
          alt="Logo"
          className="rounded-circle me-2"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
          }}
        />
        <span
          className="d-none d-sm-inline text-white"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Casiguran Water District
        </span>
      </NavLink>

      {/* Hamburger Icon (Visible only on mobile) */}
      <button
        className="btn text-white d-lg-none" // Display on mobile only
        onClick={toggleDropdown}
        style={{
          fontSize: "24px",
          border: "none",
          background: "none",
        }}
      >
        <FaBars />
      </button>

      {/* Dropdown Menu (Visible only on mobile) */}
      {isDropdownOpen && (
        <div
          className="dropdown-menu-custom"
          style={{
            position: "absolute",
            top: "100%", // Below the header
            right: "0", // Align to the right of the button
            width: "200px",
            backgroundColor: "#000B58",
            color: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <ul className="list-unstyled mb-0">
            <li className="p-2">
              <NavLink to="/" className="text-white text-decoration-none">
                <FaHome className="me-2" />
                Home
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/about-us"
                className="text-white text-decoration-none"
              >
                <FaInfoCircle className="me-2" />
                About Us
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/contact-us"
                className="text-white text-decoration-none"
              >
                <FaPhone className="me-2" />
                Contact Us
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink to="/login" className="text-white text-decoration-none">
                <FaUserCircle className="me-2" />
                My Water Bills
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Menu Links for larger screens */}
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <FaHome className="me-2" style={{ fontSize: "20px" }} />
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-us" className="nav-link ">
              <FaInfoCircle className="me-2" style={{ fontSize: "20px" }} />
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact-us" className="nav-link ">
              <FaPhone className="me-2" style={{ fontSize: "20px" }} />
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link ">
              <FaUserCircle className="me-2" style={{ fontSize: "20px" }} />
              My Water Bills
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Social Media Icons (Visible on larger screens) */}
      <div className="d-none d-lg-block">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <FaFacebook style={{ fontSize: "20px" }} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <FaTwitter style={{ fontSize: "20px" }} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <FaInstagram style={{ fontSize: "20px" }} />
        </a>
      </div>
    </header>
  );
};

export default Header;
