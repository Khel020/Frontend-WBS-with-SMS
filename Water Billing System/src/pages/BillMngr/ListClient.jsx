import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
        className="listclient d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
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
          <div
            className="card"
            style={{ borderRadius: "15px", height: "75vh" }}
          >
            <div className="card-body p-0">
              <div className="d-flex justify-content-end mb-3 mt-3 mx-3">
                <Button variant="primary" onClick={handleShow}>
                  <i className="bi bi-person-plus"></i>
                  Add Client
                </Button>
              </div>

              <ClientTable />
            </div>
          </div>

          {/* FIXME: Modal for adding client */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="px-3">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label
                      for="validationServerUsername"
                      className="form-label"
                    >
                      Account Name
                    </label>
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control "
                        id="validationServerUsername"
                        aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                        required
                        onChange={(e) => setAccName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label
                      for="validationServerUsername"
                      className="form-label"
                    >
                      Account Number
                    </label>
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control "
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
                      className="form-control "
                      id="validationServer03"
                      aria-describedby="validationServer03Feedback"
                      onChange={(e) => setMeterNum(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="contact" className="form-label">
                      Contact
                    </label>
                    <input
                      type="Number"
                      className="form-control "
                      id="contact"
                      aria-describedby="validationServer05Feedback"
                      required
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="validationCustom04" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option selected>Select a status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="validationCustom04" className="form-label">
                      Client Type
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected>Select a type</option>
                      <option name="residential" value="Residential">
                        Residential
                      </option>
                      <option name="commercial" value="Commercial">
                        Commercial
                      </option>
                      <option name="industiral" value="Industrial">
                        Industrial
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control "
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
                      className="form-control "
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
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </Modal.Footer>
                </form>
              </div>
            </Modal.Body>
          </Modal>
          {/* FIXME: END OF ADD CLIENT MODAL */}
        </main>
      </div>
    </>
  );
};

export default Lit;
