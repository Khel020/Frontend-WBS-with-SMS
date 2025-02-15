import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MobileSidebar from "../../components/MobileSidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClientDash = () => {
  const usertype = localStorage.getItem("type");
  const [data] = useState([
    { month: "Aug", consumption: 20, amount: 1200 },
    { month: "Sep", consumption: 25, amount: 1500 },
    { month: "Oct", consumption: 18, amount: 1080 },
    { month: "Nov", consumption: 22, amount: 1320 },
    { month: "Dec", consumption: 30, amount: 1800 },
    { month: "Jan", consumption: 28, amount: 1680 },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [notifications] = useState([
    { id: 1, message: "Your bill for February is ready", date: "2025-02-01" },
    { id: 2, message: "Payment received - Thank you!", date: "2025-01-15" },
    { id: 3, message: "Bill due in 5 days", date: "2025-01-31" },
  ]);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {isMobile ? (
        <MobileSidebar role={usertype} />
      ) : (
        <Sidebar role={usertype} />
      )}
      <main
        className="flex-grow-1 ms-sm-auto px-md-4"
        style={{ overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Admin Dashboard</h1>
        </div>
        {/* Quick Stats Cards */}
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center">
                <i className="bi bi-wallet2 h-8 w-8 text-primary"></i>
                <div className="ms-3">
                  <Card.Text className="text-muted">Current Balance</Card.Text>
                  <Card.Title>₱2,500.00</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center">
                <i className="bi bi-droplet h-8 w-8 text-info"></i>
                <div className="ms-3">
                  <Card.Text className="text-muted">
                    Latest Consumption
                  </Card.Text>
                  <Card.Title>28 m³</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center">
                <i className="bi bi-calendar3 h-8 w-8 text-success"></i>
                <div className="ms-3">
                  <Card.Text className="text-muted">Due Date</Card.Text>
                  <Card.Title>Feb 5, 2025</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center">
                <i className="bi bi-exclamation-circle h-8 w-8 text-warning"></i>
                <div className="ms-3">
                  <Card.Text className="text-muted">Payment Status</Card.Text>
                  <Card.Title className="text-warning">Due Soon</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Grid */}
        <Row className="gy-4">
          {/* Consumption Graph */}
          <Col lg={8}>
            <Card className="h-100">
              <Card.Header>
                <Card.Title>Water Consumption History</Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="consumption"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Notifications Panel */}
          <Col lg={4}>
            <Card className="h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Recent Notifications</Card.Title>
                <i className="bi bi-bell h-5 w-5 text-muted"></i>
              </Card.Header>
              <Card.Body>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-3 p-3 bg-light rounded"
                  >
                    <p className="mb-1">{notification.message}</p>
                    <small className="text-muted">{notification.date}</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Payment History */}
          <Col lg={8}>
            <Card className="h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Recent Payments</Card.Title>
                <i className="bi bi-clock-history h-5 w-5 text-muted"></i>
              </Card.Header>
              <Card.Body>
                <div className="mb-3 d-flex justify-content-between text-muted">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Consumption</div>
                  <div>Status</div>
                </div>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 d-flex justify-content-between"
                  >
                    <div>{item.month} 2024</div>
                    <div>₱{item.amount.toLocaleString()}</div>
                    <div>{item.consumption} m³</div>
                    <div className="text-success">Paid</div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col lg={4}>
            <Card className="h-100">
              <Card.Header>
                <Card.Title>Quick Actions</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-3">
                  <Button variant="primary">View Latest Bill</Button>
                  <Button variant="success">Make Payment</Button>
                  <Button variant="outline-secondary">
                    Download Statement
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default ClientDash;
