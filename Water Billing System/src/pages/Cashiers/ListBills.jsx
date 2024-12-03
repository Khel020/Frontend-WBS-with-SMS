import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import { toast, ToastContainer } from "react-toastify";
import {
  FaFileInvoiceDollar,
  FaMoneyBillAlt,
  FaFileInvoice,
} from "react-icons/fa";
import Bills from "../../components/BillTable.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function ListBills() {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  const [billStatus, setBillStatus] = useState({
    totalBills: 0,
    unpaidBills: 0,
    paidBills: 0,
  });

  const fetchBillStatus = async () => {
    try {
      const response = await fetch(`${backend}/biller/billStatus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setBillStatus(data);
      } else {
        toast.error("Error fetching bills status.");
      }
    } catch (error) {
      console.error("Error fetching client statistics:", error);
      toast.error("Error fetching client statistics.");
    }
  };
  useEffect(() => {
    fetchBillStatus();
  }, []);
  return (
    <>
      <div
        className="d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">Billing Monitoring</h1>
          </div>
          <div className="row mt-3 mb-4">
            {/* Total Bills Card */}
            <div className="col">
              <div
                className="card total-user"
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#DEF0F7",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaFileInvoiceDollar
                      style={{
                        fontSize: "24px", // Increased size for better visibility
                        color: "#4CAF50", // Adjust color as needed
                        marginRight: "10px",
                      }}
                    />
                    <h5 style={{ margin: 0 }}>Total Bills</h5>
                  </div>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {billStatus.totalBills}
                  </span>
                </div>
              </div>
            </div>

            {/* Unpaid Bills Card */}
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
                    <FaFileInvoice
                      style={{
                        fontSize: "24px", // Slightly larger icon size
                        color: "#F44336", // Red color for unpaid bills
                        marginRight: "10px",
                      }}
                    />
                    <h5 style={{ margin: 0 }}>Unpaid</h5>
                  </div>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {billStatus.unpaidBills}
                  </span>
                </div>
              </div>
            </div>

            {/* Paid Bills Card */}
            <div className="col">
              <div
                className="card total-client"
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#DEF0F7",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaMoneyBillAlt
                      style={{
                        fontSize: "24px", // Icon size for paid bills
                        color: "#4CAF50", // Green color for paid bills
                        marginRight: "10px",
                      }}
                    />
                    <h5 style={{ margin: 0 }}>Paid</h5>
                  </div>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {billStatus.paidBills}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Bills />
        </main>
      </div>
    </>
  );
}

export default ListBills;
