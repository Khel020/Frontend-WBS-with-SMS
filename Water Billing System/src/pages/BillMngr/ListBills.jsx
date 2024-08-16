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
          backgroundColor: "#D6EFD8",
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

          <Container fluid>
            <Row className="d-flex align-center justify-content-center mx-auto">
              {[
                {
                  colors: ["#8BC34A", "#4CAF50"],
                  text: "Total Bills:",
                  value: "10",
                },
                {
                  colors: ["#FFEB3B", "#FF9800"],
                  text: "Unpaid Bills:",
                  value: "20",
                },
                {
                  colors: ["#D648EE", "#1976D2"],
                  text: "Paid Bills:",
                  value: "30",
                },
                {
                  colors: ["#716767", "#CAC4D0"],
                  text: "Overdue:",
                  value: "50",
                },
              ].map((item, index) => (
                <Col key={index} md={3} className="mb-2 mx-auto">
                  <Card
                    className={`dash-card ${
                      index === 3 ? "members-card" : "User-card"
                    }`}
                    style={{
                      width: "14rem",
                      height: "4rem",
                      background: `linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]})`,
                      color: "dark",
                    }}
                  >
                    <Card.Body className="dash-card-body d-flex flex-column">
                      <h6>
                        <PeopleAltIcon
                          className="dash-card-icon"
                          style={{ fontSize: "20px", marginRight: "8px" }}
                        />
                        {item.text}
                      </h6>
                      <h6 className="text-end">{item.value}</h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Bills />
          </Container>
        </main>
      </div>
    </>
  );
}

export default ListBills;
