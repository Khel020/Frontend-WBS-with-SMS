import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";

function Rtable() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${backend}/admin/getAllPayments`);
      const data = await response.json();
      if (response.ok && data.success) {
        setRecords(data.data);
        setFilteredRecords(data.data); // Initially, show all records
      }
    };
    fetchCustomers();
  }, [backend]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    if (month === "") {
      setFilteredRecords(records); // If no month selected, show all records
    } else {
      const filtered = records.filter((record) => {
        const paymentMonth = new Date(record.paymentDate).getMonth() + 1;
        return paymentMonth === parseInt(month);
      });
      setFilteredRecords(filtered);
    }
  };

  const columns = [
    {
      name: "OR_Num",
      selector: (row) => row.OR_NUM,
      sortable: true,
      width: "120px",
    },
    {
      name: "Payment Date",
      selector: (row) => formatDate(row.paymentDate),
      sortable: true,
      width: "160px",
    },
    {
      name: "Name",
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
      name: "Tendered",
      selector: (row) => row.tendered,
      sortable: true,
      width: "190px",
    },
    {
      name: "Bill No.",
      selector: (row) => row.billNo,
      sortable: true,
      width: "130px",
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
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
          <h1 className="h2">Payment Records</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-2">
            <select
              className="form-select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Filter by month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
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
          fixedHeader
          pagination
          customStyles={customStyles}
        />
      </main>
    </div>
  );
}

export default Rtable;
