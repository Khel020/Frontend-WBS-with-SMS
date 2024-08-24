import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";

const CustomerTbl = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("type");
  const backend = import.meta.env.VITE_BACKEND;

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
        setClients(data);
        console.log("data", clients);
      } catch (error) {
        console.error(error.message);
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
      width: "300px", // Adjust width as needed
    },
    {
      name: "Address",
      selector: (row) =>
        `${row.c_address.house_num}, Purok ${row.c_address.purok}, ${row.c_address.brgy}`,
      sortable: true,
      width: "250px", // Adjust width as needed
    },
    {
      name: "Last Bill Date",
      selector: (row) => formatDate(row.last_billDate),
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => (row.totalBalance ? row.totalBalance : 0),
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Action",
      cell: (row) => (
        <Link
          to={`/customer/${row.acc_num}/${row.accountName}`}
          className="btn btn-success btn-sm"
          onClick={() => handleAction(row)}
        >
          View Details
        </Link>
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
        noDataComponent={<div>No data available</div>}
      />
    </div>
  );
};

export default CustomerTbl;
