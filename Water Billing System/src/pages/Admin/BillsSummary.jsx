import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import DatePicker from "react-datepicker";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx"; // Importing XLSX for exporting

function BillsSummary() {
  const [Summary, setSummary] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    const getBills = async () => {
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

        try {
          const response = await fetch(
            `${backend}/admin/billSummary?startDate=${encodeURIComponent(
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
          setSummary(data.summary); // Ensure `data.summary` matches your expected format
        } catch (error) {
          console.error("Error fetching bill summary:", error);
        }
      }
    };

    getBills();
  }, [selectedMonth]);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "150px",
    },
    {
      name: "No. of Bills",
      selector: (row) => row.totalBills,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Consumption",
      selector: (row) => row.totalConsumption,
      sortable: true,
      cell: (row) => `${row.totalConsumption} m³`,
    },
    {
      name: "Total Amount Billed",
      selector: (row) => parseFloat(row.totalBilled).toFixed(2),
      sortable: true,
    },
    {
      name: "Total Amount Paid",
      selector: (row) => row.totalAmountPaid,
      sortable: true,
    },
    {
      name: "Total Penalties",
      selector: (row) => row.totalPenalties,
      sortable: true,
    },
  ];

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

  // Function to handle export to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(Summary);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bill Summary");
    XLSX.writeFile(workbook, "bill_summary.xlsx");
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{ backgroundColor: "white", height: "100vh", maxHeight: "100vh" }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Summary of Bills</h1>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={handleExport} // Add the click handler for exporting
          >
            <FaFileExport className="me-2" /> Export Excel
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-between me-2 mb-3">
          <div className="d-flex align-items-center">
            <label className="mx-2">For the month of:</label>
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
          columns={columns}
          data={Summary}
          fixedHeaderScrollHeight="400px"
          responsive
          customStyles={customStyles}
        />
        {/* BarChart for visualizing total billed vs amount paid per category */}
        <div style={{ width: "100%", height: 200, overflowY: "hidden" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={Summary}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalBilled" fill="#7989C5" name="Total Billed" />
              <Bar
                dataKey="totalAmountPaid"
                fill="#82ca9d"
                name="Total Amount Paid"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default BillsSummary;
