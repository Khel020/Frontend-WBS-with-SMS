import React, { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      style={{
        backgroundColor: "#00695C",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      <div className="container-fluid">
        <div className="row py-2">
          {/* Contact info for medium and larger screen sizes */}
          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <a
                href="mailto:casiguranwd1988@gmail.com"
                className="text-white text-decoration-none me-1"
              >
                <i className="bi bi-envelope me-1 text-white"></i>
                casiguranwd1988@gmail.com
              </a>
              <span className="text-white">
                <i className="bi bi-phone me-1 text-white"></i>
                +639172095367
              </span>
            </div>
          </div>
          {/* Social icons hidden on mobile */}
          <div className="col-12 col-md-6">
            <div className="d-none d-md-flex justify-content-end align-items-center">
              <a
                href="#"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-globe"></i>
              </a>
              <a
                href="#"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Main Header with Navigation */}
      <div className="shadow-sm" style={{ backgroundColor: "#00695C" }}>
        <div className="container-fluid">
          <div className="navbar navbar-expand-lg navbar-light py-3">
            <a href="/" className="navbar-brand">
              {/* Text for larger screens */}
              <h5 className="mb-0 text-white d-none d-md-block">
                Casiguran Water District Portal
              </h5>
              {/* Text for small screens */}
              <h6 className="mb-0 text-white d-block d-md-none">
                Casiguran Water District Portal
              </h6>
            </a>
            {/* Navbar Toggler for mobile */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
              style={{
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
                padding: "0.5rem",
              }}
              onFocus={(e) => (e.target.style.outline = "none")}
            >
              {isMobileMenuOpen ? (
                <i className="bi bi-x" style={{ fontSize: "1.5rem" }}></i>
              ) : (
                <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
              )}
            </button>

            {/* Collapsed Navbar Menu */}
            <div
              className={`collapse navbar-collapse text-white ${
                isMobileMenuOpen ? "show" : ""
              }`}
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link active text-white"
                    style={{ fontSize: "15px" }}
                  >
                    <i
                      className="bi bi-house me-1"
                      style={{ fontSize: "15px" }}
                    ></i>{" "}
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#about" className="nav-link text-white">
                    <i
                      className="bi bi-info-circle me-1"
                      style={{ fontSize: "15px" }}
                    ></i>{" "}
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/contact-us" className="nav-link text-white">
                    <i
                      className="bi bi-telephone me-1"
                      style={{ fontSize: "15px" }}
                    ></i>{" "}
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
