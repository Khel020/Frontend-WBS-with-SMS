import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";
import axios from "axios";
const CustomerProf = () => {
  const { acc_number } = useParams();
  const [customers, setCustomer] = useState([]);
  const [editCustomer, setEditCustomer] = useState({
    accountName: "",
    acc_num: "",
    meter_num: "",
    contact: "",
    client_type: "",
    email: "",
    install_date: "",
    c_address: {
      house_num: "",
      purok: "",
      brgy: "",
    },
  });

  const [show, setShow] = useState(false);
  const token = localStorage.getItem("type");
  const usertype = token;
  const backend = import.meta.env.VITE_BACKEND;
  // const houseNumber = editCustomer.c_address.house_num;
  // const Purok = editCustomer.c_address.purok;
  // const Barangay = editCustomer.c_address.brgy;
  const handleEditModal = (data) => {
    setEditCustomer({
      ...data,
      c_address: {
        house_num: data.c_address.house_num || "",
        purok: data.c_address.purok || "",
        brgy: data.c_address.brgy || "",
      },
      install_date: data.install_date
        ? new Date(data.install_date).toISOString().substring(0, 10)
        : "",
    });
    setShow(true);
  };
  const handleCloseEdit = () => {
    setShow(false);
  };
  const handleEditValues = (e) => {
    const { name, value } = e.target;
    if (name === "house_num" || name === "purok" || name === "brgy") {
      setEditCustomer({
        ...editCustomer,
        c_address: {
          ...editCustomer.c_address,
          [name]: value,
        },
      });
    } else {
      setEditCustomer({ ...editCustomer, [name]: value });
    }
  };

  const handleEditCustomer = (e) => {
    e.preventDefault();

    axios
      .put(`${backend}/admin/editClient/`, editCustomer)
      .then((response) => {
        // Update the client list with the updated client data
        setCustomer((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.acc_num === setEditCustomer.acc_num
              ? response.data
              : customer
          )
        );
        window.location.reload();
        handleCloseEdit();

        console.log("Client updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        // Optionally, set an error state to display an error message
      });
  };

  useEffect(() => {
    const customer_details = async () => {
      const response = await fetch(`${backend}/admin/customers/${acc_number}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });
      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      setCustomer(data);
      // Assuming you want to also initialize editCustomer here
      if (data.length > 0) {
        setEditCustomer({
          ...data[0], // Adjust if needed
          install_date: new Date(data[0].install_date)
            .toISOString()
            .substring(0, 10),
        });
      }
    };
    customer_details();
  }, [acc_number, backend]);
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
      <main className="col-md-9 ms-sm-auto col-lg-10 ">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer Profile</h1>
        </div>
        {customers.map((customer, index) => (
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-body text-center">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Profile Picture"
                      class="rounded-circle mb-3"
                    />
                    <h5 class="card-title">{customer.accountName}</h5>
                    <p class="card-text">{customer.email}</p>
                    <p class="card-text">{customer.c_address}</p>
                    <p class="card-text">{customer.contact}</p>
                    <button
                      type="button"
                      class="btn btn-link"
                      onClick={() => handleEditModal(customer)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title d-flex justify-content-between align-items-center mb-3">
                      <strong>Account Information</strong>
                    </h5>
                    <p class="card-text">
                      <strong>Account Number: </strong> {customer.acc_num}
                    </p>
                    <p class="card-text">
                      <strong>Account Status:</strong> {customer.status}
                    </p>
                    <p class="card-text">
                      <strong>Connection Type:</strong> {customer.client_type}
                    </p>
                    <p class="card-text">
                      <strong>Installation Date:</strong>{" "}
                      {formatDate(customer.install_date)}
                    </p>
                    <p class="card-text">
                      <strong>Meter Number:</strong> {customer.meter_num}
                    </p>
                    <p class="card-text">
                      <strong>Pipe Size:</strong> {customer.pipe_size}
                    </p>
                    <p class="card-text">
                      <strong>Brand Number:</strong> {customer.brand_num}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-4">
                    <div class="card mb-3">
                      <div class="card-body text-center">
                        <h5 class="card-title">Average Monthly Consumption</h5>
                        <p class="card-text display-4">4.5</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-3">
                      <div class="card-body text-center">
                        <h5 class="card-title">Estimated Monthly Cost:</h5>
                        <p class="card-text display-4">89%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-3">
                      <div class="card-body text-center">
                        <h5 class="card-title mb-3">Present Bill Status:</h5>
                        <p class="card-text display-4 mb-3">Unpaid</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="card mb-3">
                      <div class="card-body">
                        <h5 class="card-title">Account Summary</h5>
                        <p class="card-text">
                          <strong>Account Balance:</strong>{" "}
                          {customer.totalBalance ? customer.totalBalance : 0}
                        </p>
                        <p class="card-text">
                          <strong>Account Deposit:</strong>
                          {customer.advancePayment
                            ? " ₱ " + customer.advancePayment
                            : " ₱" + 0}
                        </p>
                        <p class="card-text">
                          <strong>Last Payment Date:</strong>{" "}
                          {formatDate(customer.last_billDate)}
                        </p>
                        <p class="card-text">
                          {/* dapat nakadepende last duedate */}
                          <strong>Next Payment Due:</strong> August 30, 2024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="card mb-3" style={{ height: "250px" }}>
                      <div class="card-body">
                        <h5 class="card-title">Activities</h5>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          <ul class="list-unstyled">
                            <li>
                              <p class="card-text">
                                <strong>Visit:</strong> Jan 12, 2020 - 2:32 PM
                                PDT - F&M - New York, 340 5th Street - 32
                                minutes
                              </p>
                            </li>
                            <li>
                              <p class="card-text">
                                <strong>Connection:</strong> Jan 12, 2020 - 2:35
                                PM PDT - F&M - New York, 340 5th Street - 45
                                minutes - 56 MB
                              </p>
                            </li>
                            <li>
                              <p class="card-text">
                                <strong>WiFi Sign-Up:</strong> Feb 09, 2020 -
                                1:47 PM PDT - San Francisco, 120 Sutter Street
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modal show={show} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="px-3">
              <form className="row g-3" onSubmit={handleEditCustomer}>
                <div className="col-md-6">
                  <label htmlFor="accountName" className="form-label">
                    Account Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="accountName"
                      name="accountName"
                      aria-describedby="inputGroupPrepend3"
                      required
                      value={editCustomer.accountName || ""}
                      onChange={handleEditValues}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="accountNumber"
                      name="acc_num"
                      aria-describedby="inputGroupPrepend3"
                      required
                      disabled
                      value={editCustomer.acc_num || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="meterNumber" className="form-label">
                    Meter Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="meterNumber"
                    name="meter_num"
                    aria-describedby="meterNumberFeedback"
                    required
                    value={editCustomer.meter_num || ""}
                    onChange={handleEditValues}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={editCustomer.status || ""}
                    onChange={handleEditValues}
                  >
                    <option value="">Select a status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="clientType" className="form-label">
                    Client Type
                  </label>
                  <select
                    className="form-select"
                    id="clientType"
                    name="client_type"
                    value={editCustomer.client_type || ""}
                    onChange={handleEditValues}
                  >
                    <option value="">Select a type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="install_date" className="form-label">
                    Installation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="install_date"
                    name="install_date"
                    aria-describedby="install_dateFeedback"
                    required
                    disabled
                    value={editCustomer.install_date || ""}
                  />
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label htmlFor="house_num" className="form-label">
                      House Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="house_num"
                      name="house_num"
                      placeholder="130"
                      required
                      value={editCustomer.c_address?.house_num || ""}
                      onChange={handleEditValues}
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
                      name="purok"
                      placeholder="4"
                      required
                      value={editCustomer.c_address?.purok || ""}
                      onChange={handleEditValues}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="brgy" className="form-label">
                      Barangay
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brgy"
                      name="brgy"
                      placeholder="Timbayog"
                      required
                      value={editCustomer.c_address?.brgy || ""}
                      onChange={handleEditValues}
                    />
                  </div>
                </div>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Modal.Footer>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
};

export default CustomerProf;
