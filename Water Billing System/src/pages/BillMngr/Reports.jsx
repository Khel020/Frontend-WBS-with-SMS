import React from "react";
import Sidebar from "../../components/Sidebar";
const Reports = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div>
      <Sidebar role={usertype} />
    </div>
  );
};

export default Reports;
