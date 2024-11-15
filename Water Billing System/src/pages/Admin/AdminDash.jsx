import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import Countdown from "react-countdown";
import { Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  const [revenueData, setRevenueData] = useState([
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2500 },
    { month: "Apr", revenue: 3500 },
    { month: "May", revenue: 4000 },
    { month: "Jun", revenue: 4500 },
    { month: "Jul", revenue: 5000 },
    { month: "Aug", revenue: 5500 },
    { month: "Sep", revenue: 5500 },
    { month: "Oct", revenue: 5500 },
    { month: "Nov", revenue: 5500 },
    { month: "Dec", revenue: 5500 },
  ]);

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
  const columns = [
    {
      name: "Activity",
      selector: (row) => row.action,
      sortable: true,
      width: "200px",
    },
    {
      name: "Time Stamp",
      selector: (row) => formatCustomDate(row.createdAt),
      sortable: true,
      width: "200px",
    },
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Role",
      cell: (row) => {
        let roleText = "User"; // Default role
        let badgeClass =
          "bg-secondary-subtle text-secondary-emphasis rounded-pill"; // Default badge class

        if (row.role === "billmngr") {
          roleText = "Biller";
          badgeClass =
            "bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill"; // Biller badge
        } else if (row.role === "admin") {
          roleText = "Admin";
          badgeClass =
            "bg-primary border border-primary text-primary-emphasis rounded-pill"; // Admin badge
        }

        // Return badge with inline styles for size
        return <span className={`badge ${badgeClass}`}>{roleText}</span>; // Render badge
      },
      sortable: true,
      width: "100px",
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      width: "350px",
    },
  ];
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
          <h1 className="h2">Dashboard</h1>
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
            <Dropdown align="end" className="ms-2">
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

        {/* Dashboard Content */}
        <div className="row">
          <div className="col-md-4">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <Card.Text className="h4">{`₱${revenueData
                  .reduce((acc, item) => acc + item.revenue, 0)
                  .toLocaleString()}`}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>Total Consumers</Card.Title>
                <Card.Text className="h4">{forActivation.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>Ready for Activation</Card.Title>
                <Card.Text className="h4">
                  {
                    forActivation.filter((acc) => acc.status === "Pending")
                      .length
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Revenue Chart Column */}
        <div className="row">
          {/* Revenue Chart Column */}
          <div className="col-md-6 mb-2">
            <Card>
              <Card.Body>
                <Card.Title>Revenue Over Time</Card.Title>
                <div style={{ height: "200px" }}>
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

          {/* Logs Table Column */}
          <div className="col-md-6 mb-2">
            <Card>
              <Card.Body>
                <Card.Title>Activity Logs</Card.Title>
                <DataTable
                  columns={columns}
                  data={logs}
                  pagination
                  highlightOnHover
                  responsive
                  striped
                />
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Account For Activation</Card.Title>
                <div
                  style={{
                    overflowY: "auto",
                    height: "180px",
                    maxHeight: "180px", // Increased height for better scrollable view
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">Activation in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forActivation.length > 0 ? (
                        forActivation.map((accs, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{accs.accountName}</td>
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
