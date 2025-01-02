import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import CustomerTBL from "../../components/CustomerTbl";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaUserCheck, FaUserTimes, FaClock } from "react-icons/fa"; // Import icons
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

          <CustomerTBL />
        </main>
      </div>
    </div>
  );
};

export default ListofConsumers;
