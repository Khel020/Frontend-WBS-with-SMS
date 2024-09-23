import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
const Sidebar = ({ role }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkStyle = (path) => ({
    color: activeLink === path ? "#343a40" : "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "10px",
    backgroundColor: activeLink === path ? "#e9ecef" : "transparent",
    marginBottom: "10px",
    fontWeight: "500",
  });

  const iconStyle = (path) => ({
    fontSize: "20px",
    marginRight: "10px",
    color: activeLink === path ? "#343a40" : "white",
  });

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#1F316F",
      }}
    >
      <Link
        to=""
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <h5 className="text-center mx-auto" style={{ color: "white" }}>
          Water Billing System
        </h5>
      </Link>
      <hr style={{ borderColor: "white" }} />
      <ul className="nav nav-pills flex-column mb-auto">
        {role === "billmngr" && (
          <>
            <li className="nav-item">
              <Link
                to="/bill-dashboard"
                style={linkStyle("/bill-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-speedometer2"
                  style={iconStyle("/bill-dashboard")}
                ></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/listclient"
                style={linkStyle("/listclient")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-lines-fill"
                  style={iconStyle("/listclient")}
                ></i>
                Consumers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/bills"
                style={linkStyle("/bills")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={iconStyle("/bills")}
                ></i>
                Billing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/disconnection"
                style={linkStyle("/disconnection")}
                className="nav-link"
              >
                <i
                  className="bi bi-slash-circle"
                  style={iconStyle("/disconnection")}
                ></i>
                Disconnection
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="reportsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={linkStyle("/generateReports")}
              >
                <i
                  className="bi bi-bar-chart"
                  style={iconStyle("/generateReports")}
                ></i>
                Reports
              </Link>
              <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                <li>
                  <Link to="/balances" className="dropdown-item">
                    Outstanding Balance
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}
        {role === "admin" && (
          <>
            <li className="nav-item">
              <Link
                to="/admin-dashboard"
                style={linkStyle("/admin-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-house-fill"
                  style={iconStyle("/admin-dashboard")}
                ></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/userlist"
                style={linkStyle("/userlist")}
                className="nav-link"
              >
                <i
                  className="bi bi-people-fill"
                  style={iconStyle("/userlist")}
                ></i>
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/customers"
                style={linkStyle("/customers")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-circle"
                  style={iconStyle("/customers")}
                ></i>
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <>
                <li className="nav-item dropdown">
                  <Link
                    to="/reports"
                    style={linkStyle("/reports")}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="bi bi-file-earmark-bar-graph"
                      style={iconStyle("/reports")}
                    ></i>
                    Reports
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to="/bill-summary" className="dropdown-item">
                        Bill Summary
                      </Link>
                    </li>
                    <li>
                      <Link to="/cus_reports" className="dropdown-item">
                        Customer Reports
                      </Link>
                    </li>
                    <li>
                      <Link to="/collections" className="dropdown-item">
                        Summary of Collection
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* Other navigation links */}
              </>
              {/* Other navigation links */}
            </li>
            <li className="nav-item">
              <Link to="/logs" style={linkStyle("/logs")} className="nav-link">
                <i
                  className="bi bi-journal-text"
                  style={iconStyle("/logs")}
                ></i>
                Logs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/settings"
                style={linkStyle("/settings")}
                className="nav-link"
              >
                <i
                  className="bi bi-gear-fill"
                  style={iconStyle("/settings")}
                ></i>
                Settings
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
