import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import CusTable from "../../components/CustomerTbl";
import { Container, Button, Modal } from "react-bootstrap";
import axios from "axios";

const Customers = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
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
  const [install_date, setInstallDate] = useState("");
  const [address, setAddress] = useState({
    house_num: "",
    purok: "",
    brgy: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = {
      acc_num,
      accountName,
      meter_num,
      contact,
      status,
      address,
      client_type,
      email,
      install_date,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/admin/newclient/",
        newClient
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

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
      <main className="col-md-9 ms-sm-auto col-lg-10 ">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer List</h1>
          <form className="d-flex mt-3 mt-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="d-flex  mb-3 mx-2">
          <Button variant="success" size="sm" onClick={handleShow}>
            <i className="bi bi-person-plus"></i> Add Customer
          </Button>
        </div>

        <CusTable />

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
                    htmlFor="validationServerUsername"
                    className="form-label"
                  >
                    Account Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="validationServerUsername"
                      aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                      required
                      onChange={(e) => setAccName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationServerUsername"
                    className="form-label"
                  >
                    Account Number
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="validationServerUsername"
                      aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                      required
                      onChange={(e) => setAccNum(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Meter Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    onChange={(e) => setMeterNum(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                    aria-describedby="validationServer05Feedback"
                    required
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
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
                  <label htmlFor="validationCustom04" className="form-label">
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
                    <option name="industrial" value="Industrial">
                      Industrial
                    </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="validationServer05Feedback"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="install_date" className="form-label">
                    Installation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="installationdate"
                    aria-describedby="validationServer05Feedback"
                    required
                    onChange={(e) => setInstallDate(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="house_num" className="form-label">
                      House Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="house_num"
                      placeholder="130"
                      required
                      value={address.house_num}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="purok" className="form-label">
                      Purok
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purok"
                      placeholder="4"
                      required
                      value={address.purok}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="barangay" className="form-label">
                      Barangay
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brgy"
                      placeholder="Timbayog"
                      required
                      value={address.brgy}
                      onChange={handleInputChange}
                    />
                  </div>
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
      </main>
    </div>
  );
};

export default Customers;
