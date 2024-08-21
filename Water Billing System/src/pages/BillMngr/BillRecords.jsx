import React, { useEffect } from "react";
import BILLTABLE from "../../components/BillRecordTable.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { Link, useParams } from "react-router-dom";

const BillRecords = () => {
  const { accountName } = useParams();
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">{accountName} Billing Record</h1>
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
            <Link to="receive-payments">
              <button className="btn btn-primary">Receive Payments</button>
            </Link>
          </div>
        </div>
        <BILLTABLE />
      </main>
    </div>
  );
};
export default BillRecords;
