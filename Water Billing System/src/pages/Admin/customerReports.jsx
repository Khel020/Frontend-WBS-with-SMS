import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar.jsx";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button

function Rtable() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // For month-year selection

  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${backend}/admin/customers`);
      if (response) {
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data);
      }
    };
    fetchCustomers();
  }, [backend]);

  useEffect(() => {
    filterRecords();
  }, [searchTerm, selectedGroup, selectedDate]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const filterRecords = () => {
    let filtered = records;

    // Filter by search term (name)
    if (searchTerm) {
      filtered = filtered.filter((record) =>
        record.accountName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by group
    if (selectedGroup) {
      filtered = filtered.filter(
        (record) => record.client_type === selectedGroup
      );
    }

    // Filter by month and year
    if (selectedDate) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      filtered = filtered.filter((record) => {
        const registrationDate = new Date(record.install_date);
        return (
          registrationDate.getMonth() === selectedMonth &&
          registrationDate.getFullYear() === selectedYear
        );
      });
    }

    setFilteredRecords(filtered);
  };

  const columns = [
    {
      name: "Acc No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "153px",
    },
    {
      name: "Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge  border mx-2  rounded-pill ${
                row.status === "Active"
                  ? "bg-success-subtle border-success-subtle text-success-emphasis "
                  : row.status === "Inactive"
                  ? "bg-danger-subtle border-danger-subtle text-danger-emphasis "
                  : row.status === "Pending"
                  ? "bg-warning-subtle border-warning-subtle text-warning-emphasis "
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
      width: "250px",
    },
    {
      name: "Group",
      selector: (row) => row.client_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Address",
      selector: (row) => row.c_address,
      sortable: true,
      width: "300px",
    },
    {
      name: "Date of Registration",
      selector: (row) => formatDate(row.install_date),
      sortable: true,
      width: "213px",
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredRecords.map((record) => ({
        "Acc No.": record.acc_num,
        Name: record.accountName,
        Group: record.client_type,
        Address: `${record.c_address.house_num} Purok ${record.c_address.purok} ${record.c_address.brgy}`,
        Status: record.status,
        "Date of Registration": formatDate(record.install_date),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Customer_Report.xlsx");
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "#f9f9f9",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">Customer Report</h1>
          <button
            onClick={exportToExcel}
            className="btn btn-success d-flex align-items-center"
          >
            <FaFileExport className="me-2" /> Export PDF
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-3">
            <input
              type="text"
              placeholder="Search consumer"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-2">
            <select
              className="form-select"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">Select Group</option>
              <option value="Residential">Residential</option>
              <option value="Government">Government</option>
              <option value="Industrial">Industrial</option>
              <option value="Bulk">Bulk</option>
              <option value="Commercial">Commercial</option>
              <option value="Commercial_A">Commercial_A</option>
              <option value="Commercial_B">Commercial_B</option>
              <option value="Commercial_C">Commercial_C</option>
            </select>
          </div>
          <div className="col-7 text-end">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              placeholderText="Select Month/Year"
              className="form-control"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredRecords}
          selectableRows
          pagination
          customStyles={customStyles}
        />
      </main>
    </div>
  );
}

export default Rtable;
