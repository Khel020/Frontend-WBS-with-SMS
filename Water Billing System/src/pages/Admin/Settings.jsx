import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import SetTable from "../../components/Template.jsx";
import { Button } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
const tableStyle = {
  fontSize: "0.9rem",
};

function Table() {
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 me-3">Settings</h1>
          <div className="ms-auto d-flex align-items-center">
            <i
              className="bi bi-bell"
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
            ></i>
            <Dropdown align="end">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="d-flex align-items-center bg-transparent border-0"
                style={{ color: "dark" }}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
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
        <div className="settings-tabs">
          <ul class="nav justify-content-start">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Account
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Messages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Rates
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Table;
