import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as XLSX from "xlsx";
import { AiOutlinePoweroff, AiOutlineReload } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button
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
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };

  const columns = [
    {
      name: "Account No.",
      selector: (row) => row.acc_num,
      sortable: true,
    },
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
    },
    {
      name: "Disconnection Date",
      selector: (row) => formatDate(row.dc_date),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.disconnection_status,
      sortable: true,
    },
    {
      name: "Total Balance",
      selector: (row) =>
        row.totalBalance ? `₱${row.totalBalance.toFixed(2)}` : "₱0.00",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => handleDisconnect(row.acc_num)}
          >
            <AiOutlinePoweroff size={20} className="me-1" />
          </button>
          <button
            className="btn btn-outline-success btn-sm ms-2"
            onClick={() => handleReconnect(row.acc_num)}
          >
            <AiOutlineReload size={20} className="me-1" />
          </button>
        </div>
      ),
    },
  ];

  // Expandable row component
  const ExpandedRow = ({ data }) => (
    <div
      className="p-3"
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <div className="row">
        <div className="col-sm-6">
          <p>
            <strong>Address:</strong> {data.c_address}
          </p>
          <p>
            <strong>Contact Number:</strong> {data.contact}
          </p>
          <p>
            <strong>Meter Number:</strong> {data.meter_num}
          </p>
        </div>
        <div className="col-sm-6">
          <p>
            <strong>Installation Date:</strong> {formatDate(data.install_date)}
          </p>
          <p>
            <strong>Activation Date:</strong> {formatDate(data.activation_date)}
          </p>
          <p>
            <strong>Client Type:</strong> {data.client_type}
          </p>
        </div>
      </div>
    </div>
  );

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#1F702C",
        color: "white",
        fontSize: "12px",
      },
    },
    rows: {
      style: {
        minHeight: "45px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    expandableRows: {
      style: {
        backgroundColor: "#f9f9f9", // Background color for the expandable row
      },
    },
    expandableRowsHeader: {
      style: {
        backgroundColor: "#1F702C", // Header background color
        color: "white", // Header text color
        fontWeight: "bold",
        padding: "10px",
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
    // Format the records for Excel export
    const formattedRecords = disconnectionAccounts.map((account) => ({
      "Account No.": account.acc_num,
      "Account Name": account.accountName,
      "Last Bill Date": formatDate(account.last_billDate),
      Status: account.disconnection_status,
      "Total Balance": account.totalBalance
        ? `₱${account.totalBalance.toFixed(2)}`
        : "₱0.00",
    }));

    // Create a worksheet from the formatted records
    const worksheet = XLSX.utils.json_to_sheet(formattedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Disconnection Accounts");

    // Generate file name
    const fileName = `Disconnection_Accounts_Report.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };

  const handleDisconnect = (accNum) => {
    // Implement your disconnect logic here
    console.log("Disconnecting account:", accNum);
  };

  const handleReconnect = (accNum) => {
    // Implement your reconnect logic here
    console.log("Reconnecting account:", accNum);
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">For Disconnection</h1>
          <button
            onClick={handleExport}
            className="btn btn-success d-flex align-items-center"
          >
            <FaFileExport className="me-2" /> Export Excel
          </button>
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
          <div className="col-3 d-flex justify-content-end"></div>
        </div>

        <DataTable
          columns={columns}
          data={disconnectionAccounts}
          pagination
          striped
          expandableRows
          expandableRowsComponent={ExpandedRow} // Set the expandable row component here
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
