import React from "react";
import Sidebar from "../../components/Sidebar";
const DetailedReports = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
    </div>
  );
};

export default DetailedReports;
