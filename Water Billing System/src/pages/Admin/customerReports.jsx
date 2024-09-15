import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";

function Rtable() {
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
      name: "Acc No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px",
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
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Date of Registration",
      selector: (row) => formatDate(row.install_date),
      sortable: true,
      width: "200px",
    },
  ];

  const customStyles = {
    table: { style: { border: "1px solid #ddd" } },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#61b390",
        color: "dark",
        fontSize: "10px",
      },
    },
    rows: {
      style: { minHeight: "45px", "&:hover": { backgroundColor: "#f1f1f1" } },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
    },
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      records.map((record) => ({
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
      style={{ backgroundColor: "white", height: "100vh", maxHeight: "100vh" }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded ">
          <h1 className="h2">Customer Report</h1>
        </div>
        <div className="row">
          <div className="mb-3 col-6">
            <input
              type="text"
              placeholder="Filter by name"
              className="form-control d-inline-block w-auto"
            />
          </div>
          <div className="mb-3 col-6 text-end">
            <button onClick={exportToExcel} className="btn btn-primary">
              Export to Excel
            </button>
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
