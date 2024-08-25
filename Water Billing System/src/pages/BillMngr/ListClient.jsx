import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import ClientTable from "../../components/ClientTable.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Lit = () => {
  //TODO: modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //TODO: states for adding client
  const [accountName, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [status, setStatus] = useState("");
  const [client_type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = {
      acc_num,
      accountName,
      meter_num,
      contact,
      status,
      client_type,
      email,
      birthday,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/client/newclient/",
        newClient
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const token = localStorage.getItem("type");
  const usertype = token;

  return (
    <>
      <div
        className=" d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-2">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">List Of Consumers</h1>
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
          {/* TODO: CARDS FOR Client Categories */}
          <div className="row mt-3 mb-3">
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
                    Total Clients
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
          <div className="d-flex justify-content-end mb-2">
            <button
              className="btn btn-success btn-sm mx-3"
              onClick={handleShow}
            >
              Proceed to Payment
            </button>
          </div>
          <ClientTable />
        </main>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Account Information :</h5>
            <div className="row mt-4">
              <div className="col">
                <Form.Label>Account Name:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
              <div className="col">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
            </div>
            <hr />
            <h5>Bill Information :</h5>
            <div className="row mt-4">
              <div className="col">
                <Form.Label>Unpaid Bills:</Form.Label>
                <Form.Select aria-label="Select Bill Number">
                  <option value="">Select Bill No.</option>
                  <option value="bill1">Bill 1</option>
                  <option value="bill2">Bill 2</option>
                  <option value="bill3">Bill 3</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="Date" placeholder="" step="0.01" disabled />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <Form.Label>Penalty Charge</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  disabled
                />
              </div>
              <div className="col">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  disabled
                />
              </div>
            </div>
            <hr />

            <div className="mt-4">
              <h5>Payment Details for :</h5>
              <div className="row">
                <div className="col">
                  <Form.Group controlId="amount">
                    <Form.Label>Amount to pay:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      step="0.01"
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form>
                    <Form.Group controlId="paymentDate" className="">
                      <Form.Label>Payment Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Proceed to Payment</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Lit;
