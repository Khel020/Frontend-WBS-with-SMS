import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

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
        backgroundColor: "#091057",
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
                  className="bi bi-house-door"
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
                  className="bi bi-person-badge"
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
            <hr className="text-white " />

            <li className="nav-item">
              <Link
                to="/bill-summary"
                style={linkStyle("/bill-summary")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-bar-graph"
                  style={iconStyle("/bill-summary")}
                ></i>
                Summary of Billing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/collections"
                style={linkStyle("/collections")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-check"
                  style={iconStyle("/collections")}
                ></i>
                Summary of Collection
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/balances"
                style={linkStyle("/balances")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-person"
                  style={iconStyle("/balances")}
                ></i>
                Outstanding Balance
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/disconnection"
                style={linkStyle("/disconnection")}
                className="nav-link"
              >
                <i
                  className="bi bi-exclamation-circle"
                  style={iconStyle("/disconnection")}
                ></i>
                For Disconnection
              </Link>
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

            {/* New Reports Section */}
            <hr className="text-white" />
            <li className="nav-item">
              <Link
                to="/reports"
                style={linkStyle("/reports")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-bar-graph"
                  style={iconStyle("/reports")}
                ></i>
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reports/usage"
                style={linkStyle("/reports/usage")}
                className="nav-link"
              >
                <i
                  className="bi bi-graph-up"
                  style={iconStyle("/reports/usage")}
                ></i>
                Usage Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reports/collection"
                style={linkStyle("/reports/collection")}
                className="nav-link"
              >
                <i
                  className="bi bi-graph-down"
                  style={iconStyle("/reports/collection")}
                ></i>
                Collection Reports
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
