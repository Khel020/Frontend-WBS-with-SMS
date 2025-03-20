import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [collapsed, setCollapsed] = useState(false); // State for collapsing

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarStyle = {
    width: collapsed ? "60px" : "220px",
    transition: "width 0.3s",
    backgroundColor: "#091057",
    position: "sticky",
    top: "0",
    height: "100vh",
    overflowY: "auto",
  };

  const linkStyle = (path) => ({
    color: activeLink === path ? "#343a40" : "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: collapsed ? "5px" : "5px 10px",
    borderRadius: "8px",
    backgroundColor: activeLink === path ? "#e9ecef" : "transparent",
    marginBottom: "10px",
    fontWeight: "500",
    fontSize: "14px",
    justifyContent: collapsed ? "center" : "flex-start",
  });

  const iconStyle = (path) => ({
    fontSize: "20px",
    marginRight: collapsed ? "0" : "10px",
    color: activeLink === path ? "#343a40" : "white",
  });

  const headerStyle = {
    textAlign: "center",
    color: "white",
    fontSize: collapsed ? "10px" : "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3" style={sidebarStyle}>
      <div className="d-flex align-items-center justify-content-between">
        <i
          className={collapsed ? "" : "bi bi-droplet-half mt-3"}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        ></i>
        <h5 style={headerStyle} className="mt-4">
          {!collapsed && "WBS Casiguran"}
        </h5>
        <button
          onClick={toggleSidebar}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            fontSize: "40px",
            cursor: "pointer",
          }}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <i
            className={collapsed ? "bi bi-justify" : "bi bi-filter-right"}
            style={{
              fontSize: "20px",
            }}
          ></i>
        </button>
      </div>

      <hr style={{ borderColor: "white" }} />
      <ul className="nav nav-pills flex-column mb-auto">
        {/* TODO: CASHIER SIDEBAR */}
        {role === "cashier" && (
          <>
            <li className="nav-item">
              <Link
                to="/new-applicant"
                style={linkStyle("/new-applicant")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-badge"
                  style={iconStyle("/new-applicant")}
                ></i>
                {!collapsed && "Applicants"}
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
                {!collapsed && "Consumers"}
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
                {!collapsed && "Billing"}
              </Link>
            </li>
            <hr className="text-white " />
            <span className="text-white">{!collapsed && "Reports"}</span>
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
                {!collapsed && "Daily Collection"}
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
                {!collapsed && "Monthly Collection"}
              </Link>
            </li>
          </>
        )}
        {/* TODO: ADMIN SIDEBAR */}
        {role === "admin" && (
          <>
            <li className="nav-item">
              <Link
                to="/admin-dashboard"
                style={linkStyle("/admin-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-grid"
                  style={iconStyle("/admin-dashboard")}
                ></i>
                {!collapsed && "Dashboard"}
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
                {!collapsed && "User Management"}
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
                {!collapsed && "List of Consumers"}
              </Link>
            </li>
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
                {!collapsed && "Bill Overview"}
              </Link>
            </li>
          </>
        )}
        {/* TODO: IT SIDEBAR */}
        {role === "Information Tech" && (
          <>
            <li className="nav-item">
              <Link
                to="/clientdash"
                style={linkStyle("/clientdash")}
                className="nav-link"
              >
                <i
                  className="bi bi-house-door"
                  style={iconStyle("/clientdash")}
                ></i>
                {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/it-users"
                style={linkStyle("/it-users")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={iconStyle("/it-users")}
                ></i>
                User Management
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/payments"
                style={linkStyle("/payments")}
                className="nav-link"
              >
                <i
                  className="bi bi-credit-card"
                  style={iconStyle("/payments")}
                ></i>
                Audit Logs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/profile"
                style={linkStyle("/profile")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-circle"
                  style={iconStyle("/profile")}
                ></i>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                style={linkStyle("/profile")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-circle"
                  style={iconStyle("/profile")}
                ></i>
                Settings
              </Link>
            </li>
          </>
        )}
        {/* TODO: USERS SIDEBAR */}
        {role === "users" && (
          <>
            <li className="nav-item">
              <Link
                to="/clientdash"
                style={linkStyle("/clientdash")}
                className="nav-link"
              >
                <i
                  className="bi bi-house-door"
                  style={iconStyle("/clientdash")}
                ></i>
                {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/yourbills"
                style={linkStyle("/yourbills")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={iconStyle("/yourbills")}
                ></i>
                View Bills
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/payments"
                style={linkStyle("/payments")}
                className="nav-link"
              >
                <i
                  className="bi bi-credit-card"
                  style={iconStyle("/payments")}
                ></i>
                Payment History
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/profile"
                style={linkStyle("/profile")}
                className="nav-link"
              >
                <i
                  className="bi bi-person-circle"
                  style={iconStyle("/profile")}
                ></i>
                Profile
              </Link>
            </li>
          </>
        )}
        {/* TODO: CS OFFICER SIDEBAR */}
        {role === "CS_Officer" && (
          <>
            <li className="nav-item">
              <Link
                to="/cs-dashboard"
                style={linkStyle("/cs-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-house-door"
                  style={iconStyle("/cs-dashboard")}
                ></i>
                {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/new-applicant"
                style={linkStyle("new-applicant")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={iconStyle("new-applicant")}
                ></i>
                {!collapsed && "Applicants"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cs-consumers"
                style={linkStyle("/cs-consumers")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={iconStyle("/cs-consumers")}
                ></i>
                {!collapsed && "List of Consumers"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/bill-monitoring"
                style={linkStyle("/bill-monitoring")}
                className="nav-link"
              >
                <i
                  className="bi bi-credit-card"
                  style={iconStyle("/bill-monitoring")}
                ></i>
                {!collapsed && "Bill Monitoring"}
              </Link>
            </li>

            <li className="nav-item dropdown" style={{ marginTop: "20px" }}>
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="reportsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={linkStyle("/reports")}
              >
                <i
                  className="bi bi-bar-chart"
                  style={iconStyle("/reports")}
                ></i>
                {!collapsed && "Reports"}
              </a>
              <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                <li>
                  <Link to="/disconnection" className="dropdown-item">
                    List for Disconnection
                  </Link>
                </li>
                <li>
                  <Link to="/balances" className="dropdown-item">
                    Outstanding Balance
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}

        {role === "Uploader" && (
          <>
            <li className="nav-item">
              <Link
                to="/staff-dashboard"
                style={linkStyle("/staff-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-grid"
                  style={iconStyle("/staff-dashboard")}
                ></i>
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
