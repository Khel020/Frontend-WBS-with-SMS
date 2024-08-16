import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import HistoryTable from "../../components/HistoryTable.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
          <h1 className="h2 me-3">Payments of [Name: ]</h1>
        </div>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} size="small">
          Back
        </Button>
        <HistoryTable />
      </main>
    </div>
  );
}

export default Table;
