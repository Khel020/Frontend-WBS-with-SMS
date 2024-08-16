import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "../styles/clientnav.css";

const ClientHeader = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="clientnavbar">
      <Container fluid>
        <Navbar.Brand href="/clientdash" className="text-white">
          CWD Client Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/clientdash" className="clientNav-link">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/yourbills" className="clientNav-link">
              Your Bills
            </Nav.Link>
            <Nav.Link href="/servicerequest" className="clientNav-link">
              Service Request
            </Nav.Link>
            <Nav.Link href="/payments" className="clientNav-link">
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
            <Button variant="outline-light">Search</Button>
          </Form>
          <div className="mx-2">
            <i
              className="bi bi-bell-fill text-white bi-bell-custom"
              aria-label="Notifications"
            ></i>
          </div>
          <div className="mx-2">
            <Dropdown>
              <Dropdown.Toggle className="d-flex align-items-center bg-transparent border-0 text-dark">
                <img
                  src="https://github.com/mdo.png"
                  alt="Profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <span>Admin</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="/archive">Archive List</Dropdown.Item>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/yourbills">Bills</Dropdown.Item>
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
