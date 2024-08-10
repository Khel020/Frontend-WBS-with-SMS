import React from "react";
import Sidebar from "../../components/Sidebar";
const Paybill = () => {
  return (
    <>
      <div style={{ maxHeight: "100vh" }}>
        <div className="userlist d-flex flex-column flex-md-row p-1">
          <Sidebar role="Billing Manager" />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-3">
              <h1 className="h2">Paybill</h1>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              <i
                className="bi bi-door-open-fill"
                style={{ fontSize: "24px", marginRight: "10px" }}
              ></i>
              <span>Back</span>
            </div>
            <div
              className="card mx-auto"
              style={{
                width: "70rem",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
            >
              <div class="card border-light mb-3">
                <div
                  class="card-header"
                  style={{ padding: "15px", backgroundColor: "#088395" }}
                >
                  <div className="row">
                    <div className="col">
                      <h4 className="text-dark mt-2">Name:</h4>
                    </div>
                    <div className="col text-end">
                      <button
                        className="btn mt-2"
                        style={{ backgroundColor: "#071952", color: "#fff" }}
                      >
                        Submit Payment
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p>Month of: [Reading Date and Duedate]</p>
                  <p>Contact Number:</p>
                  <p>Payment Status:</p>
                  <br />
                  <p>Total Amount:</p> <input type="text" name="" id="" />{" "}
                  <button className="btn btn-info">Clear</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Paybill;
