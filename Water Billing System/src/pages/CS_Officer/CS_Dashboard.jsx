import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Table, Badge, Button } from "react-bootstrap";
import {
  FaBell,
  FaExclamationTriangle,
  FaUserPlus,
  FaTools,
  FaPaperPlane,
  FaEnvelope,
  FaEnvelopeOpen,
  FaBullhorn,
  FaCheckCircle,
  FaSms,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeClients: 0,
    inactiveClients: 0,
    totalBills: 0,
    unpaidBills: 0,
  });

  const disconnectionList = [
    {
      id: 1,
      accountNo: "2024-001",
      name: "Juan Dela Cruz",
      address: "123 Sample St., Brgy. 1",
      totalDue: 2500,
      monthsOverdue: 3,
      status: "For Disconnection",
      contactNo: "09123456789",
    },
    {
      id: 2,
      accountNo: "2024-015",
      name: "Maria Santos",
      address: "456 Example Ave., Brgy. 2",
      totalDue: 3200,
      monthsOverdue: 4,
      status: "Disconnected",
      contactNo: "09187654321",
    },
    {
      id: 3,
      accountNo: "2024-023",
      name: "Pedro Reyes",
      address: "789 Test Road, Brgy. 3",
      totalDue: 1800,
      monthsOverdue: 3,
      status: "For Disconnection",
      contactNo: "09198765432",
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const billingData = [
    { month: "Jan", collections: 95000, overdue: 15000 },
    { month: "Feb", collections: 98000, overdue: 12000 },
    { month: "Mar", collections: 92000, overdue: 18000 },
  ];

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
      <Sidebar role={localStorage.getItem("type")} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Admin Dashboard</h1>
        </div>
        <div className="container mt-4">
          <div className="row mb-4">
            <div className="col-md-3">
              <Card className="mb-2 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaBell
                      className="me-2"
                      style={{ fontSize: "20px", color: "#28a745" }}
                    />
                    Due Date Reminders
                  </Card.Title>
                  <Card.Text className="h4 text-end text-secondary">
                    <p className="card-text">15 bills due in 3 days</p>
                    <button className="btn btn-light btn-sm d-flex align-items-center mx-auto">
                      <FaPaperPlane className="me-2" /> Send Reminder
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-2 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaExclamationTriangle
                      className="me-2"
                      style={{ fontSize: "20px", color: "#dc3545" }}
                    />
                    Overdue Accounts
                  </Card.Title>
                  <Card.Text className="h4 text-end text-secondary">
                    <p className="card-text">23 overdue accounts</p>
                    <button className="btn btn-light btn-sm d-flex align-items-center mx-auto" >
                      <FaEnvelope className="me-2" /> Send Notice
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-2 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaUserPlus
                      className="me-2"
                      style={{ fontSize: "20px", color: "#007bff" }}
                    />
                    New Customers
                  </Card.Title>
                  <Card.Text className="h4 text-end text-secondary">
                    <p className="card-text">5 new registrations</p>
                    <button className="btn btn-light btn-sm d-flex align-items-center mx-auto">
                      <FaEnvelopeOpen className="me-2" /> Send Welcome
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-2 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaTools
                      className="me-2"
                      style={{ fontSize: "20px", color: "Orange" }}
                    />
                    Maintenance
                  </Card.Title>
                  <Card.Text className="h4 text-end text-secondary">
                    <p className="card-text">Schedule announcements</p>
                    <button className="btn btn-light btn-sm d-flex align-items-center mx-auto">
                      <FaBullhorn className="me-2" /> Send Update
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <FaExclamationTriangle className="text-danger me-2" />
                      Disconnection Management
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        className="d-flex align-items-center"
                      >
                        <FaSms className="me-1" /> Send Bulk SMS
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="d-flex align-items-center"
                      >
                        <FaCheckCircle className="me-1" /> Bulk Reactivate
                      </Button>
                    </div>
                  </Card.Title>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Account No.</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Total Due</th>
                        <th>Months Overdue</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disconnectionList.map((customer) => (
                        <tr key={customer.id}>
                          <td>{customer.accountNo}</td>
                          <td>{customer.name}</td>
                          <td>{customer.address}</td>
                          <td>₱{customer.totalDue.toLocaleString()}</td>
                          <td>{customer.monthsOverdue}</td>
                          <td>
                            <Badge
                              bg={
                                customer.status === "Disconnected"
                                  ? "danger"
                                  : "warning"
                              }
                            >
                              {customer.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleSendSMS(customer)}
                                className="d-flex align-items-center"
                              >
                                <FaSms className="me-1" /> SMS
                              </Button>
                              {customer.status === "Disconnected" && (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => handleReactivate(customer)}
                                  className="d-flex align-items-center"
                                >
                                  <FaCheckCircle className="me-1" /> Reactivate
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
