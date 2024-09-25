import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import ClientTable from "../../components/ClientTable.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

const Lit = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    activeClients: 0,
    inactiveClients: 0,
  });

  const fetchClientStats = async () => {
    try {
      const response = await fetch(`${backend}/biller/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setClientStats(data);
      } else {
        toast.error("Error fetching client statistics.");
      }
    } catch (error) {
      console.error("Error fetching client statistics:", error);
      toast.error("Error fetching client statistics.");
    }
  };
  useEffect(() => {
    fetchClientStats();
  }, []);
  //TODO: Fetch Bill to modal

  const token = localStorage.getItem("type");
  const usertype = token;

  return (
    <>
      <div
        className="d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">List Of Consumers</h1>

            <div className="ms-auto d-flex align-items-center">
              <i
                className="bi bi-bell"
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              ></i>
              <Dropdown align="end">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="d-flex align-items-center bg-transparent border-0"
                  style={{ color: "dark" }}
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="User profile picture"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="#/help">Help</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col">
              <div
                className="card total-user"
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#DEF0F7",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-end">
                  <h5>
                    <i
                      className="bi bi-people-fill"
                      style={{ fontSize: "20px" }}
                    ></i>
                    Total Clients
                  </h5>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {clientStats.totalClients}
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card total-admin"
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#DEF0F7",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-end">
                  <h5>
                    <i
                      className="bi bi-person-fill-gear"
                      style={{ fontSize: "20px" }}
                    ></i>{" "}
                    Active
                  </h5>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {clientStats.activeClients}
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card total-client"
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#DEF0F7",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-end">
                  <h5>
                    <i
                      className="bi bi-person-fill"
                      style={{ fontSize: "20px" }}
                    ></i>
                    Inactive
                  </h5>
                  <span
                    className="card-value"
                    style={{
                      fontSize: "24px",
                      color: "#006F56",
                      marginRight: "10px",
                    }}
                  >
                    {clientStats.inactiveClients}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ClientTable />
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default Lit;
