import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Card, Modal, Tab, Tabs, Alert, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEnvelope, FaBullhorn, FaHistory } from "react-icons/fa";
import {
  FaUserTimes,
  FaUsers,
  FaUserCheck,
  FaClock,
  FaUser,
  FaFileInvoiceDollar,
  FaFileInvoice,
} from "react-icons/fa";

const CS_Dashboard = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const usertype = localStorage.getItem("type");
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [stats, setStats] = useState({
    activeClients: 0,
    inactiveClients: 0,
    totalBills: 0,
    unpaidBills: 0,
  });

  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch(`${backend}/biller/getBillStatus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setStats(data);
      } else {
        toast.error("Error fetching client statistics.");
      }
    };
    getStatus();
  }, [backend]);

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
              <Dropdown.Item href="#/archive-list">Archive List</Dropdown.Item>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/bills">Bills</Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaUserCheck
                    className="me-2"
                    style={{ fontSize: "20px", color: "#28a745" }} // Green for active clients
                  />
                  Active Clients
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {stats.activeClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaUserTimes
                    className="me-2"
                    style={{ fontSize: "20px", color: "#dc3545" }} // Red for inactive clients
                  />
                  Inactive Clients
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {stats.inactiveClients}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaFileInvoice
                    className="me-2"
                    style={{ fontSize: "20px", color: "#007bff" }} // Blue for total bills
                  />
                  Total Bills
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {stats.totalBills}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <FaFileInvoiceDollar
                    className="me-2"
                    style={{ fontSize: "20px", color: "Orange" }} // Orange for unpaid bills
                  />
                  Unpaid Bills
                </Card.Title>
                <Card.Text className="h4 text-end text-secondary">
                  {stats.unpaidBills}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="mt-4">
          <Tabs defaultActiveKey="sms" className="mb-3">
            <Tab
              eventKey="sms"
              title={
                <span>
                  <FaEnvelope className="me-2" />
                  SMS Broadcast
                </span>
              }
            >
              <Card className="shadow-sm">
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Recipients</Form.Label>
                      <Form.Select>
                        <option value="all">All Consumers</option>
                        <option value="active">Active Consumers</option>
                        <option value="inactive">Inactive Consumers</option>
                        <option value="pending">Pending Consumers</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Type your SMS message here..."
                        maxLength={160}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">
                        <FaEnvelope className="me-2" />
                        Send SMS
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab
              eventKey="announcement"
              title={
                <span>
                  <FaBullhorn className="me-2" />
                  Announcements
                </span>
              }
            >
              <Card className="shadow-sm">
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter announcement title"
                        className="mb-3"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Announcement Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Type your announcement here..."
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button variant="success" type="submit">
                        <FaBullhorn className="me-2" />
                        Post Announcement
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab
              eventKey="history"
              title={
                <span>
                  <FaHistory className="me-2" />
                  Message History
                </span>
              }
            >
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Recipients</th>
                          <th>Content</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2025-01-03</td>
                          <td>SMS</td>
                          <td>All Consumers</td>
                          <td>Monthly bill reminder...</td>
                          <td>
                            <span className="badge bg-success">Sent</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2025-01-02</td>
                          <td>Announcement</td>
                          <td>Active Consumers</td>
                          <td>System maintenance notice...</td>
                          <td>
                            <span className="badge bg-success">Posted</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CS_Dashboard;
