import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure this path is correct

const Sidebar = ({ role }) => {
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
        {role === "Billing Manager" && (
          <>
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
                to="/generateReports"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "Generate Reports" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("Generate Reports")}
              >
                <i
                  className="bi bi-bar-chart"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Reports
              </Link>
            </li>
          </>
        )}

        {role === "Admin" && (
          <>
            <li>
              <Link
                to="/users"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "User Management" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("User Management")}
              >
                <i
                  className="bi bi-people-fill"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Manage User
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "Reports" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("Reports")}
              >
                <i
                  className="bi bi-file-earmark-bar-graph"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/logs"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "Logs" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("Logs")}
              >
                <i
                  className="bi bi-journal-text"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Logs
              </Link>
            </li>
            <li>
              <Link
                to="/customerProfiles"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "Customer Profiles" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("Customer Profiles")}
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Clients
              </Link>
            </li>
            <li>
              <Link
                to="/manageSMS"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "Manage SMS" ? "active-link" : ""
                } link-body-emphasis mb-4`}
                onClick={() => handleLinkClick("Manage SMS")}
              >
                <i
                  className="bi bi-envelope-fill"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Manage SMS
              </Link>
            </li>
          </>
        )}
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
