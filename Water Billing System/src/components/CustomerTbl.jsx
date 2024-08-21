import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const CustomerTbl = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("type");
  const usertype = token;
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(`${backend}/admin/customers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      console.log(data);
      setClients(data);
    };
    fetchClients();
  }, []);
  if (!clients) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div
      className="table table-responsive p-2"
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <table className="table  table-hover text-xsmall">
        <thead className="table-dark">
          <tr>
            <th scope="col" className=" text-white">
              Account No.
            </th>
            <th scope="col" className=" text-white">
              Full Name
            </th>
            <th scope="col" className=" text-white">
              Address
            </th>
            <th scope="col" className=" text-white">
              Status
            </th>
            <th scope="col" className=" text-white">
              Email Address
            </th>
            <th scope="col" className=" text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((eachClient, index) => (
            <tr key={index}>
              <td>{eachClient.acc_num}</td>
              <td>{eachClient.accountName}</td>
              <td>
                {eachClient.c_address.house_num +
                  ", Purok " +
                  eachClient.c_address.purok +
                  ",  " +
                  eachClient.c_address.brgy}
              </td>
              <td>
                {eachClient.status === "Active" ? (
                  <span className="badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
                    Active
                  </span>
                ) : (
                  <span className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill">
                    Inactive
                  </span>
                )}
              </td>
              <td>{eachClient.email}</td>
              <td>
                <Link
                  to={`/customer/${eachClient.acc_num}/${eachClient.accountName}`}
                  type="button"
                  className="btn btn-success btn-sm rounded"
                >
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTbl;
