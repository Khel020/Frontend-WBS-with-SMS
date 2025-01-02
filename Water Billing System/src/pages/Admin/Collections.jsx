import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/sidebar";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import { FaFileExport } from "react-icons/fa";

function Rtable() {
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // Set default to current month
  });

  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    if (selectedMonth) {
      const startOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        2
      ).toISOString();
      const endOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      ).toISOString();

      const fetchCustomers = async () => {
        try {
          const response = await fetch(
            `${backend}/admin/collectionSummary?startDate=${encodeURIComponent(
              startOfMonth
            )}&endDate=${encodeURIComponent(endOfMonth)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("tkn")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setFilteredRecords(data);
        } catch (error) {
          console.error("Error fetching collection summary:", error);
        }
      };

      fetchCustomers();
    }
  }, [selectedMonth, backend]);
  const columns = [
    {
      name: "Payment Date",
      selector: (row) => formatDate(row.lastPaymentDate || " "),
      sortable: true,
    },
    {
      name: "Acct Name",
      selector: (row) => row.accountName,
      sortable: true,
    },
    {
      name: "Acct No.",
      selector: (row) => row.acc_num,
      sortable: true,
    },
    {
      name: "Bill Amount",
      selector: (row) => parseFloat(row.totalBilled).toFixed(2),
      sortable: true,
      cell: (row) => (
        <span style={{ color: row.totalBilled > 0 ? "green" : "red" }}>
          ₱{parseFloat(row.totalBilled).toFixed(2)}
        </span>
      ),
    },
    {
      name: "Collected",
      selector: (row) => parseFloat(row.totalCollected).toFixed(2),
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color: row.totalCollected >= row.totalBilled ? "blue" : "orange",
          }}
        >
          ₱{parseFloat(row.totalCollected).toFixed(2)}
        </span>
      ),
    },
    {
      name: "Outstanding",
      selector: (row) => parseFloat(row.outstanding).toFixed(2),
      sortable: true,
      cell: (row) => (
        <span style={{ color: row.outstanding > 0 ? "red" : "black" }}>
          ₱{parseFloat(row.outstanding).toFixed(2)}
        </span>
      ),
    },
    {
      name: "Penalties",
      selector: (row) => row.p_charge,
      sortable: true,
      cell: (row) => {
        const penalties = parseFloat(row.p_charge);
        return <span>₱{isNaN(penalties) ? "0.00" : penalties.toFixed(2)}</span>;
      },
    },
  ];

  function formatDate(dateString) {
    // Check if dateString is falsy (null, undefined, empty string)
    if (!dateString) return ""; // Return an empty string if no date is provided

    // Attempt to create a new Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) return ""; // Return an empty string if the date is invalid

    // Format the valid date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

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

  const calculateTotals = () => {
    const totalBilled = filteredRecords.reduce(
      (sum, record) => sum + parseFloat(record.totalBilled || 0),
      0
    );
    const totalCollected = filteredRecords.reduce(
      (sum, record) => sum + parseFloat(record.totalCollected || 0),
      0
    );
    const totalOutstanding = filteredRecords.reduce(
      (sum, record) => sum + parseFloat(record.outstanding || 0),
      0
    );

    return {
      acc_num: <strong className="text-success">Total</strong>, // Make "Total" bold
      totalBilled: totalBilled.toFixed(2),
      totalCollected: totalCollected.toFixed(2),
      outstanding: totalOutstanding.toFixed(2),
      lastPaymentDate: "",
    };
  };

  const dataWithTotals = [...filteredRecords, calculateTotals()];

  const exportToExcel = () => {
    const formattedRecords = filteredRecords.map((record) => ({
      "Account Number": record.acc_num,
      "Account Name": record.accountName,
      "Total Billed": record.totalBilled,
      "Total Collected": record.totalCollected,
      "Outstanding Balance": record.outstanding,
      "Last Payment Date": formatDate(record.lastPaymentDate),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Collection Summary");

    const monthName = selectedMonth.toLocaleString("default", {
      month: "long",
    });
    const year = selectedMonth.getFullYear();
    const fileName = `Collection_Summary_${monthName}_${year}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">Summary of Collection</h1>
          <button
            onClick={exportToExcel}
            className="btn btn-success d-flex align-items-center"
          >
            <FaFileExport className="me-2" /> Export Excel
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-3">
            <input
              type="text"
              placeholder="Search consumer"
              className="form-control"
            />
          </div>
          <div className="col-2">
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              placeholderText="Select Month"
              className="form-control"
            />
          </div>
        </div>

        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={dataWithTotals}
          responsive
          pagination
          conditionalRowClassName={(row) => {
            return row.acc_num === "Total" ? "total-row" : ""; // Apply total-row class for total row
          }}
        />
      </main>
    </div>
  );
}

export default Rtable;
