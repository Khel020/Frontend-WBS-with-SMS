import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaPesoSign } from "react-icons/fa6";
import "../styles/Header.css";

const Header = () => {
  const headerStyle = {
    backgroundColor: "#000B58", // Dark blue background
    position: "sticky",
    top: "0",
    zIndex: "1000",
    padding: "1rem", // Padding for the header
  };

  const navLinkStyle = {
    color: "white", // White text for nav links
    transition: "color 0.3s", // Smooth transition for hover effect
  };

  const navLinkHoverStyle = {
    color: "#80b3ff", // Light blue color on hover
  };

  const btnStyle = {
    backgroundColor: "#007bff", // Bootstrap primary color
    borderColor: "#007bff",
  };

  const btnHoverStyle = {
    backgroundColor: "#0056b3", // Darker blue on hover
  };

  const logoStyle = {
    border: "2px solid white", // White border around the logo
    borderRadius: "50%", // Circular border
  };

  return (
    <header style={headerStyle}>
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
            <span
              className="navbar-toggler-icon"
              style={{ backgroundColor: "#fff" }}
            ></span>
          </button>

          <div className="d-flex align-items-center">
            <img
              src="/Logo/OIP.jpg"
              alt="Logo"
              className="rounded-circle me-2"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                ...logoStyle,
              }}
            />
            <NavLink to="/" className="navbar-brand text-white">
              <h4 className="mb-0">Casiguran Water District</h4>
            </NavLink>
          </div>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  to="/"
                  className="nav-link d-flex align-items-center"
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = navLinkStyle.color)
                  }
                >
                  <AiFillHome className="me-2" /> Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="about-us"
                  className="nav-link d-flex align-items-center"
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = navLinkStyle.color)
                  }
                >
                  <FaInfoCircle className="me-2" /> About Us
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="contact-us"
                  className="nav-link d-flex align-items-center"
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = navLinkStyle.color)
                  }
                >
                  <MdContacts className="me-2" /> Contact Us
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="services"
                  className="nav-link d-flex align-items-center"
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = navLinkStyle.color)
                  }
                >
                  <RiServiceLine className="me-2" /> Services
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="login"
                  className="nav-link d-flex align-items-center"
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = navLinkStyle.color)
                  }
                >
                  <FaPesoSign className="me-2" /> My Bills
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
