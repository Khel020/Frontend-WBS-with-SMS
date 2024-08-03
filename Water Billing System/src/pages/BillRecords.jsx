import React from "react";
import BILLTABLE from "../components/BillTable";
import Sidebar from "../components/Sidebar.jsx";

const BillRecords = () => {
  return (
    <div
      style={{
        backgroundColor: "#D6EFD8",
        height: "100vh",
      }}
    >
      <div className="userlist d-flex flex-column flex-md-row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
            <h1 className="h2">[Name:] Billing Record</h1>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <i
                  className="bi bi-door-open-fill"
                  style={{ fontSize: "24px", marginRight: "10px" }}
                ></i>
                <span>Back</span>
              </div>
            </div>
            <div className="col text-end">
              <button type="button" class="btn btn-info">
                Payment History
              </button>
            </div>
          </div>
          <BILLTABLE />
        </main>
      </div>
    </div>
  );
};
export default BillRecords;
