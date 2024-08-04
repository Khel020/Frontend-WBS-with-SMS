import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const tableStyle = {
  fontSize: "0.9rem",
};

const Table = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1020/client/clients")
      .then((client) => setClient(client.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <table className="table table-hover" style={tableStyle}>
          <thead className="table">
            <tr>
              <th scope="col" className="text-center  text-secondary">
                Account No.
              </th>
              <th scope="col" className="text-center text-secondary">
                Full Name
              </th>
              <th scope="col" className="text-center  text-secondary">
                Meter No.
              </th>
              <th scope="col" className="text-center  text-secondary">
                Status
              </th>
              <th scope="col" className="text-center  text-secondary">
                Type
              </th>

              <th scope="col" className="text-center  text-secondary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {client.map((eachClient, index) => {
              return (
                <tr key={index}>
                  {/* Account num */}
                  <th className="text-center">{eachClient.acc_num}</th>
                  {/* Account name */}
                  <td className="text-center">{eachClient.accountName}</td>
                  {/* Meter no*/}
                  <td className="text-center">{eachClient.meter_num}</td>
                  {/* Account Status */}
                  <td className="text-center">{eachClient.status}</td>
                  {/* Account type */}
                  <td className="text-center">{eachClient.client_type}</td>
                  {/* Account type */}
                  <td className="text-center">
                    <button type="button" className="btn btn-success btn-sm">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm ms-1"
                    >
                      <i className="bi bi-printer"></i>
                    </button>
                    <button type="button" className="btn btn-info btn-sm ms-1">
                      <i className="bi bi-chat-left-text-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
