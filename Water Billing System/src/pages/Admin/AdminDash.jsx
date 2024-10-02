import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

const AdminDash = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  const navigate = useNavigate();

  // State to manage file upload
  const [file, setFile] = useState(null);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("YOUR_UPLOAD_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        // Reset the file input
        setFile(null);
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="d-flex align-items-center">
            {/* Notification Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                id="notificationDropdown"
                className="d-flex align-items-center bg-transparent border-0"
                style={{ color: "dark" }}
              >
                <i
                  className="bi bi-bell"
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#000",
                  }}
                ></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/notification-1">
                  You have new notifications!
                </Dropdown.Item>
                <Dropdown.Item href="#/notification-2">
                  Another notification here.
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Profile Dropdown */}
            <Dropdown align="end" className="ms-2">
              <Dropdown.Toggle
                id="profileDropdown"
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
                <Dropdown.Item href="#/archive-list">
                  Archive List
                </Dropdown.Item>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#/bills">Bills</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mt-4">
          <h2>Upload Bills</h2>
          <input
            type="file"
            accept=".txt, .csv, .xlsx, .xls" // Specify accepted file types
            onChange={handleFileChange}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;
