import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "../styles/clientTBL.css";

const BillRecordTable = () => {
  const [paymentCanvas, setPayCanvas] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bill, setSelectedBill] = useState(null); // Initially set to null
  const [bills, setBills] = useState([]);
  const { acc_number } = useParams();
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchBillByAccNum = async () => {
      const response = await fetch(
        `${backend}/biller/getBillbyAccNum/${acc_number}`
      );
      if (!response.ok) {
        return { err: "Failed No Response" };
      }

      const data = await response.json();
      setBills(data);
    };
    fetchBillByAccNum();
  }, [acc_number]);

  // Handle the selection of a bill for payment
  const handlePayCanvas = (billData) => {
    setSelectedBill(billData); // Set the selected bill data
    setPayCanvas(true); // Open the payment canvas
  };

  // Format date function
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "70vh", overflow: "visible" }}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                Bill Number
              </th>
              <th scope="col" className="text-center">
                Account Number
              </th>
              <th scope="col" className="text-center">
                Reading Date
              </th>
              <th scope="col" className="text-center">
                Due Date
              </th>
              <th scope="col" className="text-center">
                Consumption
              </th>
              <th scope="col" className="text-center">
                Amount
              </th>
              <th scope="col" className="text-center">
                Payment Status
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((data) => (
                <tr key={data.billNumber}>
                  <th className="text-center" style={{ fontSize: "15px" }}>
                    {data.billNumber}
                  </th>
                  <td className="text-center">{data.acc_num}</td>
                  <td className="text-center">
                    {formatDate(data.reading_date)}
                  </td>
                  <td className="text-center">{formatDate(data.due_date)}</td>
                  <td className="text-center">{data.consumption}</td>
                  <td className="text-center">{data.totalAmount}</td>
                  <td className="text-center">{data.payment_status}</td>
                  <td className="text-center">
                    <div className="dropdown">
                      <i
                        className="bi bi-three-dots-vertical"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        style={{ cursor: "pointer", fontSize: "15px" }}
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-end p-0">
                        <li>
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={handleShow}
                          >
                            <h5 className="d-flex gap-2 align-items-end">
                              <span>Adjustment</span>
                            </h5>
                          </a>
                        </li>
                        <li>
                          <Link
                            to={`/billing-details/${data.billNumber}`}
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            <h5 className="d-flex gap-2 align-items-end">
                              <span>Full Bill</span>
                            </h5>
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePayCanvas(data)} // Set bill data when Paybill is clicked
                          >
                            <h5 className="d-flex gap-2 align-items-end">
                              <span>Print Bill</span>
                            </h5>
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#paymentOffcanvas"
                            aria-controls="paymentOffcanvas"
                            onClick={() => handlePayCanvas(data)} // Ensure correct bill data is passed
                          >
                            <h5 className="d-flex gap-2 align-items-end">
                              <span>Paybill</span>
                            </h5>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-danger fw-bold">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="paymentOffcanvas"
        aria-labelledby="paymentOffcanvasLabel"
        data-bs-backdrop="static" // This prevents closing on clicking outside
        data-bs-keyboard="false" // This prevents closing with the keyboard (like ESC key)
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="paymentOffcanvasLabel">
            Payment Form
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {bill && ( // Only display if a bill is selected
            <form>
              <div className="row">
                <div className="col">
                  <div className="mb-3 mt-2">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Bill Number:
                    </span>{" "}
                    <span className="text-primary" style={{ fontSize: "15px" }}>
                      {bill.billNumber}
                    </span>
                  </div>
                  <div className="mb-3 mt-2">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Account Number:
                    </span>{" "}
                    <span className="text-primary" style={{ fontSize: "15px" }}>
                      {bill.acc_num}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Account Name:
                    </span>{" "}
                    <span className="text-primary" style={{ fontSize: "15px" }}>
                      {bill.accountName}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Due Date:
                    </span>{" "}
                    <span className="text-primary" style={{ fontSize: "15px" }}>
                      {bill.due_date}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Bill Status:
                    </span>{" "}
                    <span className="text-danger" style={{ fontSize: "15px" }}>
                      {bill.payment_status}
                    </span>
                  </div>
                  <div className="mb-5">
                    <span className="fw-bold" style={{ fontSize: "15px" }}>
                      Water Consuption:
                    </span>{" "}
                    <span className="text-danger" style={{ fontSize: "15px" }}>
                      {bill.consumption}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="penaltyCharge" className="form-label">
                      Penalty Charge
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="penaltyCharge"
                      placeholder="0.00"
                      value={bill.p_charge}
                      disabled
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">
                      Total Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="totalAmount"
                      placeholder="0.00"
                      value={bill.totalAmount}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="amountPaid" className="form-label">
                  Amount Paid
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amountPaid"
                  placeholder="Enter amount to pay"
                  // You can add value binding and onChange handler here
                />
              </div>

              <button type="submit" className="col-12 btn btn-primary">
                Submit Payment
              </button>
            </form>
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Bill Adjustment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="read_date" className="form-label">
                  Bill Number
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="read_date"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dueDate" className="form-label">
                  Account Number
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="due_date"
                  required
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label for="presentRead" className="form-label">
                  Current Consumption
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
                  Adjustment Consumption
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
              <hr />
              <div className="col-md-12 d-flex justify-content-center">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    style={{ height: "100px", width: "450px" }}
                  ></textarea>
                  <label for="floatingTextarea">Adjustment Reason</label>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default BillRecordTable;
