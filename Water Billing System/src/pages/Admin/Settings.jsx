import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if needed
import Sidebar from "../../components/sidebar.jsx";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"; // Import Form from react-bootstrap
import { ProgressBar, Alert } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";

const tableStyle = {
  fontSize: "0.9rem",
};

function Table() {
  const backend = import.meta.env.VITE_BACKEND;
  const [activeTab, setActiveTab] = useState("Account"); // Default tab
  const [rates, setRates] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    size: "",
    minimumCharge: "",
    commodityRates: [],
  });
  const [uploadData, setUploadData] = useState(null); // State to hold the uploaded file
  const [show, setShow] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null); // State to hold the rate being edited

  const [progress, setProgress] = useState(0); // For tracking progress
  const [logs, setLogs] = useState([]); // For tracking log messages
  const [errors, setErrors] = useState([]); // To store validation errors

  const navigate = useNavigate(); // Initialize navigate

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const token = localStorage.getItem("type");
  const usertype = token;

  const handleClose = () => setShow(false);

  const handleEditModal = (rate) => {
    setSelectedRate(rate); // Set the selected rate for editing
    setFormData({
      id: rate._id || 0,
      category: rate.category || "",
      size: rate.size || "",
      minimumCharge: rate.minimumCharge || "",
      commodityRates: rate.commodityRates || [],
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRateChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedRates = [...prevData.commodityRates];
      updatedRates[index][name] = value;
      return { ...prevData, commodityRates: updatedRates };
    });
  };

  const handleSubmit = async (e) => {
    console.log("SELECTED RATE", selectedRate._id);
    e.preventDefault();

    try {
      const id = selectedRate._id;
      await fetch(`${backend}/admin/updateRate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify(formData),
      });

      setShow(false);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadData) {
      setErrors(["No file selected"]); // Add a specific error
      return;
    }
    setProgress(30);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        if (!Array.isArray(jsonData)) {
          throw new Error("Uploaded data must be an array.");
        }
        setProgress(40);
        const response = await fetch(`${backend}/admin/uploadBills`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
          body: JSON.stringify(jsonData),
        });

        setProgress(50);

        if (response.ok) {
          const data = await response.json();
          setProgress(100);
          console.log("Bills uploaded successfully:", data);
        } else {
          // Handle response errors
          const errorResponse = await response.json(); // Assuming backend returns errors as JSON
          setErrors(
            errorResponse.errors || ["An error occurred while uploading."]
          );
          console.error("Error uploading bills:", errorResponse);
        }
      } catch (error) {
        setErrors([error.message]);
        console.error("Error parsing or uploading the bills:", error.message);
      }
    };

    reader.onerror = (error) => {
      setErrors(["File reading error: " + error.message]);
      console.error("File reading error:", error);
    };

    reader.readAsText(uploadData);
  };

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await fetch(`${backend}/admin/rates`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });
        const data = await response.json();
        setRates(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getRates();
  }, [backend]);

  const renderContent = () => {
    switch (activeTab) {
      case "Account":
        return <div></div>;

      case "Messages":
        return (
          <div>
            <h2>Messages</h2>
            <p>View and manage your messages here.</p>
          </div>
        );
      case "Rates":
        return (
          <div>
            <h2>Rates</h2>
            <p>View and manage your Rates here.</p>
            <div className="table-responsive">
              <table
                className="table table-striped table-bordered"
                style={tableStyle}
              >
                <thead>
                  <tr>
                    <th>CLASSIFICATION</th>
                    <th>SIZE</th>
                    <th>MINIMUM CHARGE</th>
                    <th>COMMODITY CHARGES 11-20</th>
                    <th>COMMODITY CHARGES 21-30</th>
                    <th>COMMODITY CHARGES OVER 30</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((rate, id) => (
                    <tr key={id}>
                      <td>{rate.category}</td>
                      <td>{rate.size}</td>
                      <td>{rate.minimumCharge}</td>
                      {rate.commodityRates.map((range, index) => (
                        <td key={index}>{range.rate}</td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditModal(rate)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Upload Bill":
        return (
          <div className="upload-bill-container p-5 shadow rounded">
            <h2 className="upload-bill-title text-primary mb-4">
              <FaFileUpload className="me-2" style={{ fontSize: "40px" }} />
              Upload Your Bill
            </h2>
            <p className="upload-bill-description text-muted mb-4">
              Please select a file to upload your bill. Accepted formats are{" "}
              <strong>JSON</strong> and <strong>CSV</strong>.
            </p>

            {/* File Input */}
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label className="fw-bold">Select Bill File</Form.Label>
              <Form.Control
                type="file"
                accept=".json, .csv"
                onChange={(e) => setUploadData(e.target.files[0])}
                required
                className="file-input p-2 border-primary"
              />
            </Form.Group>

            {/* Upload Button */}
            <Button
              type="button"
              onClick={handleUploadSubmit}
              className="btn btn-primary mt-3 upload-btn w-100 d-flex justify-content-center align-items-center"
            >
              Upload Bill
            </Button>

            {/* Progress Bar */}
            {progress > 0 && (
              <ProgressBar
                animated
                now={progress}
                label={`${progress}%`}
                className="mt-3"
              />
            )}
            {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar role={usertype} />

      {/* Mini Sidebar */}
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
        <div className="row">
          <div className="col-2">
            <div
              className="mini-sidebar"
              style={{
                padding: "10px",
                height: "85vh",
                borderRight: "1px solid #dee2e6",
              }}
            >
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "Account" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Account")}
                    href="#"
                  >
                    Account
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "Messages" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Messages")}
                    href="#"
                  >
                    Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "Rates" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Rates")}
                    href="#"
                  >
                    Rates
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "Upload Bill" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Upload Bill")}
                    href="#"
                  >
                    Upload Bill
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "Upload Bill" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Upload Bill")}
                    href="#"
                  >
                    Database managment
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-10 text-start">
            <div>{renderContent()}</div>
          </div>
        </div>

        {/* Content Area */}
      </main>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {formData.category} Rates</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMinimumCharge">
              <Form.Label>Minimum Charge</Form.Label>
              <Form.Control
                type="number"
                name="minimumCharge"
                value={formData.minimumCharge}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {formData.commodityRates.map((rate, index) => (
              <div key={index}>
                <Form.Group controlId={`formCommodityRate-${index}`}>
                  <Form.Label>
                    Commodity Rate {rate.rangeStart + "-" + rate.rangeEnd}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    value={rate.rate || ""}
                    onChange={(e) => handleRateChange(e, index)}
                    required
                  />
                </Form.Group>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Table;
