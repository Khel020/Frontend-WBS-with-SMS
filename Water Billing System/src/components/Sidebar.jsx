import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
    height: "100vh",
    backgroundColor: "#091057",
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
          class={collapsed ? "" : "bi bi-droplet-half mt-3"}
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
                to="/bill-dashboard"
                style={linkStyle("/bill-dashboard")}
                className="nav-link"
              >
                <i
                  className="bi bi-grid"
                  style={iconStyle("/bill-dashboard")}
                ></i>
                {!collapsed && "Dashboard"}
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
                {!collapsed && "Summary of Bills"}
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
                {!collapsed && "Summary of Collection"}
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
                {!collapsed && "Outstanding Balance"}
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
                {!collapsed && "For Disconnection"}
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
                to="/settings"
                style={linkStyle("/settings")}
                className="nav-link"
              >
                <i
                  className="bi bi-gear-fill"
                  style={iconStyle("/settings")}
                ></i>
                {!collapsed && "Bills Overview"}
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
                {!collapsed && "Settings"}
              </Link>
            </li>

            <hr className="text-white" />
            <li className="nav-item">
              <Link
                to="/reports/consumer"
                style={linkStyle("/reports/consumer")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-bar-graph"
                  style={iconStyle("/reports/consumer")}
                ></i>
                {!collapsed && "Consumer Reports"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reports/billing"
                style={linkStyle("/reports/billing")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-bar-graph-fill"
                  style={iconStyle("/reports/billing")}
                ></i>
                {!collapsed && "Billing Reports"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reports/payment"
                style={linkStyle("/reports/payment")}
                className="nav-link"
              >
                <i
                  className="bi bi-file-earmark-check"
                  style={iconStyle("/reports/payment")}
                ></i>
                {!collapsed && "Payment Reports"}
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
                List of Consumers
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
                Bill Overview
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
                Complaints & Requests
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
                Complaints & Requests
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
      </ul>
    </div>
  );
};

export default Sidebar;
