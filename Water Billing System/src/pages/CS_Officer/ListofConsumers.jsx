import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import CustomerTBL from "../../components/CustomerTbl";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaUserCheck, FaUserTimes, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";

const ListofConsumers = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    activeClients: 0,
    inactiveClients: 0,
    pendingClients: 0,
  });
  const [forActivation, setForActivation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching status:", error);
        toast.error("Error fetching client statistics.");
      }
    };
    getStatus();
  }, [backend]);

  useEffect(() => {
    const accountForAct = async () => {
      try {
        const response = await fetch(`${backend}/admin/forActivation`);
        if (!response.ok) {
          throw new Error("Error Getting For Activation Accounts");
        }
        const data = await response.json();
        setForActivation(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    accountForAct();
  }, [backend]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const handleCardClick = (cardType) => {
    if (cardType === "pending") {
      setShowModal(true);
    }
  };

  const handleActivate = (acc) => {
    setSelectedAccount(acc);
    setShowConfirmModal(true);
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
          toast.success(`Consumer activated successfully!`, {
            autoClose: 1000,
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          toast.error("Failed to activate consumer. Please try again.");
        });
    }
    setShowConfirmModal(false);
  };

  return (
    <div>
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
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick("pending")}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaClock
                      style={{
                        fontSize: "24px",
                        color: "Orange",
                        marginRight: "10px",
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

          {/* Modal for Pending Accounts */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Pending Accounts for Activation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  overflowY: "auto",
                  overflowX: "auto",
                  height: "170px",
                  maxHeight: "170px",
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
                      forActivation.map((acc, index) => (
                        <tr key={acc.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{acc.accountName}</td>
                          <td>{formatDate(acc.activation_date)}</td>
                          <td>
                            <Button
                              variant="primary"
                              className="btn-sm"
                              onClick={() => handleActivate(acc)}
                            >
                              Activate Now
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No pending accounts for activation
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          </Modal>

          {/* Confirmation Modal */}
          <Modal
            show={showConfirmModal}
            onHide={() => setShowConfirmModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Activation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to activate this account?
              {selectedAccount && (
                <p className="mt-2 mb-0">
                  <strong>Account Name:</strong> {selectedAccount.accountName}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleConfirm(selectedAccount)}
              >
                Confirm Activation
              </Button>
            </Modal.Footer>
          </Modal>

          <CustomerTBL />
        </main>
      </div>
    </div>
  );
};

export default ListofConsumers;
