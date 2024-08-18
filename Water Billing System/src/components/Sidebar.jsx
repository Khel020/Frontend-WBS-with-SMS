import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure this path is correct
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on the current path
    setActiveLink(location.pathname);
  }, [location]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "200px",
        height: "100vh",
        // borderBottomRightRadius: "20px",
        // borderTopRightRadius: "20px",
        backgroundColor: "#51B0DD",
      }}
    >
      <Link
        to=""
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <h5 className="text-center mx-auto">Water Billing System</h5>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {role === "billmngr" && (
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
                to="/admin-dashboard"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/admin-dashboard" ? "active-link" : ""
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
                to="/userlist"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/userlist" ? "active-link" : ""
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
                to="/customers"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/customerProfiles" ? "active-link" : ""
                } link-body-emphasis mb-4`}
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Customers
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
                to="/settings"
                className={`sidebar-nav-link nav-link ${
                  activeLink === "/settings" ? "active-link" : ""
                } link-body-emphasis mb-4`}
              >
                <i
                  className="bi bi-gear-fill"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                Settings
              </Link>
            </li>
          </>
        )}
      </ul>
      <hr />
      <div className="text-start">
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            className="d-flex align-items-center bg-transparent border-0 text-dark"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <span>Admin</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="#/action-1">Archive List</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Bills</Dropdown.Item>
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
