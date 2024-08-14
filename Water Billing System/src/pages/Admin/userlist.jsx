import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Content from "../../components/Usercontent.jsx";
import USERCARD from "../../components/UserCards.jsx";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Userlist() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div
      style={{
        backgroundColor: "#D6EFD8",
        height: "100vh",
      }}
    >
      <div
        className="userlist d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "#D6EFD8",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar role={usertype} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">User Record</h1>
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
          <USERCARD />
          <div
            className="card"
            style={{ borderRadius: "20px", height: "450px" }}
          >
            <div className="card-body p-1">
              <div className="d-flex justify-content-end mb-3 mt-3 mx-3">
                <Button variant="primary" onClick={handleShow}>
                  <i className="bi bi-person-plus"></i>
                  Add Staff
                </Button>
              </div>

              <Content />
              {/* FIXME: Modal for adding client */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="px-3">
                    <form className="row g-3 was-validated">
                      <div className="col-md-6">
                        <label
                          for="validationServerUsername"
                          className="form-label"
                        >
                          Account Name
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            className="form-control is-invalid"
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
                        <label for="validationCustom04" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setStatus(e.target.value)}
                        >
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
                          aria-label="Default select example"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                        </select>
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
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </Modal.Footer>
                    </form>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Userlist;
