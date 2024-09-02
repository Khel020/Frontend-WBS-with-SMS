import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import Sidebar from "../../components/Sidebar";

function Rtable() {
  // Define the columns for the DataTable
  const [records, setRecords] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${backend}/admin/customers`);
      if (response) {
        const data = await response.json();
        setRecords(data);
      }
    };
    fetchCustomers();
  }, [backend]);
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const columns = [
    {
      name: "Payment Date",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Payment Amount",
      selector: (row) => row.client_type,
      sortable: true,
      width: "180ox", // Adjust width as needed
    },
    {
      name: "Bill Number",
      selector: (row) =>
        row.c_address.house_num +
        " Purok " +
        row.c_address.purok +
        " " +
        row.c_address.brgy,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Remaining Balance",
      selector: (row) =>
        row.c_address.house_num +
        " Purok " +
        row.c_address.purok +
        " " +
        row.c_address.brgy,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
  ];

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const filteredData = records.filter((row) => {
      return (
        row.name.toLowerCase().includes(value) ||
        row.water.toString().toLowerCase().includes(value) ||
        row.present.toString().toLowerCase().includes(value) ||
        row.previous.toString().toLowerCase().includes(value) ||
        row.total.toString().toLowerCase().includes(value)
      );
    });
    setRecords(filteredData);
  }

  const customStyles = {
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
          <h1 className="h2">Customer Bills Summary</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-3">
            <input
              type="text"
              placeholder="Filter by name"
              onChange={handleFilter}
              className="form-control d-inline-block w-auto"
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          customStyles={customStyles}
        />
      </main>
    </div>
  );
}

export default Rtable;
