import React from "react";
import DETAILS from "../components/BCDetails";
import Sidebar from "../components/Sidebar.jsx";

const BillingDetails = () => {
  return (
    <div>
      <div className="userlist d-flex flex-column flex-md-row p-1">
        <Sidebar role="Billing Manager" />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-3">
            <h1 className="h2">Billing Details</h1>
          </div>
          <DETAILS />
        </main>
      </div>
    </div>
  );
};

export default BillingDetails;
