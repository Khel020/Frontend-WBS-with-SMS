import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MobileSidebar from "../../components/MobileSidebar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [data] = useState([
    { month: "Aug", consumption: 20, amount: 1200 },
    { month: "Sep", consumption: 25, amount: 1500 },
    { month: "Oct", consumption: 18, amount: 1080 },
    { month: "Nov", consumption: 22, amount: 1320 },
    { month: "Dec", consumption: 30, amount: 1800 },
    { month: "Jan", consumption: 28, amount: 1680 },
  ]);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [transactions] = useState([
    {
      id: 1,
      message: "Your bill for February is ready",
      date: "2025-02-01",
      amount: 1680,
      type: "Bill",
    },
    {
      id: 2,
      message: "Payment received - Thank you!",
      date: "2025-01-15",
      amount: 1500,
      type: "Payment",
    },
    {
      id: 3,
      message: "Bill due in 5 days",
      date: "2025-01-31",
      amount: 1680,
      type: "Reminder",
    },
    {
      id: 4,
      message: "Payment for December processed",
      date: "2024-12-15",
      amount: 1800,
      type: "Payment",
    },
    {
      id: 5,
      message: "Adjustment credit applied",
      date: "2024-12-10",
      amount: 200,
      type: "Credit",
    },
    {
      id: 6,
      message: "November bill payment confirmed",
      date: "2024-11-20",
      amount: 1320,
      type: "Payment",
    },
  ]);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <main
        className="flex-grow-1 ms-sm-auto px-md-4 px-3"
        style={{ overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className={isMobile ? "h3 mb-0" : "h2"}>Welcome To CWD Portal</h1>
          <Dropdown align="end">
            <Dropdown.Toggle
              id="profileDropdown"
              className="d-flex align-items-center bg-transparent border-0"
              style={{ color: "dark" }}
            >
              <img
                src="https://github.com/mdo.png"
                alt="Profile"
                width={isMobile ? "28" : "32"}
                height={isMobile ? "28" : "32"}
                className="rounded-circle me-2"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/profile">Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Quick Stats Cards */}
        <Row className="g-3">
          <Col xs={6} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center p-3">
                <i className="bi bi-wallet2 fs-4 text-primary"></i>
                <div className="ms-3">
                  <Card.Text
                    className="text-muted mb-0"
                    style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                  >
                    Current Balance
                  </Card.Text>
                  <Card.Title className={isMobile ? "fs-6 mb-0" : "mb-0"}>
                    ₱2,500.00
                  </Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center p-3">
                <i className="bi bi-droplet fs-4 text-info"></i>
                <div className="ms-3">
                  <Card.Text
                    className="text-muted mb-0"
                    style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                  >
                    Latest Consumption
                  </Card.Text>
                  <Card.Title className={isMobile ? "fs-6 mb-0" : "mb-0"}>
                    28 m³
                  </Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center p-3">
                <i className="bi bi-calendar3 fs-4 text-success"></i>
                <div className="ms-3">
                  <Card.Text
                    className="text-muted mb-0"
                    style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                  >
                    Due Date
                  </Card.Text>
                  <Card.Title className={isMobile ? "fs-6 mb-0" : "mb-0"}>
                    Feb 5, 2025
                  </Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center p-3">
                <i className="bi bi-exclamation-circle fs-4 text-warning"></i>
                <div className="ms-3">
                  <Card.Text
                    className="text-muted mb-0"
                    style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                  >
                    Payment Status
                  </Card.Text>
                  <Card.Title
                    className={`${
                      isMobile ? "fs-6 mb-0" : "mb-0"
                    } text-warning`}
                  >
                    Due Soon
                  </Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Grid */}
        <Row className="g-4 mt-1">
          {/* Consumption Graph */}
          <Col lg={8}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-white py-3">
                <Card.Title className={isMobile ? "fs-5 mb-0" : "mb-0"}>
                  Water Consumption History
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{ height: isMobile ? "250px" : "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{
                        top: 5,
                        right: isMobile ? 10 : 30,
                        left: isMobile ? 0 : 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        fontSize={isMobile ? 10 : 12}
                      />
                      <YAxis
                        stroke="#6b7280"
                        fontSize={isMobile ? 10 : 12}
                        width={isMobile ? 25 : 35}
                      />
                      <Tooltip
                        contentStyle={{
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="consumption"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: isMobile ? 3 : 4, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Transactions Panel */}
          <Col lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                <Card.Title className={isMobile ? "fs-5 mb-0" : "mb-0"}>
                  Transactions
                </Card.Title>
                <i className="bi bi-receipt text-muted"></i>
              </Card.Header>
              <Card.Body className={isMobile ? "p-2" : ""}>
                <div
                  style={{
                    maxHeight: isMobile ? "250px" : "none",
                    overflowY: "auto",
                  }}
                >
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`mb-2 p-${
                        isMobile ? "2" : "3"
                      } bg-light rounded`}
                    >
                      <div
                        className={`d-flex justify-content-between ${
                          isMobile ? "flex-column" : ""
                        }`}
                      >
                        <p
                          className={`mb-${isMobile ? "2" : "1"}`}
                          style={{ fontSize: isMobile ? "0.85rem" : "1rem" }}
                        >
                          {transaction.message}
                        </p>
                        <span
                          className={`badge ${
                            transaction.type === "Payment"
                              ? "bg-success"
                              : transaction.type === "Bill"
                              ? "bg-primary"
                              : transaction.type === "Credit"
                              ? "bg-info"
                              : "bg-warning"
                          } ${isMobile ? "align-self-start mb-1" : ""}`}
                          style={{ fontSize: isMobile ? "0.65rem" : "0.75rem" }}
                        >
                          {transaction.type}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small
                          className="text-muted"
                          style={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
                        >
                          {transaction.date}
                        </small>
                        <small
                          className="fw-bold"
                          style={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
                        >
                          {transaction.type === "Payment" ||
                          transaction.type === "Credit"
                            ? "-"
                            : ""}
                          ₱{transaction.amount.toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Your Bills */}
          <Col lg={12}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                <Card.Title className={isMobile ? "fs-5 mb-0" : "mb-0"}>
                  Your Bills
                </Card.Title>
                <i className="bi bi-file-earmark-text text-muted"></i>
              </Card.Header>
              <Card.Body className={isMobile ? "p-2" : ""}>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className={isMobile ? "fs-6" : ""}>
                          Billing Period
                        </th>
                        <th className={`text-end ${isMobile ? "fs-6" : ""}`}>
                          Amount
                        </th>
                        <th className={`text-end ${isMobile ? "fs-6" : ""}`}>
                          Consumption
                        </th>
                        <th className={`text-end ${isMobile ? "fs-6" : ""}`}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className={isMobile ? "fs-6" : ""}>
                            {item.month} 2024
                          </td>
                          <td className={`text-end ${isMobile ? "fs-6" : ""}`}>
                            ₱{item.amount.toLocaleString()}
                          </td>
                          <td className={`text-end ${isMobile ? "fs-6" : ""}`}>
                            {item.consumption} m³
                          </td>
                          <td
                            className={`text-end ${
                              index === 0 ? "text-warning" : "text-success"
                            } ${isMobile ? "fs-6" : ""}`}
                          >
                            {index === 0 ? "Due Soon" : "Paid"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
