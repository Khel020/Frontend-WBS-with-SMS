import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
const YourBills = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [data, setData] = useState(null);
  const token = localStorage.getItem("type");
  const usertype = token;

  const navigate = useNavigate();
  console.log("usertype:", usertype);
  return (
    <div>
      <div
        className="d-flex"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">List of Bills</h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YourBills;
