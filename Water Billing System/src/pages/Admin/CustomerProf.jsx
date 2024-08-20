import React from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";

const CustomerProf = () => {
  const { acc_number, accountName } = useParams();
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10 ">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer List</h1>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="card mb-3">
                <div class="card-body text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile Picture"
                    class="rounded-circle mb-3"
                  />
                  <h5 class="card-title">{accountName}</h5>
                  <p class="card-text">hferguson@gmail.com</p>
                  <p class="card-text">J. Rizal Street</p>
                  <p class="card-text">+1 415 482 79024</p>
                  <button type="button" class="btn btn-link">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-between align-items-center mb-3">
                    <strong>Account Information</strong>
                    <i
                      class="bi bi-pencil-square text-primary"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                    ></i>
                  </h5>

                  <p class="card-text">
                    <strong>Account Number:</strong> 45 days ago
                  </p>
                  <p class="card-text">
                    <strong>Account Status:</strong> 45 days ago
                  </p>
                  <p class="card-text">
                    <strong>Connection Type:</strong> Monday
                  </p>
                  <p class="card-text">
                    <strong>Installation Date:</strong> Morning
                  </p>
                  <p class="card-text">
                    <strong>Meter Number:</strong> 3
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-4">
                  <div class="card mb-3">
                    <div class="card-body text-center">
                      <h5 class="card-title">Average Monthly Consumption</h5>
                      <p class="card-text display-4">4.5</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-3">
                    <div class="card-body text-center">
                      <h5 class="card-title">Estimated Monthly Cost:</h5>
                      <p class="card-text display-4">89%</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-3">
                    <div class="card-body text-center">
                      <h5 class="card-title mb-3">Present Bill Status:</h5>
                      <p class="card-text display-4 mb-3">Unpaid</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="card mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Account Summary</h5>
                      <p class="card-text">
                        <strong>Account Balance:</strong> $250.00
                      </p>
                      <p class="card-text">
                        <strong>Last Payment Date:</strong> July 25, 2024
                      </p>
                      <p class="card-text">
                        <strong>Next Payment Due:</strong> August 30, 2024
                      </p>
                      <p class="card-text">
                        <strong>Payment Method:</strong> Cash
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="card mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Activities</h5>
                      <p class="card-text">
                        <strong>Visit:</strong> Jan 12, 2020 - 2:32 PM PDT - F&M
                        - New York, 340 5th Street - 32 minutes
                      </p>
                      <p class="card-text">
                        <strong>Connection:</strong> Jan 12, 2020 - 2:35 PM PDT
                        - F&M - New York, 340 5th Street - 45 minutes - 56 MB
                      </p>
                      <p class="card-text">
                        <strong>WiFi Sign-Up:</strong> Feb 09, 2020 - 1:47 PM
                        PDT - San Francisco, 120 Sutter Street
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProf;
