import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import ClientTable from "../components/ClientTable.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Lit = () => {
  //modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // states for adding client
  const [acc_num, setAccNum] = useState("");
  const [fname, setfName] = useState("");
  const [lastname, setLastName] = useState("");
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
      fname,
      lastname,
      meter_num,
      status,
      client_type,
      contact,
      email,
      birthday,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/client/newclient/",
        newClient
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
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
                        className="bi bi-person-fill"
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
            <div
              className="card"
              style={{ borderRadius: "20px", height: "450px" }}
            >
              <div className="card-body p-0">
                <div className="d-flex justify-content-end mb-3 mt-3 mx-3">
                  <form
                    className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                    role="search"
                  >
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                  </form>
                  <form action="">
                    <Button variant="primary" onClick={handleShow}>
                      <i className="bi bi-person-plus"></i>
                      Add Client
                    </Button>
                  </form>
                </div>

                <ClientTable />
              </div>
              <div class="card-footer">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="px-3" onSubmit={handleSubmit}>
                <form className="row g-3 was-validated">
                  <div className="col-md-6">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      onChange={(e) => setfName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Example invalid feedback text
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Example invalid feedback text
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label
                      for="validationServerUsername"
                      className="form-label"
                    >
                      Account Number
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        className="form-control is-invalid"
                        id="validationServerUsername"
                        aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                        required
                        onChange={(e) => setAccNum(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label for="validationServer03" className="form-label">
                      Meter Number
                    </label>
                    <input
                      type="number"
                      className="form-control is-invalid"
                      id="validationServer03"
                      aria-describedby="validationServer03Feedback"
                      onChange={(e) => setMeterNum(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="validationCustom04" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option selected value="Active">
                        Active
                      </option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="validationCustom04" className="form-label">
                      Client Type
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected>Open this select menu</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="contact" className="form-label">
                      Contact
                    </label>
                    <input
                      type="Number"
                      className="form-control is-invalid"
                      id="contact"
                      aria-describedby="validationServer05Feedback"
                      required
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control is-invalid"
                      id="email"
                      aria-describedby="validationServer05Feedback"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="birthday" className="form-label">
                      Birthday
                    </label>
                    <input
                      type="date"
                      className="form-control is-invalid"
                      id="birthday"
                      aria-describedby="validationServer05Feedback"
                      required
                      onChange={(e) => setBday(e.target.value)}
                    />
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleClose}
                    >
                      Submit
                    </button>
                  </Modal.Footer>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Lit;
