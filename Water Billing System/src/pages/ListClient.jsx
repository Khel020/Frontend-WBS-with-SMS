import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListIcon from "@mui/icons-material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Navbar from "react-bootstrap/Navbar";
import {
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClientTable from "../components/ClientTable.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Lit = () => {
  return (
    <>
      <div
        className="userlist d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "#D6EFD8",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
            <div className="row">
              <div className="col">
                <h1 className="h2">List of Clients</h1>
              </div>
            </div>
          </div>
          <Container>
            <div className="row mt-3 mb-4">
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
                        class="bi bi-people-fill"
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
                        class="bi bi-person-fill-gear"
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
                        class="bi bi-person-fill"
                        style={{ fontSize: "20px" }}
                      ></i>{" "}
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
                      1490
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ borderRadius: "20px" }}>
              <div className="card-body p-0">
                <div className="d-flex justify-content-end mb-3 mt-3 mx-3">
                  <form
                    class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                    role="search"
                  >
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                  </form>
                  <Button variant="contained" size="small" color="success">
                    <i className="bi bi-person-plus"></i>
                    Add Client
                  </Button>
                </div>

                <ClientTable />
                <nav aria-label="Page navigation example" className="mx-3">
                  <ul class="pagination justify-content-end">
                    <li class="page-item disabled">
                      <a class="page-link">Previous</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
};

export default Lit;
