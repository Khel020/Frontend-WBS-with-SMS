import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/clientTBL.css";

const Table = () => {
  //State for storing data
  const [clients, setClients] = useState([]);
  const [clientBill, setClientBill] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [readingDate, setReading] = useState("");
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
  //State for Modal Show
  const [showAddBill, setAddBModal] = useState(false);
  const [showArchive, setArchive] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
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
  const handleAddModal = (client) => {
    setSelectedClient({
      ...client,
    });
    setAddBModal(true);
  };
  const handleArchive = (client) => {
    setSelectedClient({
      ...client,
    });
    setArchive(true);
  };

  const closeAddBillModal = () => {
    setAddBModal(false);
  };
  const closeMOdal = () => {
    setEditModal(false);
  };
  const closeArchiveModal = () => {
    setArchive(false);
  };

  const handleReadingDateChange = (e) => {
    const date = e.target.value;
    setReading(date);

    const newDueDate = new Date(date);
    newDueDate.setDate(newDueDate.getDate() + 30);

    const formattedDueDate = newDueDate.toISOString().split("T")[0];
    setDueDate(formattedDueDate);
  };

  useEffect(() => {
    const fetchBillByAccNum = async () => {
      const response = await fetch(
        `${backend}/biller/getBillbyAccNum/${selectedClient.acc_num}`
      );
      if (!response.ok) {
        return { err: "Failed No Response" };
      }

      const data = await response.json();
      console.log(data);
      setClientBill(data);
    };
    fetchBillByAccNum();
  }, []);

  //TODO: "EDIT CLIENT" View Selected client in edit modal
  // const handleEditClick = (client) => {
  //   setSelectedClient({
  //     ...client,
  //     birthday: client.birthday
  //       ? new Date(client.birthday).toISOString().substring(0, 10)
  //       : "",
  //   });
  //   setEditModal(true);
  // };

  // Set values to empty when modal close

  // Function to handle form input change
  // const handleEditValues = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedClient({ ...selectedClient, [name]: value });
  // };

  // // Function to handle form submission from edit modal
  // const handleEditSubmittion = (e) => {
  //   e.preventDefault();

  //   // Make a PUT request to update the client data
  //   axios
  //     .put("http://localhost:1020/client/editClient/", selectedClient)
  //     .then((response) => {
  //       // Update the client list with the updated client data
  //       setClients(
  //         clients.map((client) =>
  //           client.acc_num === selectedClient.acc_num ? response.data : client
  //         )
  //       );
  //       window.location.reload();
  //     })
  //     .catch((error) => console.error("Error updating client:", error));
  // };

  // TODO: FORMAT DATE
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //TODO: GET ALL Consumers
  const backend = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(`${backend}/client/clients`, {
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
      setClients(data);
    };
    fetchClients();
  }, []);
  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="table table-responsive p-2"
        style={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <table className="table  table-hover text-xsmall">
          <thead className="table-dark">
            <tr>
              <th scope="col" className=" text-white">
                Account No.
              </th>
              <th scope="col" className=" text-white">
                Full Name
              </th>
              <th scope="col" className=" text-white">
                Meter No.
              </th>
              <th scope="col" className=" text-white">
                Status
              </th>
              <th scope="col" className=" text-white">
                Type
              </th>
              <th scope="col" className=" text-white">
                Email Address
              </th>
              <th scope="col" className=" text-white">
                Address
              </th>
              <th scope="col" className=" text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((eachClient, index) => (
              <tr key={index}>
                <td>{eachClient.acc_num}</td>
                <td>{eachClient.accountName}</td>
                <td>{eachClient.meter_num}</td>
                <td>
                  {eachClient.status === "Active" ? (
                    <span className="badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill">
                      Inactive
                    </span>
                  )}
                </td>

                <td>{eachClient.client_type}</td>
                <td>{eachClient.email}</td>
                <td>
                  {eachClient.c_address.house_num +
                    ", Purok " +
                    eachClient.c_address.purok +
                    " ," +
                    eachClient.c_address.brgy}
                </td>
                <td>
                  <Link
                    to={`/billing-records/${eachClient.acc_num}/${eachClient.accountName}`}
                  >
                    <a className="btn btn-info btn-sm">
                      <span>View Bills</span>
                    </a>
                  </Link>

                  {/*FIXME: EDIT CLIENT FUNCTION <button
                    type="button"
                    onClick={() => handleEditClick(eachClient)}
                    className="btn btn-info btn-sm ms-1"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: ADD BILLS FOR CLIENT MODAL */}
        <Modal show={showAddBill} onHide={closeAddBillModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add Bill:
              <span
                style={{ color: "blue", fontSize: "20px", marginLeft: "15px" }}
              >
                {selectedClient.accountName}
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="read_date" className="form-label">
                  Reading Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="read_date"
                  required
                  value={readingDate}
                  onChange={handleReadingDateChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="due_date"
                  required
                  value={dueDate}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label for="presentRead" className="form-label">
                  Previous Reading
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="presentRead"
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="presentRead" className="form-label">
                  Present Reading
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="presentRead"
                  required
                />
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Others"
                    id="floatingTextarea"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label for="floatingTextarea">Others</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Remarks"
                    id="floatingTextarea"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label for="floatingTextarea">Remarks</label>
                </div>
              </div>
              <div className="col-md-6">
                <label for="presentRead" className="form-label">
                  Total Consumption
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="presentRead"
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="col-md-6">
                <label for="presentRead" className="form-label">
                  Total Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="presentRead"
                  required
                  disabled
                  placeholder="0.00"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddBillModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={closeAddBillModal} type="submit">
              Add Bill
            </Button>
          </Modal.Footer>
        </Modal>
        {/* TODO: ARCHIVE MODAL
        <Modal show={showArchive} onHide={closeArchiveModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="bi bi-exclamation-triangle"
                  style={{ fontSize: "20px", marginRight: "5px" }}
                ></i>
                <span style={{ fontSize: "20px" }}>Archive</span>
              </div>

              <div className="mt-2 g-2">
                <i>
                  <span className="fw-bold ">Account name: </span>
                  <span className="text-danger">
                    {selectedClient.accountName}
                  </span>{" "}
                  <span className="text-danger">
                    [{selectedClient.acc_num}]
                  </span>
                </i>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark">
            Are you sure do you want to archive this client?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddBillModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={closeAddBillModal}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal> */}

        {/* TODO: EDIT CLIENT MODAL */}
        {/* <Modal show={showEditModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="px-3">
              <form className="row g-3" onSubmit={handleEditSubmittion}>
                <div className="col-md-6">
                  <label
                    htmlFor="validationServerUsername"
                    className="form-label"
                  >
                    Account Name
                  </label>
                  <div className="input-group ">
                    <input
                      type="text"
                      name="accountName"
                      className="form-control"
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
                  <div className="input-group ">
                    <input
                      type="text"
                      name="acc_num"
                      disabled
                      className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
        </Modal> */}
      </div>
    </div>
  );
};

export default Table;
