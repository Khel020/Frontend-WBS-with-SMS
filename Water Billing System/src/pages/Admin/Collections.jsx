import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button

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
      console.log("Selected Month:", selectedMonth);

      // Start of the selected month (September 1)
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

      console.log("endOfMonth", endOfMonth);
      console.log("startOfMonth", startOfMonth);

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
          console.log("RESPONSE", data);
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
      selector: (row) => formatDate(row.lastPaymentDate),
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
      selector: (row) => row.totalBilled,
      sortable: true,
    },
    {
      name: "Collected",
      selector: (row) => row.totalCollected,
      sortable: true,
    },
    {
      name: "Outstanding",
      selector: (row) => row.outstanding,
      sortable: true,
    },
    {
      name: "Penalties",
      selector: (row) => row.p_charge,
      sortable: true,
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
              showMonthYearPicker // Limit selection to month and year
              placeholderText="Select Month"
              className="form-control"
            />
          </div>
        </div>

        <DataTable
          customStyles={customStyles}
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
