import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
const tableStyle = {
  fontSize: "0.9rem",
};

function BillTable() {
  const [bills, setBills] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch(`${backend}/biller/getAllBills`, {
        method: "GET",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("tkn")}`,
      });
      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      console.log(data);
      setBills(data);
    };
    fetchBills();
  }, []);

  if (!bills) {
    return <div>Loading...</div>;
  }
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
      name: " Due Date",
      selector: (row) => formatDate(row.due_date),
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Status",
      selector: (row) => row.payment_status,
      sortable: true,
      width: "150x", // Adjust width as needed
    },
    {
      name: "Total Amount",
      selector: (row) => "₱ " + row.totalAmount.toFixed(2),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link
            to={`/customer/${row.acc_num}/${row.accountName}`}
            className="btn btn-success btn-sm me-2"
            onClick={() => handleAction(row)}
          >
            Full Bill
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
    <div className="container-fluid">
      <DataTable
        customStyles={customStyles}
        pagination
        fixedHeaderScrollHeight="520px"
        columns={columns}
        data={bills}
        responsive
        fixedHeader
        highlightOnHover
        noDataComponent={<div>No data available</div>}
      />
    </div>
  );
}

export default BillTable;
