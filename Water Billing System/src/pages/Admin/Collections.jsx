import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Rtable() {
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    if (selectedMonth) {
      // Calculate the start and end of the month
      const startOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1
      ).toISOString();
      const endOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        0
      ).toISOString();

      const fetchCustomers = async () => {
        const response = await fetch(
          `${backend}/admin/collectionSummary?startDate=${encodeURIComponent(
            startOfMonth
          )}&endDate=${encodeURIComponent(endOfMonth)}`
        );
        const data = await response.json();

        if (response.ok) {
          setFilteredRecords(data); // Initially, show all records
        }
      };
      fetchCustomers();
    }
  }, [backend]);

  const columns = [
    {
      name: "Pay Date", // Shortened label
      selector: (row) => row.lastPaymentDate,
      sortable: true,
      width: "120px", // Reduced width for better fit
    },
    {
      name: "Acct Name", // Shortened label
      selector: (row) => row.accountName,
      sortable: true,
      width: "160px", // Reduced width for better fit
    },
    {
      name: "Acct No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "130px", // Same as before
    },
    {
      name: "Total Billed", // Billed amount in pesos
      selector: (row) => row.totalBilled,
      sortable: true,
      width: "140px", // Shortened label and adjusted width
    },
    {
      name: "Collected", // Total collected amount
      selector: (row) => row.Collected,
      sortable: true,
      width: "140px",
    },
    {
      name: "Outstanding", // Remaining balance
      selector: (row) => row.Balances,
      sortable: true,
      width: "140px",
    },
    {
      name: "Penalties", // Penalty charges if any
      selector: (row) => row.penaltyCharge,
      sortable: true,
      width: "130px",
    },
  ];

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

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

  const exportToExcel = () => {
    const formattedRecords = filteredRecords.map((record) => ({
      "OR Number": record.OR_NUM,
      "Payment Date": formatDate(record.paymentDate),
      Name: record.accountName,
      "Account Number": record.acc_num,
      "Payment Amount": record.tendered,
      "Bill Number": record.billNo,
      Balance: record.balance,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Report");

    const fileName = `Payment_Report_${new Date().toLocaleDateString()}.xlsx`;
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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">Summary of Collection</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-2">
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker // Limit selection to month and year
              placeholderText="Select Month"
              className="date-input"
            />
          </div>
          <div className="mb-3 col-5">
            <input
              type="text"
              placeholder="Search consumer"
              className="form-control d-inline-block w-auto"
            />
          </div>
          <div className="mb-3 col-5 text-end">
            <button onClick={exportToExcel} className="btn btn-primary">
              <i className="bi bi-file-earmark-arrow-down-fill mx-1"></i>
              Export to Excel
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredRecords} // Use filteredRecords here
          responsive
          pagination
        />
      </main>
    </div>
  );
}

export default Rtable;
