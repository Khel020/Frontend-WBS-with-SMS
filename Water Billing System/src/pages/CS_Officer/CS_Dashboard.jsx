import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import DataTable from "react-data-table-component";
import { Card, Button, Modal, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaExclamationTriangle,
  FaUserPlus,
  FaTools,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
const Dashboard = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const token = localStorage.getItem("type");
  const usertype = token;
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const messageTemplates = {
    welcome: `Dear ${selectedClient?.acc_name},  

    Welcome to [Casiguran Water District]! We are pleased to have you as our valued customer.  
    If you have any questions or need assistance, feel free to contact us.  

    Thank you for choosing us. We look forward to serving you!  

    - [Casiguran Water District]`,

    reminder: `Dear ${selectedClient?.acc_name},  

    This is a reminder from [Casiguran Water District]. Your water bill is due soon. Please settle your balance promptly to avoid any inconvenience.  

    Thank you.`,

    overdue: `Dear ${selectedClient?.acc_name},  

    This is an important notice from [Casiguran Water District]. Your account is overdue. Kindly make a payment as soon as possible to prevent service interruption.  

    For assistance, please contact our office. Thank you.`,

    maintenance: `Dear ${selectedClient?.acc_name},  

    We would like to inform you that scheduled maintenance will take place in your area. Temporary service interruptions may occur.  

    Thank you for your understanding.  

    - [Casiguran Water District]`,
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await fetch(`${backend}/client/consumerForSMS`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResponse();
  }, []);

  const handleShowModal = (client) => {
    setSelectedClient(client);
    setMessageType("");
    setMessage("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(null);
    setMessageType("");
    setMessage("");
  };
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setMessageType(type);
    setMessage(messageTemplates[type] || "");
  };

  const handleSendSMS = async () => {
    setLoading(true);

    try {
      if (!("serial" in navigator)) {
        toast.error("Web Serial API is not supported in this browser.", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

      // ✅ Get the first available port or request one
      let [port] = await navigator.serial.getPorts();
      if (!port) port = await navigator.serial.requestPort();

      await port.open({ baudRate: 9600 });

      const writer = port.writable.getWriter();
      const encoder = new TextEncoder();

      // ✅ Function to send AT commands with delay
      const sendCommand = async (command, delayTime = 1000) => {
        await writer.write(encoder.encode(command + "\r"));
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      };

      // ✅ Initialize SIM800L (similar to Arduino)
      await sendCommand("AT"); // Check if module is responsive
      await sendCommand("AT+CMGF=1"); // Set SMS text mode
      await sendCommand("AT+CSQ"); // Check signal quality

      // ✅ Send SMS
      await sendCommand(`AT+CMGS="${selectedClient.contact}"`);
      await sendCommand(message, 2000); // Send message body
      await writer.write(encoder.encode(String.fromCharCode(26))); // CTRL+Z to send
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for SMS processing

      toast.success("SMS sent successfully!", { position: "top-right" });

      writer.releaseLock();
      await port.close();
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.acc_name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "Account No.",
      selector: (row) => row.acc_num || "N/A",
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.acc_name || "N/A",
      width: "250px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact || "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.address || "N/A",
      width: "250px",
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge rounded-pill ${
            row.type === "New Consumer"
              ? "bg-primary-subtle text-primary-emphasis"
              : row.type === "Near Overdue"
              ? "bg-warning-subtle text-warning-emphasis"
              : row.type === "Overdue"
              ? "bg-danger-subtle text-danger-emphasis"
              : "bg-secondary-subtle text-secondary-emphasis"
          }`}
        >
          {row.type || "N/A"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-end">
          <Button
            size="sm"
            variant="success"
            onClick={() => handleShowModal(row)}
            className="mx-1"
            title="Send SMS"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {/* Bootstrap Icon */}
            <i className="bi bi-chat-dots me-2"></i> {/* Chat icon */}
            Send SMS
          </Button>
        </div>
      ),
      right: true,
    },
  ];

  const customStyles = {
    table: { style: { borderRadius: "5px" } },
    headCells: { style: { backgroundColor: "#EEF1F8", color: "#333333" } },
    rows: {
      style: { minHeight: "40px", "&:hover": { backgroundColor: "#f1f1f1" } },
    },
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{ backgroundColor: "white" }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer Profile</h1>
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

        <div className="row mt-3 mb-4">
          <div className="col">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>
                  <FaBell className="me-2 text-success" /> Due Date Reminders
                </Card.Title>
                <Card.Text className="text-secondary">
                  15 bills due in 3 days
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>
                  <FaExclamationTriangle className="me-2 text-danger" /> Overdue
                  Accounts
                </Card.Title>
                <Card.Text className="text-secondary">
                  23 overdue accounts
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>
                  <FaUserPlus className="me-2 text-primary" /> New Customers
                </Card.Title>
                <Card.Text className="text-secondary">
                  5 new registrations
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>
                  <FaTools className="me-2 text-warning" /> Maintenance
                </Card.Title>
                <Card.Text className="text-secondary">
                  Schedule announcements
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col text-end">
            <Button variant="success">
              {/* Bootstrap Icon */}
              <i className="bi bi-bell me-2"></i>{" "}
              {/* Bell icon for announcement */}
              Send Announcement
            </Button>
          </div>
        </div>

        <div>
          <DataTable
            columns={columns}
            data={filteredClients}
            highlightOnHover
            responsive
            customStyles={customStyles}
            pagination
            paginationPerPage={20}
            paginationRowsPerPageOptions={[
              20, 40, 60, 80, 100, 120, 140, 160, 170, 180, 200,
            ]}
          />
        </div>
      </main>

      {/* Modal for Sending SMS */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send SMS Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedClient?.acc_name || ""}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={selectedClient?.contact || ""}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message Type</Form.Label>
              <Form.Select value={messageType} onChange={handleTypeChange}>
                <option value="" disabled>
                  Select Message Type
                </option>
                <option value="welcome">Welcome Message</option>
                <option value="reminder">Due Date Reminder</option>
                <option value="overdue">Overdue Notice</option>
                <option value="maintenance">Maintenance Notification</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={handleSendSMS}
            disabled={loading} // Disable kapag naglo-load
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="bi bi-chat-dots me-2"></i> Send SMS
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
