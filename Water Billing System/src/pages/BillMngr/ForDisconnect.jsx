import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "axios"; // Assuming you'll fetch data using axios
import { Link } from "react-router-dom";
const ForDisconnection = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [startDate, setStartDate] = useState(new Date());
  const [disconnectionAccounts, setDisconnectionAccounts] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[d.getMonth()]; // Get month name
    const day = String(d.getDate()).padStart(2, "0"); // Pad the day to 2 digits
    return `${month} ${day}, ${year}`;
  };

  // Columns for disconnection accounts table
  const columns = [
    {
      name: "Account No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "150px",
    },
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Last Bill Date",
      selector: (row) => formatDate(row.last_billDate),
      sortable: true,
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.disconnection_status,
      sortable: true,
      width: "200px",
    },
    {
      name: "Total Balance",
      selector: (row) => row.totalBalance,
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-outline-success btn-sm ms-2">
            View Details
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd",
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
        minHeight: "45px",
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

  // Fetch disconnection accounts from backend
  useEffect(() => {
    const fetchDisconnectionAccounts = async () => {
      try {
        const response = await fetch(`${backend}/biller/ForDisconnect`);
        const data = await response.json();
        console.log("Response", data);
        setDisconnectionAccounts(data);
      } catch (error) {
        console.error("Error fetching disconnection accounts:", error);
      }
    };

    fetchDisconnectionAccounts();
  }, [backend]);

  const handleExport = () => {
    // Logic for exporting disconnection list to Excel
    console.log("Export to Excel clicked");
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
      <main className="col-md-9 ms-sm-auto col-lg-10 p-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">For Disconnection</h1>
        </div>
        <div className="row mb-3">
          <div className="col-9 d-flex align-items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="form-control"
            />
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleExport}>
              <i className="bi bi-file-earmark-arrow-down-fill mx-1"></i>
              Export to Excel
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={disconnectionAccounts}
          pagination
          striped
          customStyles={customStyles}
        />

        <section className="mb-4">
          <div className="d-flex justify-content-between">
            <div className="chart-container"></div>
            <div className="chart-container"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForDisconnection;
