import React from "react";
import Sidebar from "../../components/Sidebar";
const Fees = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Manage Fees</h1>
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
                  Total Bills
                </h5>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginRight: "10px",
                  }}
                ></span>
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
                  Unpaid
                </h5>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginRight: "10px",
                  }}
                ></span>
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
                  Paid
                </h5>
                <span
                  className="card-value"
                  style={{
                    fontSize: "24px",
                    color: "#006F56",
                    marginRight: "10px",
                  }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fees;
