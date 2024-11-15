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
import { FaUserCheck, FaUserTimes, FaClock } from "react-icons/fa"; // Import icons
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

  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    activeClients: 0,
    inactiveClients: 0,
    pendingClients: 0,
  });
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

        setClientStats(data);
      } else {
        toast.error("Error fetching client statistics.");
      }
    };
    getStatus();
  }, [backend]);
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

        <Row className="mb-3">
          {/* Pending Consumers Card */}
          <div className="col">
            <div
              className="card total-admin"
              style={{
                border: "none",
                backgroundColor: "#DEF0F7",
                borderRadius: "15px",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaClock
                    style={{
                      fontSize: "24px",
                      color: "Orange", // Adjust color as desired
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  />
                  <h5 className="mt-2">Pending</h5>
                </div>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginLeft: "10px",
                  }}
                >
                  {clientStats.pendingClients}
                </span>
              </div>
            </div>
          </div>

          {/* Active Consumers Card */}
          <div className="col">
            <div
              className="card total-admin"
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "#DEF0F7",
                borderRadius: "15px",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaUserCheck
                    style={{
                      fontSize: "24px",
                      color: "#4CAF50",
                      marginRight: "10px",
                    }}
                  />
                  <h5 className="mb-0">Active</h5>
                </div>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginLeft: "10px",
                  }}
                >
                  {clientStats.activeClients}
                </span>
              </div>
            </div>
          </div>

          {/* Inactive Consumers Card */}
          <div className="col">
            <div
              className="card total-admin"
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "#DEF0F7",
                borderRadius: "15px",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaUserTimes
                    style={{
                      fontSize: "24px",
                      color: "#F44336",
                      marginRight: "10px",
                    }}
                  />
                  <h5 className="mb-0">Inactive</h5>
                </div>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginLeft: "10px",
                  }}
                >
                  {clientStats.inactiveClients}
                </span>
              </div>
            </div>
          </div>
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
