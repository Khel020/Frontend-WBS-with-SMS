import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import DataTable, { defaultThemes } from "react-data-table-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa"; // Import the ellipsis icon
const PaymentHistory = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [payments, setPayments] = useState("");
  const { acc_num } = useParams();
  const { accountName } = useParams();
  const [acc_name, setName] = useState("");
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `${backend}/biller/getPayments/${acc_num}`
        );
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
          setName(data.accountName);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch {}
    };
    fetchPayment();
  }, [acc_num, backend]);
  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "short", // Short month format (e.g., Jan)
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    };

    const formattedDate = new Date(date).toLocaleString("en-US", options); // Use en-US locale for AM/PM formatting
    return formattedDate.replace(",", ""); // Remove comma if present
  };

  const columns = [
    {
      name: "OR No.",
      selector: (row) => row.OR_NUM,
      sortable: true,
      width: "100px",
    },
    {
      name: "Payment Date",
      selector: (row) => formatDateTime(row.paymentDate),
      sortable: true,
      width: "200px",
    },
    {
      name: "Total Due",
      selector: (row) => `₱${row.amountDue.toFixed(2)}`,
      width: "150px",
    },
    {
      name: "Payment Received",
      selector: (row) => `₱${row.tendered.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Notes",
      selector: (row) => row.notes || "N/A", // Default to "N/A" if no notes exist
      sortable: false,
    },
    {
      name: "Change Given",
      selector: (row) => `₱${row.change.toFixed(2)}`,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">Actions</Popover.Header>
                <Popover.Body>
                  <Link
                    to={`/billing-records/${row.acc_num}/${row.accountName}`}
                    className="d-block mb-2"
                  >
                    View Bills
                  </Link>
                  <Link
                    to={`/billing-records/${row.acc_num}/${row.accountName}/adjustments`}
                    className="d-block mb-2"
                  >
                    Adjustments
                  </Link>
                  <Link
                    to={`/billing-records/${row.acc_num}/${row.accountName}/full-bill`}
                    className="d-block mb-2"
                  >
                    View Full Bill
                  </Link>
                  <a
                    href={`/billing-records/${row.acc_num}/${row.accountName}/print-bill`}
                    className="d-block mb-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Print Bill
                  </a>
                </Popover.Body>
              </Popover>
            }
          >
            <button className="btn btn-link p-0">
              <FaEllipsisV size={20} /> {/* Adjust size as needed */}
            </button>
          </OverlayTrigger>
        </div>
      ),
      width: "130px", // Adjusted width
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#1F702C", // Consistent header background
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "transparent", // Inherits background from headRow
        color: "white",
        fontSize: "12px",
        padding: "10px", // Adjust padding for aesthetics
      },
    },
    rows: {
      style: {
        minHeight: "45px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
    },
  };

  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 me-3">Payments of {accountName}</h1>
        </div>
        <Link to={`/billing-records/${acc_num}/${accountName}`}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            size="small"
            className="mb-3"
          >
            Back
          </Button>
        </Link>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={payments}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={
            <div className="text-danger">
              <span>No Record found</span>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default PaymentHistory;
