import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import DataTable, { defaultThemes } from "react-data-table-component";
const Logs = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const gettingsLogs = async () => {
      try {
        const response = await fetch(`${backend}/admin/logs`);
        const data = await response.json(); // Parse the JSON response

        // Check if the response is successful
        if (data.success) {
          // Using response.ok to check for successful HTTP status
          setLogs(data.data); // Set the logs with the parsed data
        } else {
          console.error(
            "Failed to fetch logs:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    gettingsLogs(); // Call the async function
  }, []); // Dependency array to run the effect once on mount
  const formatCustomDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Change to true for 12-hour format
    };

    // Format date
    const formattedDate = new Date(date).toLocaleString("en-US", options);

    // Adjust the output format
    const [datePart, timePart] = formattedDate.split(", ");
    const [month, day, year] = datePart.split("/");
    const [time, period] = timePart.split(" ");

    return `${year}-${month}-${day} ${time} ${period}`;
  };
  const columns = [
    {
      name: "Activity",
      selector: (row) => row.action,
      sortable: true,
      width: "200px",
    },
    {
      name: "Time Stamp",
      selector: (row) => formatCustomDate(row.createdAt),
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
      cell: (row) => {
        let roleText = "User"; // Default role
        let badgeClass =
          "bg-secondary-subtle text-secondary-emphasis rounded-pill"; // Default badge class

        if (row.role === "billmngr") {
          roleText = "Biller";
          badgeClass =
            "bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill"; // Biller badge
        } else if (row.role === "admin") {
          roleText = "Admin";
          badgeClass =
            "bg-primary border border-primary text-primary-emphasis rounded-pill"; // Admin badge
        }

        // Return badge with inline styles for size
        return <span className={`badge ${badgeClass}`}>{roleText}</span>; // Render badge
      },
      sortable: true,
      width: "100px",
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      width: "350px",
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
          data={logs}
          responsive
          fixedHeader
          highlightOnHover
        />
      </main>
    </div>
  );
};

export default Logs;
