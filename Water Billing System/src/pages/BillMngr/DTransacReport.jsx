import React from "react";
import Sidebar from "../../components/Sidebar";
const DTransacReport = () => {
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
      <main className="col-md-9 ms-sm-auto col-lg-10">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Daily Transaction</h1>
        </div>
      </main>
    </div>
  );
};

export default DTransacReport;
