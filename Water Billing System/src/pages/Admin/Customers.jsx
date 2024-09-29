import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CusTable from "../../components/CustomerTbl";
import {
  Container,
  Button,
  Modal,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaUserCheck, FaUserTimes, FaUserPlus } from "react-icons/fa"; // Import icons
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Dropdown from "react-bootstrap/Dropdown";
const Customers = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [showAcc, setActivation] = useState(false);
  //FIX THIS
  const [forActivation, setforActivation] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (selectedAccount) {
      const updatePending = {
        acc_num: selectedAccount.acc_num,
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
  }, [selectedAccount, backend]); // Dependencies to trigger the effect when values change

  const handleCloseAccModal = () => setActivation(false);
  const handleShowAccs = () => {
    setActivation(true);
    const accountForAct = async () => {
      const response = await fetch(`${backend}/admin/forActivation`);
      if (!response.ok) {
        throw new Error("Error Getting For Activation Accounts");
      }
      const data = await response.json();
      setforActivation(data.result);
    };
    accountForAct();
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
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">Customer List</h1>
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

        <Row>
          {/* Accounts for Activation Card */}
          <Col md={4} className="mb-4">
            <Card className="dash-card pending-card position-relative">
              <Card.Body className="dash-card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <FaUserPlus
                    className="me-2"
                    size={24}
                    style={{ color: "#0d6efd" }} // Blue color for Activation Icon
                  />
                  <span>Accounts for Activation</span>
                </div>
                {/* Badge for accounts */}
                <Badge
                  className="position-absolute top-0 start-100 translate-middle bg-danger"
                  style={{ fontSize: "0.75rem" }}
                  pill
                >
                  99+
                </Badge>
                <Link
                  className="mt-auto mb-0 text-end"
                  onClick={handleShowAccs}
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Active Consumers Card */}
          <Col md={4} className="mb-4">
            <Card className="dash-card active-card">
              <Card.Body className="dash-card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <FaUserCheck
                    className="me-2"
                    size={24}
                    style={{ color: "#28a745" }} // Green color for Active Icon
                  />
                  <span>Active Consumers</span>
                </div>
                <p className="dash-card-value mt-auto mb-0 text-end">500</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Inactive Consumers Card */}
          <Col md={4} className="mb-4">
            <Card className="dash-card inactive-card">
              <Card.Body className="dash-card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <FaUserTimes
                    className="me-2"
                    size={24}
                    style={{ color: "#dc3545" }} // Red color for Inactive Icon
                  />
                  <span>Inactive Consumers</span>
                </div>
                <p className="dash-card-value mt-auto mb-0 text-end">1200</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CusTable />
        <Modal
          show={showAcc}
          onHide={handleCloseAccModal}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Consumer Activation Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Account No.</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Activation in</th>
                </tr>
              </thead>
              <tbody>
                {forActivation && forActivation.length > 0 ? (
                  forActivation.map((accs, index) => (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{accs.acc_num}</td>
                      <td>{accs.accountName}</td>
                      <td>{accs.status}</td>
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
                                <span>
                                  <Button
                                    variant="primary"
                                    onClick={() => setSelectedAccount(accs)}
                                    className="btn-sm"
                                  >
                                    Activate Now
                                  </Button>
                                </span>
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
                    <td colSpan="5" className="text-center">
                      No Record Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
};

export default Customers;
