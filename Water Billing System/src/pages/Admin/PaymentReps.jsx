import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar.jsx";

function Rtable() {
  const token = localStorage.getItem("type");
  const usertype = token;
  const columns = [
    {
      name: "Payment ID",
      selector: (row) => row.Identifier,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.Number,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.Customer,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.PaymentDate,
      sortable: true,
    },
    {
      name: "Payment Amount",
      selector: (row) => row.PaymentAmount,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.PaymentMethod,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.PaymentStatus,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      Identifier: "1",
      Number: "002-873-837",
      Customer: "Errol Christian Aurelio",
      PaymentDate: "06-21-24",
      PaymentAmount: 1250,
      PaymentMethod: "Cash",
      PaymentStatus: "Paid",
    },
    // Add more records as needed
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const filteredData = data.filter((row) => {
      return (
        row.Identifier.toLowerCase().includes(value) ||
        row.Number.toLowerCase().includes(value) ||
        row.Customer.toLowerCase().includes(value) ||
        row.PaymentDate.toLowerCase().includes(value) ||
        row.PaymentAmount.toString().includes(value) ||
        row.PaymentMethod.toLowerCase().includes(value) ||
        row.PaymentStatus.toLowerCase().includes(value)
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
          <h1 className="h2">Payment Reports</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-3">
            <input
              type="text"
              placeholder="Filter by category"
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
        ;
      </main>
    </div>
  );
}

export default Rtable;
