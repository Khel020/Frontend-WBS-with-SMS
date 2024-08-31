import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar.jsx";

function Rtable() {
  // Define the columns for the DataTable
  const token = localStorage.getItem("type");
  const usertype = token;
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.Customer,
      sortable: true,
      width: "200px", // Fixed width for better readability
    },
    {
      name: "Account Number",
      selector: (row) => row.Account,
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
      width: "150px",
    },
    {
      name: "Consumptions",
      selector: (row) => row.Consumptions,
      sortable: true,
      width: "150px",
    },
    {
      name: "Billing Amount (PHP)",
      selector: (row) => row.Billing,
      sortable: true,
      width: "200px",
    },
    {
      name: "Reading Date",
      selector: (row) => row.Reading,
      sortable: true,
      width: "150px",
    },
    {
      name: "Due Date",
      selector: (row) => row.Due,
      sortable: true,
      width: "150px",
    },
  ];

  // Define the data for the table
  const data = [
    {
      id: 1,
      Customer: "Diamond Abihin",
      Account: "000-112-345",
      Category: "Residential",
      Consumptions: "High",
      Billing: "2400",
      Reading: "08-26-24",
      Due: "09-25-24",
    },
    // Add more records as needed
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const filteredData = data.filter((row) => {
      return (
        row.Customer.toLowerCase().includes(value) ||
        row.Account.toLowerCase().includes(value) ||
        row.Category.toLowerCase().includes(value) ||
        row.Consumptions.toLowerCase().includes(value) ||
        row.Billing.toLowerCase().includes(value) ||
        row.Reading.toLowerCase().includes(value) ||
        row.Due.toLowerCase().includes(value)
      );
    });
    setRecords(filteredData);
  }

  const customStyles = {
    headCells: {
      style: {
        background: "linear-gradient(to right, #0f3a3f, #2f6b7a)",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "8px",
      },
    },
    cells: {
      style: {
        padding: "8px",
        wordBreak: "break-word", // Ensure text wraps within cells
      },
    },
  };

  const containerStyle = {
    maxHeight: "400px", // Adjust the height as needed
    overflowY: "auto",
  };

  const printTable = () => {
    window.print();
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
          <h1 className="h2">Consumptions</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-3">
            <input
              type="text"
              placeholder="Filter by customer or category"
              onChange={handleFilter}
              className="form-control d-inline-block w-auto"
            />
          </div>
          <button onClick={printTable} className="btn btn-primary">
            Print
          </button>
        </div>
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          customStyles={customStyles}
          responsive
        />
        ; ;
      </main>
    </div>
  );
}

export default Rtable;
