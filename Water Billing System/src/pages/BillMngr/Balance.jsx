import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import DataTable, { defaultThemes } from "react-data-table-component";
const DTransacReport = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const columns = [
    {
      name: "Transac Date",
      sortable: true,
      width: "120px",
    },
    {
      name: "ID",
      sortable: true,
      width: "160px",
    },
    {
      name: "Account Name",

      sortable: true,
      width: "220px",
    },
    {
      name: "Acct No.",

      sortable: true,
      width: "150px",
    },
    {
      name: "Amount Paid",

      sortable: true,
      width: "190px",
    },
    {
      name: "Balance",

      sortable: true,
      width: "130px",
    },
    {
      name: "Status",

      sortable: true,
      width: "130px",
    },
    {
      name: "Remarks",

      sortable: true,
      width: "130px",
    },
  ];
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
  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Record of Outstanding Balances</h1>
        </div>
        <div className="row mb-3">
          <div className="col-9 d-flex align-items-center">
            <div className="d-flex align-items-center me-2">
              <label>Date Range:</label>
              <div className="d-flex align-items-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="date-input me-1"
                />
                <span className="mx-2">–</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="End Date"
                  className="date-input"
                />
              </div>
            </div>
            <div className="me-2">
              <select className="form-select">
                <option value="">Filter by Status</option>
                <option value="1">Unpaid</option>
                <option value="2">Paid</option>
                <option value="3">Overdue</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search consumer"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button className="btn btn-primary">
              <i className="bi bi-file-earmark-arrow-down-fill mx-1"></i>
              Export to Excel
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredRecords} // Use filteredRecords here
          fixedHeader
          pagination
          customStyles={customStyles}
        />
      </main>
    </div>
  );
};

export default DTransacReport;
