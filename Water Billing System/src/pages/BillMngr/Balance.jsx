import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import DataTable, { defaultThemes } from "react-data-table-component";
import * as XLSX from "xlsx";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button
const DTransacReport = () => {
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${backend}/biller/withBalance`);
        const data = await response.json();
        setRecords(data.withBalance || []);
        setFilteredRecords(data.withBalance || []);
      } catch (error) {
        console.error("Error fetching outstanding balance records:", error);
      }
    };

    fetchRecords();
  }, [backend]);

  // Add this useEffect to filter records based on selected option and search term
  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchesCategory =
        selectedOption === "" ||
        (selectedOption.startsWith("Commercial")
          ? record.client_type === "Commercial" &&
            record.sub_category === selectedOption
          : record.client_type === selectedOption);
      const matchesSearch =
        record.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.acc_num.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    console.log("Filtered Records:", filtered);
    setFilteredRecords(filtered);
  }, [selectedOption, searchTerm, records]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const exportToExcel = () => {
    // Format the records for Excel export
    const formattedRecords = filteredRecords.map((record) => ({
      "Account Number": record.acc_num, // Account number
      "Account Name": record.accountName, // Name of the account holder
      "Contact Number": record.contact, // Contact information
      Group: record.client_type, // Client type (Residential, Government, etc.)
      "Last Bill Date": formatDate(record.last_billDate), // Most recent bill date
      "Total Balance": record.totalBalance, // Total balance amount
      Status: record.status, // Current status
    }));

    // Create a worksheet from the formatted records
    const worksheet = XLSX.utils.json_to_sheet(formattedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Outstanding Balances");

    // Generate file name
    const fileName = `Outstanding_Balances_Report.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "220px",
    },
    {
      name: "Acct No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      width: "130px",
    },
    {
      name: "Group",
      selector: (row) => row.client_type,
      sortable: true,
      width: "130px",
    },
    {
      name: "Last Bill Date",
      selector: (row) => formatDate(row.last_billDate),
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Balance",
      selector: (row) =>
        row.totalBalance ? `₱${row.totalBalance.toFixed(2)}` : "₱0.00",
      sortable: true,
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
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

  const renderOptions = () => {
    if (selectedOption.startsWith("Commercial")) {
      return (
        <>
          <option value="Commercial A">Commercial A</option>
          <option value="Commercial B">Commercial B</option>
          <option value="Commercial C">Commercial C</option>
        </>
      );
    }
    return (
      <>
        <option value="Residential">Residential</option>
        <option value="Government">Government</option>
        <option value="Commercial">Commercial</option>
        <option value="Industrial">Industrial</option>
      </>
    );
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Consumers with Outstanding Balances</h1>
          <button
            onClick={exportToExcel}
            className="btn btn-success d-flex align-items-center"
          >
            <FaFileExport className="me-2" /> Export Excel
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-9 d-flex align-items-center">
            <div className="me-2">
              <select
                className="form-select"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Filter by Category</option>
                {renderOptions()}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search consumer"
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredRecords}
          fixedHeader
          responsive
          pagination
          customStyles={customStyles}
        />
      </main>
    </div>
  );
};

export default DTransacReport;
