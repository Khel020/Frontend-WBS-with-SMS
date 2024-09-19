import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import DatePicker from "react-datepicker";
function BillsSummary() {
  // Define the columns for the DataTable
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

        console.log("startOfMonth", startOfMonth);
        console.log("endOfMonth", endOfMonth);

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
          console.log("RESPONSE", data);
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
      width: "150px", // Reduced width
    },
    {
      name: "No. of Bills",
      selector: (row) => row.totalBills,
      sortable: true,
      width: "150px", // Reduced width
    },
    {
      name: "Total Consumption",
      selector: (row) => row.totalConsumption,
      sortable: true,
      width: "200px", // Reduced width
      cell: (row) => `${row.totalConsumption} m³`,
    },
    {
      name: "Total Amount Billed ",
      selector: (row) => parseFloat(row.totalBilled).toFixed(2),
      sortable: true,
      width: "200px", // Reduced width
    },
    {
      name: "Total Amount Paid",
      selector: (row) => row.totalAmountPaid,
      sortable: true,
      width: "200px", // Reduced width
    },
    {
      name: "Total Penalties",
      selector: (row) => row.totalPenalties,
      sortable: true,
      width: "200px", // Reduced width
    },
  ];

  const customStyles = {
    tableLayout: "auto", // This makes the table layout more flexible
    overflowX: "auto", // Enable horizontal scrolling
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
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded ">
          <h1 className="h2">Summary of Bills</h1>
        </div>
        <div className="d-flex align-items-center justify-content-between me-2 mb-3">
          {/* Billing Period Section */}
          <div className="d-flex align-items-center">
            <label className="mx-2">Billing Period:</label>
            <div className="d-flex align-items-center">
              <DatePicker
                selected={selectedMonth}
                onChange={(date) => setSelectedMonth(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker // Limit selection to month and year
                placeholderText="Select Month"
                className="date-input"
              />
            </div>
          </div>

          {/* Export Button Section */}
          <div className="d-flex align-items-center">
            <button className="btn btn-primary d-flex align-items-center h-100">
              <i className="bi bi-file-earmark-arrow-down-fill mx-1"></i>
              Export to Excel
            </button>
          </div>
        </div>

        <DataTable columns={columns} data={Summary} responsive pagination />
      </main>
    </div>
  );
}

export default BillsSummary;
