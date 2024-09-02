import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa"; // Import the ellipsis icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
const BillRecords = () => {
  const { accountName } = useParams();
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [bills, setBills] = useState([]);
  const { acc_number } = useParams();
  useEffect(() => {
    const fetchBillByAccNum = async () => {
      const response = await fetch(
        `${backend}/biller/getBillbyAccNum/${acc_number}`
      );
      if (!response.ok) {
        return { err: "Failed No Response" };
      }

      const data = await response.json();
      setBills(data);
    };

    fetchBillByAccNum();
  }, [acc_number]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const columns = [
    {
      name: "Bill No.",
      selector: (row) => row.billNumber,
      sortable: true,
      width: "100px", // Adjust width as needed
    },
    {
      name: "Reading Date",
      selector: (row) => formatDate(row.reading_date),
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Due Date",
      selector: (row) => formatDate(row.due_date),
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Consumption",
      selector: (row) => `${row.consumption} m³`, // Append 'm³' for cubic meters
      // Optional: Add formatting or styling if needed
    },
    {
      name: "Amount",
      selector: (row) => `₱${row.currentBill.toFixed(2)}`, // Format amount with peso sign and two decimal places
      sortable: true,
    },
    {
      name: "Total Due",
      selector: (row) => `₱${row.totalDue.toFixed(2)}`, // Format amount with peso sign and two decimal places
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.payment_status,
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
      width: "100px", // Adjust width as needed
    },
  ];
  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd", // Border around the entire table
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#61b390",
        color: "dark",
        fontSize: "10px",
      },
    },
    rows: {
      style: {
        minHeight: "45px", // override the row height
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      },
    },

    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: defaultThemes.default.text.primary,
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "0px 5px",
        cursor: "pointer",
        transition: "0.4s",
        color: defaultThemes.default.text.primary,
        fill: defaultThemes.default.text.primary,
        backgroundColor: "#fff",
        "&:hover:not(:disabled)": {
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
      },
    },
  };

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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">{accountName} Billing Record</h1>
        </div>
        <div className="row mb-3">
          <div className="col">
            <Link to="/listclient">
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                size="small"
              >
                Back
              </Button>
            </Link>
          </div>
          <div className="col text-end">
            <Link to={`/receive-payments/${acc_number}`}>
              <button className="btn btn-primary">Receive Payments</button>
            </Link>
          </div>
        </div>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={bills}
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
export default BillRecords;
