import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClientTable from "../../components/Table";

function Lit() {
  return (
    <>
      <div className="d-flex">
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="filter" className="me-2">
              Filter:
            </label>
            <TextField
              id="filter"
              variant="outlined"
              size="small"
              placeholder="Type to filter..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Container fluid>
            <Row className="justify-content-center">
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
                  text: "Overdue Bills:",
                  value: "30",
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
            <ClientTable />
          </Container>
        </main>
      </div>
    </>
  );
}

export default Lit;
