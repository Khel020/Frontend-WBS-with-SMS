import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import DataTable, { defaultThemes } from "react-data-table-component";
const MonthlySummaryReport = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  const [startDate, setStartDate] = useState(new Date());
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
  const handleExport = () => {
    // Logic for exporting to Excel
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
      {" "}
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10 p-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">For Disconnection</h1>
        </div>
        <section className="mb-4">
          <div className="d-flex justify-content-between">
            <Card className="p-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <Card.Text>₱[Amount]</Card.Text>
              </Card.Body>
            </Card>
            <Card className="p-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Total Bills Issued</Card.Title>
                <Card.Text>[Number]</Card.Text>
              </Card.Body>
            </Card>
            <Card className="p-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Total Payments Received</Card.Title>
                <Card.Text>₱[Amount]</Card.Text>
              </Card.Body>
            </Card>
            <Card className="p-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Total Outstanding Amount</Card.Title>
                <Card.Text>₱[Amount]</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </section>
        <div className="row mb-3">
          <div className="col-9 d-flex align-items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="form-control"
            />
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
          fixedHeader
          pagination
          customStyles={customStyles}
        />
        <section className="mb-4">
          <div className="d-flex justify-content-between">
            <div className="chart-container"></div>
            <div className="chart-container"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MonthlySummaryReport;
