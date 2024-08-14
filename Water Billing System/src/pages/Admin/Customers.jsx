import React from "react";
import Sidebar from "../../components/Sidebar";

const Customers = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <>
      <Sidebar role={usertype} />
    </>
  );
};

export default Customers;
