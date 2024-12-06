import React from "react";
import Sidebar from "../../components/Sidebar";
const Dashboard = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div>
      <Sidebar role={usertype} />
    </div>
  );
};

export default Dashboard;
