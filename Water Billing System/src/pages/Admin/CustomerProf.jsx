import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { useParams } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";

import axios from "axios";
const CustomerProf = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Event listeners para ma-detect kung online o offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
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
    c_address: "",
  });

  const [show, setShow] = useState(false);
  const token = localStorage.getItem("type");
  const usertype = token;
  const backend = import.meta.env.VITE_BACKEND;

  const handleEditModal = (data) => {
    setEditCustomer({
      ...data,
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
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer Profile</h1>
        </div>
        {customers.map((customer, index) => (
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card mb-3">
                  <div className="card-body text-center">
                    {isOnline ? (
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          customer.accountName || "Customer"
                        )}&background=random&color=fff&size=120`}
                        alt="Profile"
                        className="rounded-circle img-thumbnail"
                        width="120"
                        height="120"
                      />
                    ) : (
                      <img
                        src="/assets/default-avatar.png"
                        alt="Profile"
                        className="rounded-circle img-thumbnail"
                        width="120"
                        height="120"
                      />
                    )}
                    <h4 className="card-title fw-bold text-primary">
                      {customer.accountName}
                    </h4>
                    <p className="card-text text-muted mb-1">
                      {customer.email || "No email available"}
                    </p>
                    <p className="card-text text-muted">{customer.c_address}</p>
                    {usertype === "CS_Officer" && (
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={() => handleEditModal(customer)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title d-flex justify-content-between align-items-center mb-3 text-primary">
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
                      <strong>Meter Brand:</strong> {customer.meter_brand}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-8 ">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="card mb-3 h-100">
                      <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h4 class="card-title">Latest Water Consumption</h4>
                        <p class="card-text display-6">4.5</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-3 h-100">
                      <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h4 class="card-title">Classification Type</h4>
                        <p class="card-text display-6">
                          {customer.client_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-3 h-100">
                      <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h4 class="card-title mb-4">Present Bill Status:</h4>
                        <p class="card-text display-6 ">Unpaid</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="card mb-3 shadow-sm">
                      <div class="card-body">
                        <h6 class="card-title text-primary">Account Summary</h6>
                        <hr />
                        <p class="card-text">
                          <strong>Account Balance:</strong>{" "}
                          {customer.totalBalance
                            ? "₱ " + customer.totalBalance.toFixed(2)
                            : "₱ 0.00"}
                        </p>
                        <p class="card-text">
                          <strong>Account Deposit:</strong>{" "}
                          {customer.advancePayment
                            ? "₱ " + customer.advancePayment.toFixed(2)
                            : "₱ 0.00"}
                        </p>
                        <p class="card-text">
                          <strong>Last Payment Date:</strong>{" "}
                          {customer.last_billDate
                            ? formatDate(customer.last_billDate)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="card mb-3 shadow-sm"
                      style={{ height: "250px", overflow: "hidden" }}
                    >
                      <div class="card-body">
                        <h6 class="card-title text-primary">
                          Recent Payment Transactions
                        </h6>
                        <hr />
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          <ul class="list-unstyled">
                            <li class="mb-3">
                              <p class="card-text mb-1">
                                <strong>Date:</strong> Dec 20, 2023 - 10:45 AM
                              </p>
                              <p class="card-text mb-1">
                                <strong>Amount:</strong> ₱ 500.00
                              </p>
                              <p class="card-text mb-1">
                                <strong>Method:</strong> Cash
                              </p>
                              <span class="badge bg-success">Completed</span>
                            </li>
                            <li class="mb-3">
                              <p class="card-text mb-1">
                                <strong>Date:</strong> Nov 15, 2023 - 2:30 PM
                              </p>
                              <p class="card-text mb-1">
                                <strong>Amount:</strong> ₱ 600.00
                              </p>
                              <p class="card-text mb-1">
                                <strong>Method:</strong> Credit Card
                              </p>
                              <span class="badge bg-success">Completed</span>
                            </li>
                            <li class="mb-3">
                              <p class="card-text mb-1">
                                <strong>Date:</strong> Oct 10, 2023 - 9:15 AM
                              </p>
                              <p class="card-text mb-1">
                                <strong>Amount:</strong> ₱ 550.00
                              </p>
                              <p class="card-text mb-1">
                                <strong>Method:</strong> Bank Transfer
                              </p>
                              <span class="badge bg-success">Completed</span>
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
                {/* New Address Input */}
                <div className="col-md-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="c_address"
                    required
                    value={editCustomer.c_address || ""}
                    onChange={handleEditValues}
                  />
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
