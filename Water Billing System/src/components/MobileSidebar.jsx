import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MobileSidebar = ({ role }) => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    display: "block",
  };

  return (
    <div style={{ backgroundColor: "#091057", padding: "10px" }}>
      <h5 style={{ color: "white", textAlign: "center" }}>WBS Casiguran</h5>
      <ul className="nav flex-column">
        {role === "cashier" && (
          <>
            <li className="nav-item">
              <Link to="/bill-dashboard" style={linkStyle}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listclient" style={linkStyle}>
                Consumers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bills" style={linkStyle}>
                Billing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bill-summary" style={linkStyle}>
                Summary of Bills
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/collections" style={linkStyle}>
                Summary of Collection
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/balances" style={linkStyle}>
                Outstanding Balance
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/disconnection" style={linkStyle}>
                For Disconnection
              </Link>
            </li>
          </>
        )}
        {/* Add other roles similarly */}
      </ul>
    </div>
  );
};

export default MobileSidebar;
