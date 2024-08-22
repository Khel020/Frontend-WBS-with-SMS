import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

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
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchClients();
  }, [backend]);

  const handleAction = (row) => {
    console.log("Action clicked for:", row);
  };

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

      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => {
        row.status;
      },
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
      width: "150px", // Adjust width as needed to accommodate both buttons
    },
  ];

  return (
    <div className="container-fluid">
      <DataTable
        columns={columns}
        data={clients}
        responsive
        fixedHeader
        pagination
        highlightOnHover
        noDataComponent={<div>No data available</div>}
      />
    </div>
  );
};

export default CustomerTbl;
