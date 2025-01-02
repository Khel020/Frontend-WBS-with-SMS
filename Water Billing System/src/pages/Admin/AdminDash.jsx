import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Dropdown from "react-bootstrap/Dropdown";
import Countdown from "react-countdown";
import { Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx"; // Importing XLSX for exporting

import {
  FaUserTimes,
  FaUsers,
  FaUserCheck,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import DataTable, { defaultThemes } from "react-data-table-component";
const AdminDash = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [details, setDetails] = useState({
    accountName: "",
    acc_num: "",
    client_type: "",
  });
  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    activeClients: 0,
    inactiveClients: 0,
    pendingClients: 0,
  });
  const token = localStorage.getItem("type");
  const usertype = token;
  const navigate = useNavigate();
  const [forActivation, setForActivation] = useState([]);

  const [logs, setLogs] = useState([]);
  const handleShow = (acc) => {
    setDetails(acc);
    setShow(true);
  };
  const handleConfirm = (acc) => {
    if (acc) {
      const updatePending = {
        acc_num: acc.acc_num,
        status: "Active",
      };

      fetch(`${backend}/admin/update_pendingStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePending),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Status updated:", data);
          // Show a success toast notification
          toast.success(`Consumer activated successfully!`, {
            autoClose: 1000, // Auto close after 1 second
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          // Show an error toast notification
          toast.error("Failed to activate consumer. Please try again.");
        });
    }
  };
  const [paymentStatusData, setPaymentStatus] = useState([]);

  const [revenueData, setRevenueData] = useState([]);
  //TODO: Dashboard Cards
  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch(`${backend}/biller/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setClientStats(data);
      } else {
        toast.error("Error fetching client statistics.");
      }
    };
    getStatus();
  }, [backend]);

  useEffect(() => {
    const getPaymentStats = async () => {
      const response = await fetch(`${backend}/admin/paymentStatus/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setPaymentStatus(data);
      } else {
        toast.error("Error fetching client statistics.");
      }
    };
    getPaymentStats();
  }, [backend]);
  // Get Monthly Revenue
  useEffect(() => {
    const getRevenue = async () => {
      try {
        const response = await fetch(`${backend}/admin/revenues`);
        if (!response.ok) {
          throw new Error("Error Getting Monthly Revenue");
        }
        const data = await response.json();
        setRevenueData(data); // Update state with fetched data
      } catch (error) {
        console.error(error);
      }
    };

    getRevenue();
  }, []); // Empty dependency array ensures the effect runs only once

  // TODO: For Activation
  useEffect(() => {
    const accountForAct = async () => {
      try {
        const response = await fetch(`${backend}/admin/forActivation`);
        if (!response.ok) {
          throw new Error("Error Getting For Activation Accounts");
        }
        const data = await response.json();
        setForActivation(data.result); // Update state with fetched data
      } catch (error) {
        console.error(error);
      }
    };

    accountForAct();
  }, [backend]);

  // TODO: For Logs
  useEffect(() => {
    const gettingsLogs = async () => {
      try {
        const response = await fetch(`${backend}/admin/logs`);
        const data = await response.json(); // Parse the JSON response

        // Check if the response is successful
        if (data.success) {
          // Using response.ok to check for successful HTTP status
          setLogs(data.data); // Set the logs with the parsed data
        } else {
          console.error(
            "Failed to fetch logs:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    gettingsLogs(); // Call the async function
  }, []); // Dependency array to run the effect once on mount

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  // TODO: Logs Columns
  const columns = [
    {
      name: "Time Stamp",
      selector: (row) => formatCustomDate(row.createdAt),
      sortable: true,
      width: "180px",
    },
    {
      name: "Activity",
      selector: (row) => row.action,
      width: "180px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "140px",
      cell: (row) => (
        <div>
          <button
            style={{
              fontSize: "12px",
              cursor: "pointer",
            }}
            className="btn btn-primary btn-sm "
          >
            View Details
          </button>
        </div>
      ),
    },
  ];
  // TODO: Table Styles
  const customStyles = {
    rows: {
      style: {
        fontSize: "10px", // Standard font size for body text in rows
        "&:hover": { backgroundColor: "#f8f9fa" }, // Subtle hover effect for better UI
      },
    },
    pagination: {
      style: {
        border: "none", // Clean pagination design
        fontSize: "12px", // Comfortable font size for pagination text
        color: "#495057", // Neutral gray for text color
        backgroundColor: "#ffffff", // White background for pagination area
      },
    },
    headCells: {
      style: {
        fontSize: "13px", // Slightly larger font for header cells
        fontWeight: "600", // Medium weight for emphasis
        color: "#212529", // Darker text for better contrast
      },
    },
    cells: {
      style: {
        fontSize: "10px", // Same size as rows for consistency
        color: "#343a40", // Neutral dark gray for data text
      },
    },
  };

  const formatCustomDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Format date
    const formattedDate = new Date(date).toLocaleString("en-US", options);

    // Adjust the output format
    const [datePart, timePart] = formattedDate.split(", ");
    const [month, day, year] = datePart.split("/");
    const [time, period] = timePart.split(" ");

    return `${year}-${month}-${day} ${time} ${period}`;
  };
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div
      className="d-flex"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Admin Dashboard</h1>
          <div className="d-flex align-items-center">
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
            <Dropdown align="end">
              <Dropdown.Toggle
                id="profileDropdown"
                className="d-flex align-items-center bg-transparent border-0"
                style={{ color: "dark" }}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="Profile"
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
        {/* TODO: Dashboard Content CARDS */}
        <div className="row">
          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaUser
                    className="me-2"
                    style={{ fontSize: "20px", color: "#28a745" }} // Green for revenue
                  />
                  Active Consumers
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {clientStats.activeClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaClock
                    className="me-2"
                    style={{ fontSize: "20px", color: "Orange" }} // Green for revenue
                  />
                  Pending Consumers
                </Card.Title>
                <Card.Text className="h4 text-end  text-secondary">
                  {clientStats.pendingClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          {/* Ready for Activation */}
          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaUserTimes
                    className="me-2"
                    style={{ fontSize: "20px", color: "#dc3545" }}
                  />
                  Inactive Consumers
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {clientStats.inactiveClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          {/* Total Consumers */}
          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaUsers
                    className="me-2"
                    style={{ fontSize: "15px", color: "#007bff" }}
                  />
                  Total Consumers
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {clientStats.totalClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* TODO: This is graphs */}
        <div className="row">
          <div className="col-md-6 mb-2">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Monthly Revenue</span>
                  <button
                    onClick={() =>
                      exportToExcel(revenueData, "revenue_report.xlsx")
                    }
                    className="btn btn-sm btn-light d-flex align-items-center"
                    style={{ backgroundColor: "#f8f9fa" }} // Light gray background
                  >
                    <i
                      className="bi bi-download"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Report
                  </button>
                </Card.Title>
                <div
                  style={{
                    height: "200px",
                    fontSize: "13px",
                    overflowX: "auto",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#007bff"
                        fill="#007bff"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Payment Status Card */}
          <div className="col-md-6 mb-2">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Payment Status</span>
                  <button
                    onClick={() =>
                      exportToExcel(
                        paymentStatusData,
                        "payment_status_report.xlsx"
                      )
                    }
                    className="btn btn-light btn-sm d-flex align-items-center"
                  >
                    <i
                      className="bi bi-download"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Report
                  </button>
                </Card.Title>
                <div
                  style={{
                    height: "200px",
                    fontSize: "13px",
                    overflowX: "auto",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={paymentStatusData.TotalPaymentStatus}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="paid"
                        stroke="#28a745"
                        fill="#28a745"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="unpaid"
                        stroke="#dc3545"
                        fill="#dc3545"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        {/* TODO: Tables */}
        <div className="row">
          {/* Account For Activation Section */}
          <div className="col-md-6 ">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Account For Activation</span>
                  <button
                    onClick={() =>
                      exportToExcel(
                        forActivation,
                        "account_for_activation_report.xlsx"
                      )
                    }
                    className="btn btn-light btn-sm d-flex align-items-center"
                  >
                    <i
                      className="bi bi-download"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Report
                  </button>
                </Card.Title>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "auto",
                    height: "170px",
                    maxHeight: "170px", // Increased height for better scrollable view
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">Activation Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forActivation.length > 0 ? (
                        forActivation.map((accs, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{accs.accountName}</td>
                            <td>{formatDate(accs.activation_date)}</td>
                            <td>
                              <Countdown
                                date={new Date(accs.activation_date).getTime()}
                                renderer={({
                                  days,
                                  hours,
                                  minutes,
                                  seconds,
                                  completed,
                                }) => {
                                  if (completed) {
                                    return (
                                      <Button
                                        variant="primary"
                                        onClick={() => handleShow(accs)}
                                        className="btn-sm"
                                      >
                                        Activate Now
                                      </Button>
                                    );
                                  } else {
                                    return (
                                      <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                      </span>
                                    );
                                  }
                                }}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Record Yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Recent Activity Logs Section */}
          <div className="col-md-6 mb-2">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Recent Activity Logs</span>
                  <button
                    onClick={() =>
                      exportToExcel(logs, "recent_activity_logs_report.xlsx")
                    }
                    className="btn btn-light btn-sm d-flex align-items-center"
                  >
                    <i
                      className="bi bi-download"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Report
                  </button>
                </Card.Title>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "auto",
                    height: "170px",
                    maxHeight: "170px", // Increased height for better scrollable view
                  }}
                >
                  <DataTable
                    columns={columns}
                    data={logs}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={customStyles}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Account Activation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are about to activate this consumer account.</p>
            <ul>
              <li>
                <strong>Account Name:</strong>
                {details.accountName}
              </li>
              <li>
                <strong>Account Number:</strong> {details.acc_num}
              </li>
              <li>
                <strong>Account Type:</strong> {details.client_type}
              </li>
            </ul>
            <p className="text-muted">
              Please verify the details before proceeding.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleConfirm(details)}>
              Confirm Activation
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </main>
    </div>
  );
};

export default AdminDash;
