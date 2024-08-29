import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const CustomerTbl = () => {
  const [clients, setClients] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${backend}/admin/customers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid Credentials");
        }
        const data = await response.json();
        setClients(data || []); // Set clients to empty array if data is null or undefined
        console.log("Fetched data:", data); // Debugging log
      } catch (error) {
        console.error(error.message);
        setClients([]); // Ensure clients is set to empty array on error
      }
    };
    fetchClients();
  }, [backend]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const columns = [
    {
      name: "Full Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge border mx-2 rounded-pill ${
                row.status === "Active"
                  ? "bg-success-subtle border-success-subtle text-success-emphasis"
                  : row.status === "Inactive"
                  ? "bg-danger-subtle border-danger-subtle text-danger-emphasis"
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
      width: "300px", // Adjust width as needed
    },
    {
      name: "Address",
      selector: (row) => {
        const address = row.c_address || {};
        return `${address.house_num || "N/A"}, Purok ${
          address.purok || "N/A"
        }, ${address.brgy || "N/A"}`;
      },
      sortable: true,
      width: "250px", // Adjust width as needed
    },
    {
      name: "Last Bill Date",
      selector: (row) =>
        row.last_billDate ? formatDate(row.last_billDate) : "For Activation",
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => row.totalBalance || 0,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* View Details Button */}
          <Button
            variant="success"
            size="sm"
            as={Link}
            to={`/customer/${row.acc_num}/${row.accountName}`}
            className="mx-1"
          >
            View Details
          </Button>
        </div>
      ),
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
        noDataComponent={<div>No records found</div>}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerTbl;
