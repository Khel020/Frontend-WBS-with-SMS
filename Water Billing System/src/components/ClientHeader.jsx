import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
const ClientHeader = () => {
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
            <Nav.Link href="#action1" className="text-white link-body-emphasis">
              Dashboard
            </Nav.Link>
            <Nav.Link href="#action2" className="text-white link-body-emphasis">
              Your Bills
            </Nav.Link>
            <Nav.Link href="#action2" className="text-white link-body-emphasis">
              Service Request
            </Nav.Link>
            <Nav.Link href="#" className="text-white link-body-emphasis">
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
          <div className="dropdown text-end mx-5">
            <li
              to="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </li>
            <ul className="dropdown-menu text-small">
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ClientHeader;
