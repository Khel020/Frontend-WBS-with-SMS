import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CusTable from "../../components/CustomerTbl";
import { Container, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Dropdown from "react-bootstrap/Dropdown";
const Customers = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [showAcc, setActivation] = useState(false);
  //FIX THIS
  const [forActivation, setforActivation] = useState([]);

  const handleCloseAccModal = () => setActivation(false);
  const handleShowAccs = () => {
    setActivation(true);
    const accountForAct = async () => {
      const response = await fetch(`${backend}/admin/forActivation`);
      if (!response.ok) {
        throw new Error("Error Getting For Activation Accounts");
      }
      const data = await response.json();
      setforActivation(data.result);
    };
    accountForAct();
  };
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer List</h1>
          <div className="ms-auto d-flex align-items-center">
            <i
              className="bi bi-bell"
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
            ></i>
            <Dropdown align="end">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="d-flex align-items-center bg-transparent border-0"
                style={{ color: "dark" }}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#/action-1">Archive List</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bills</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Accounts for Activation</span>
                  </div>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                  </span>
                  <Link
                    className=" mt-auto mb-0 text-end"
                    onClick={handleShowAccs}
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Active Consumers</span>
                  </div>

                  <p className="dash-card-value mt-auto mb-0 text-end">500</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Inactive Consumers</span>
                  </div>

                  <p className="dash-card-value mt-auto mb-0 text-end">1200</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <CusTable />
        <Modal
          show={showAcc}
          onHide={handleCloseAccModal}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Consumer Activation Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Account No.</th>
                  <th scope="col">Activation in</th>
                  <th scope="col">Activation Date</th>
                </tr>
              </thead>
              {forActivation.map((accs, index) => (
                <tbody>
                  <tr>
                    <th scope="row" key={index}>
                      {index}
                    </th>
                    <td>{accs.accountName}</td>
                    <td>{accs.acc_num}</td>
                    <td>
                      <Countdown
                        date={new Date(accs.activation_date).getTime()}
                        renderer={({
                          days,
                          hours,
                          minutes,
                          seconds,
                          completed,
                        }) => {
                          if (completed) {
                            return <span>Activated</span>;
                          } else {
                            return (
                              <span>
                                {days}d {hours}h {minutes}m {seconds}s
                              </span>
                            );
                          }
                        }}
                      />
                    </td>
                    <td>{formatDate(accs.activation_date)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
};

export default Customers;
