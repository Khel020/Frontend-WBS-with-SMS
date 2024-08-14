import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import SetTable from "../../components/Template.jsx";
import { Button } from "@mui/material";

const tableStyle = {
  fontSize: "0.9rem",
};

function Table() {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 me-3">Settings</h1>
        </div>

        <h4> customize</h4>

        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "0 5px" }}
        >
          SMS Template
        </Button>
        <Button variant="contained" color="warning" style={{ margin: "0 5px" }}>
          Rates
        </Button>
        <Button variant="contained" color="info" style={{ margin: "0 5px" }}>
          Dashboard
        </Button>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="contained" size="small" color="success">
            Add Template
          </Button>
        </div>

        <SetTable />
      </main>
    </div>
  );
}

export default Table;
