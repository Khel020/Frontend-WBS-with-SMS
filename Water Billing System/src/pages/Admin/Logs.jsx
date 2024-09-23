import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import DataTable, { defaultThemes } from "react-data-table-component";
const Logs = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  const data = [
    {
      activity: "Login",
      timestamp: "2024-09-22 10:30:00 AM",
      details: "Logged in successfully",
      accountName: "Juan Dela Cruz",
      role: "Admin",
      action: "View",
    },
    {
      activity: "Bill Generation",
      timestamp: "2024-09-22 11:00:00 AM",
      details: "Generated bills for all clients",
      accountName: "Maria Santos",
      role: "Biller Manager",
      action: "View",
    },
    {
      activity: "Disconnection List",
      timestamp: "2024-09-22 01:15:00 PM",
      details: "Added 5 accounts to disconnection list",
      accountName: "Pedro Reyes",
      role: "Admin",
      action: "View",
    },
    {
      activity: "Payment",
      timestamp: "2024-09-22 02:45:00 PM",
      details: "Processed payment for account #12345",
      accountName: "Ana Lopez",
      role: "Biller",
      action: "View",
    },
    {
      activity: "Update Profile",
      timestamp: "2024-09-22 03:30:00 PM",
      details: "Updated account details for Juan Dela Cruz",
      accountName: "Juan Dela Cruz",
      role: "Client",
      action: "View",
    },
  ];

  const columns = [
    {
      name: "Activity",
      selector: (row) => row.activity,
      sortable: true,
      width: "150px",
    },
    {
      name: "Time Stamp",
      selector: (row) => row.timestamp,
      sortable: true,
      width: "200px",
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      width: "200px",
    },
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "150px",
    },
  ];

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
      <main className="col-md-9 ms-sm-auto col-lg-10 p-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Activity Logs</h1>
        </div>

        <DataTable
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={data}
          responsive
          fixedHeader
          highlightOnHover
        />
      </main>
    </div>
  );
};

export default Logs;
