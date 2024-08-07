import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableStyle = {
  fontSize: "0.9rem",
};

const Table = () => {
  // State for holding clients data
  const [clients, setClients] = useState([]);
  const [showEditModal, setEditModal] = useState(false);

  // Fetch clients data
  useEffect(() => {
    axios
      .get("http://localhost:1020/client/clients")
      .then((response) => setClients(response.data))
      .catch((err) => console.log(err));
  }, []);

  // State for holding selected client data
  const [selectedClient, setSelectedClient] = useState({
    acc_num: "",
    accountName: "",
    meter_num: "",
    contact: "",
    status: "",
    client_type: "",
    email: "",
    birthday: "",
  });

  // View Selected client in edit modal
  const handleEditClick = (client) => {
    setSelectedClient({
      ...client,
      birthday: client.birthday
        ? new Date(client.birthday).toISOString().substring(0, 10)
        : "",
    });
    setEditModal(true);
  };

  // Set values to empty when modal close
  const closeEditModal = () => {
    setEditModal(false);
    setSelectedClient({
      acc_num: "",
      accountName: "",
      meter_num: "",
      contact: "",
      status: "",
      client_type: "",
      email: "",
      birthday: "",
    });
  };
  const closeMOdal = () => {
    setEditModal(false);
  };

  // Function to handle form input change
  const handleEditValues = (e) => {
    const { name, value } = e.target;
    setSelectedClient({ ...selectedClient, [name]: value });
  };

  // Function to handle form submission from edit modal
  const handleEditSubmittion = (e) => {
    e.preventDefault();

    // Make a PUT request to update the client data
    axios
      .put("http://localhost:1020/client/editClient/", selectedClient) // Adjust the URL based on your server configuration
      .then((response) => {
        // Update the client list with the updated client data
        setClients(
          clients.map((client) =>
            client.acc_num === selectedClient.acc_num ? response.data : client
          )
        );
        window.location.reload();
      })
      .catch((error) => console.error("Error updating client:", error));
  };

  // TODO: FORMAT DATE
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div
        className="table table-responsive p-2"
        style={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <table className="table  table-hover text-xsmall">
          <thead className="table-secondary">
            <tr>
              <th scope="col" className="text-center text-secondary">
                Account No.
              </th>
              <th scope="col" className="text-center text-secondary">
                Full Name
              </th>
              <th scope="col" className="text-center text-secondary">
                Meter No.
              </th>
              <th scope="col" className="text-center text-secondary">
                Status
              </th>
              <th scope="col" className="text-center text-secondary">
                Type
              </th>
              <th scope="col" className="text-center text-secondary">
                Email Address
              </th>
              <th scope="col" className="text-center text-secondary">
                Birthday
              </th>
              <th scope="col" className="text-center text-secondary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((eachClient, index) => (
              <tr key={index}>
                <th className="text-center">{eachClient.acc_num}</th>
                <td className="text-center">{eachClient.accountName}</td>
                <td className="text-center">{eachClient.meter_num}</td>
                <td
                  className={`text-center ${
                    eachClient.status === "Active"
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }`}
                >
                  {eachClient.status}
                </td>
                <td className="text-center">{eachClient.client_type}</td>
                <td className="text-center">{eachClient.email}</td>
                <td className="text-center">
                  {formatDate(eachClient.birthday)}
                </td>
                <td className="text-center">
                  <Link to="/bills">
                    <button type="button" className="btn btn-success btn-sm">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </Link>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i class="bi bi-key-fill"></i>
                  </button>
                  <button type="button" className="btn btn-danger btn-sm ms-1">
                    <i class="bi bi-archive-fill"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditClick(eachClient)}
                    className="btn btn-info btn-sm ms-1"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal for edit client */}
        <Modal show={showEditModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="px-3">
              <form
                className="row g-3 was-validated"
                onSubmit={handleEditSubmittion}
              >
                <div className="col-md-6">
                  <label
                    htmlFor="validationServerUsername"
                    className="form-label"
                  >
                    Account Name
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      name="accountName"
                      className="form-control is-invalid"
                      id="validationServerUsername"
                      aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                      required
                      value={selectedClient.accountName}
                      onChange={handleEditValues}
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
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      name="acc_num"
                      disabled
                      className="form-control is-invalid"
                      id="validationServerUsername"
                      aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                      required
                      value={selectedClient.acc_num}
                      onChange={handleEditValues}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Meter Number
                  </label>
                  <input
                    name="meter_num"
                    type="number"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    value={selectedClient.meter_num}
                    onChange={handleEditValues}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    name="contact"
                    type="number"
                    className="form-control is-invalid"
                    id="contact"
                    aria-describedby="validationServer05Feedback"
                    required
                    value={selectedClient.contact}
                    onChange={handleEditValues}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select"
                    aria-label="Default select example"
                    value={selectedClient.status}
                    onChange={handleEditValues}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    Client Type
                  </label>
                  <select
                    name="client_type"
                    className="form-select"
                    aria-label="Default select example"
                    value={selectedClient.client_type}
                    onChange={handleEditValues}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-control is-invalid"
                    id="email"
                    aria-describedby="validationServer05Feedback"
                    required
                    value={selectedClient.email}
                    onChange={handleEditValues}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="birthday" className="form-label">
                    Birthday
                  </label>
                  <input
                    name="birthday"
                    type="date"
                    className="form-control is-invalid"
                    id="birthday"
                    aria-describedby="validationServer05Feedback"
                    required
                    value={selectedClient.birthday}
                    onChange={handleEditValues}
                  />
                </div>
                <div className="col-12">
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditModal}>
                      Close
                    </Button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={closeMOdal}
                    >
                      Update
                    </button>
                  </Modal.Footer>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
