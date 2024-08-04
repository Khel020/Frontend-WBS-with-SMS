import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure this path is correct

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "200px",
        height: "100vh",
        borderBottomRightRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "#80AF81",
      }}
    >
      <Link
        to=""
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Sidebar</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link
            to="/dashboard"
            className={`sidebar-nav-link nav-link ${
              activeLink === "Dashboard" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("Dashboard")}
          >
            <i
              className="bi bi-house"
              style={{
                fontSize: "20px",
                marginRight: "10px",
              }}
            ></i>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/listClient"
            className={`sidebar-nav-link nav-link ${
              activeLink === "List Client" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("List Client")}
          >
            <i
              className="bi bi-person-lines-fill"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            List Client
          </Link>
        </li>
        <li>
          <Link
            to="/bills"
            className={`sidebar-nav-link nav-link ${
              activeLink === "Billing" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("Billing")}
          >
            <i
              className="bi bi-file-earmark-text"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            Billing
          </Link>
        </li>
        <li>
          <Link
            to=""
            className={`sidebar-nav-link nav-link ${
              activeLink === "Record" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("Record")}
          >
            <i
              className="bi bi-collection"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            Record
          </Link>
        </li>
        <li>
          <Link
            to="/userList"
            className={`sidebar-nav-link nav-link ${
              activeLink === "User List" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("User List")}
          >
            <i
              className="bi bi-people-fill"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            User List
          </Link>
        </li>
        <li>
          <Link
            to=""
            className={`sidebar-nav-link nav-link ${
              activeLink === "Settings" ? "active-link" : ""
            } link-body-emphasis mb-4`}
            onClick={() => handleLinkClick("Settings")}
          >
            <i
              className="bi bi-gear"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            Settings
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
