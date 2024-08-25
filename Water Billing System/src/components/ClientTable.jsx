import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable, { defaultThemes } from "react-data-table-component";
import "../styles/clientTBL.css";

const Table = () => {
  //State for storing data
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //TODO: GET ALL Consumers
  const backend = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(`${backend}/client/clients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      setClients(data);
    };
    fetchClients();
  }, []);
  if (!clients) {
    return <div>Loading...</div>;
  }
  const columns = [
    {
      name: "Acc No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "130px", // Adjust width as needed
    },
    {
      name: "Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge  border mx-2  rounded-pill ${
                row.status === "Active"
                  ? "bg-success-subtle border-success-subtle text-success-emphasis "
                  : row.status === "Inactive"
                  ? "bg-danger-subtle border-danger-subtle text-danger-emphasis "
                  : "bg-secondary"
              }`}
            >
              {row.status}
            </span>
          )}
          <span>{row.accountName}</span>
        </div>
      ),
      sortable: true,
      width: "250px", // Adjust width as needed
    },

    {
      name: "Type",
      selector: (row) => row.client_type,
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Address",
      selector: (row) =>
        row.c_address.house_num +
        ", Purok " +
        row.c_address.purok +
        ", " +
        row.c_address.brgy,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => (row.totalBalance ? row.totalBalance : "0.00"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/billing-records/${row.acc_num}/${row.accountName}`}>
            <a className="btn btn-info btn-sm">
              <span>View Bills</span>
            </a>
          </Link>
        </div>
      ),

      sortable: true,
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
    <div>
      <div className="container-fluid">
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={clients}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No data available</div>}
        />
      </div>
    </div>
  );
};

export default Table;
