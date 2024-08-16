import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const tableStyle = {
  fontSize: "0.9rem",
};

function BillTable() {
  const [bills, setBills] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch(`${backend}/biller/getAllBills`, {
        method: "GET",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("tkn")}`,
      });
      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      console.log(data);
      setBills(data);
    };
    fetchBills();
  }, []);

  if (!bills) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered" style={tableStyle}>
          <thead className="table-secondary">
            <tr>
              <th scope="col" className="text-center">
                Select
              </th>
              <th scope="col" className="text-center">
                Bill No.
              </th>
              <th scope="col" className="text-center">
                Reading Date
              </th>
              <th scope="col" className="text-center">
                Due Date
              </th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Consumption
              </th>
              <th scope="col" className="text-center">
                Amount Due
              </th>
              <th scope="col" className="text-center">
                Payment Status
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.billNumber}</td>
                <td className="text-center">{formatDate(row.reading_date)}</td>
                <td className="text-center">{formatDate(row.due_date)}</td>
                <td className="text-center">{row.accountName}</td>
                <td className="text-center">{row.consumption}</td>
                <td className="text-center">{row.consumption * 10}</td>
                <td className="text-center">{row.payment_status}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <Link
                      to="billing-details"
                      className="bi bi-eye-fill"
                    ></Link>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i className="bi bi-chat-left-text-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillTable;
