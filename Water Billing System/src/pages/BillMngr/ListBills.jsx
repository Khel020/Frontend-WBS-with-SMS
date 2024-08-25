import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import {
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Bills from "../../components/BillTable.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function ListBills() {
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
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">Billing Monitoring</h1>

            <form className="d-flex mt-3 mt-lg-0" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Client..."
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
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
          <Container fluid>
            <Bills />
          </Container>
        </main>
      </div>
    </>
  );
}

export default ListBills;
