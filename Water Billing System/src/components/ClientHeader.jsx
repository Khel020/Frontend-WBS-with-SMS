import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

const ClientHeader = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#3BAB64" }}>
      <Container fluid>
        <Navbar.Brand href="#" className="text-white">
          CWD Client Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="/clientdash"
              className="text-white link-body-emphasis"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              href="/yourbills"
              className="text-white link-body-emphasis"
            >
              Your Bills
            </Nav.Link>
            <Nav.Link href="#action2" className="text-white link-body-emphasis">
              Service Request
            </Nav.Link>
            <Nav.Link href="payments" className="text-white link-body-emphasis">
              Payment History
            </Nav.Link>
          </Nav>
          <Form className="d-flex mx-3 text-end">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-white" className="bg-white">
              Search
            </Button>
          </Form>
          <div className="mx-2">
            <i
              class="bi bi-bell-fill text-white"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <div className="mx-2">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="d-flex align-items-center bg-transparent border-0 text-dark"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <span>Admin</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#/action-1">Archive List</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bills</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ClientHeader;
