import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure this path is correct

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on the current path
    setActiveLink(location.pathname);
  }, [location]);

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
        {role === "biller" && (
          <>
            <li>
              <Link
                to="/bill-dashboard"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/bill-dashboard" ? "active-link" : ""
                } link-body-emphasis mb-4`}
              >
                <i
                  className="bi bi-house-fill"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/listclient"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/listclient" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/bills" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/generateReports" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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

        {role === "admin" && (
          <>
            <li>
              <Link
                to="/users"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/users" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/reports" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/logs" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/customerProfiles" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
                  activeLink === "/manageSMS" ? "active-link" : ""
                } link-body-emphasis mb-4`}
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
