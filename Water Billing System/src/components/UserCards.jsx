import React from "react";
import "../styles/UserCard.css";
const UserCards = () => {
  return (
    <div>
      <div className="row mt-3 mb-5">
        <div className="col">
          <div
            className="card total-user"
            style={{
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-end">
              <h5>
                <i
                  className="bi bi-people-fill"
                  style={{ fontSize: "20px" }}
                ></i>
                Total Users
              </h5>
              <span
                className="card-value"
                style={{
                  fontSize: "24px",
                  color: "#006F56",
                  marginRight: "10px",
                }}
              >
                1500
              </span>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="card total-admin"
            style={{
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-end">
              <h5>
                <i
                  className="bi bi-person-fill-gear"
                  style={{ fontSize: "20px" }}
                ></i>{" "}
                Total Admin
              </h5>
              <span
                className="card-value"
                style={{
                  fontSize: "24px",
                  color: "#006F56",
                  marginRight: "10px",
                }}
              >
                10
              </span>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="card total-client"
            style={{
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-end">
              <h5>
                <i
                  className="bi bi-person-fill"
                  style={{ fontSize: "20px" }}
                ></i>{" "}
                Total Staffs
              </h5>
              <span
                className="card-value"
                style={{
                  fontSize: "24px",
                  color: "#006F56",
                  marginRight: "10px",
                }}
              >
                1490
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
