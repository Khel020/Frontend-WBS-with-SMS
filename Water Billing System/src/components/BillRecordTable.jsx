import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const BillRecordTable = () => {
  const [message, setMessage] = useState(false);
  const handleClose1 = () => setMessage(false);
  const handleShow1 = () => setMessage(true);
  const [payment, setpayment] = useState(false);
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
      console.log(data);
      setBills(data);
    };
    fetchBillByAccNum();
  }, [acc_number]);

  const handlePayment = (data) => {
    setpayment({ ...data });
  };
  const submitpayment = () => {};
  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "70vh", overflow: "auto" }}
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
              bills.map((data) => {
                return (
                  <tr key={data.billNumber}>
                    <th className="text-center">{data.billNumber}</th>
                    <td className="text-center">{data.acc_num}</td>
                    <td className="text-center">
                      {new Date(data.reading_date).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(data.due_date).toLocaleDateString()}
                    </td>
                    <td className="text-center">{data.consumption}</td>
                    <td className="text-center">Amount</td>
                    <td className="text-center">{data.payment_status}</td>
                    <td className="text-center">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link
                          to="billing-details"
                          className="bi bi-eye-fill"
                          style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#04BABA",
                            marginRight: "10px",
                          }}
                        ></Link>
                        <i
                          className="bi bi-printer"
                          style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#C57219",
                            marginRight: "10px",
                          }}
                        ></i>
                        <i
                          className="bi bi-chat-left-text-fill"
                          onClick={handleShow1}
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#3E38FC",
                            marginRight: "10px",
                            marginTop: "3px",
                          }}
                        ></i>
                        <i
                          className="bi bi-cash-coin"
                          onClick={() => handlePayment(data)}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#paymentOffcanvas"
                          aria-controls="paymentOffcanvas"
                          style={{
                            fontSize: "25px",
                            cursor: "pointer",
                            color: "#19A903",
                            marginRight: "10px",
                            marginTop: "3px",
                          }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })
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
          <form onSubmit={submitpayment}>
            <div className="row">
              <div className="col">
                <div className="mb-3 mt-2">
                  <span className="fw-bold" style={{ fontSize: "15px" }}>
                    Account Number:
                  </span>{" "}
                  <span className="text-primary" style={{ fontSize: "15px" }}>
                    {payment.acc_num}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="fw-bold" style={{ fontSize: "15px" }}>
                    Account Name:
                  </span>{" "}
                  <span className="text-primary" style={{ fontSize: "15px" }}>
                    {payment.accountName}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="fw-bold" style={{ fontSize: "15px" }}>
                    Duedate:
                  </span>{" "}
                  <span className="text-primary" style={{ fontSize: "15px" }}>
                    {payment.due_date}
                  </span>
                </div>
                <div className="mb-5">
                  <span className="fw-bold" style={{ fontSize: "15px" }}>
                    Payment Status:
                  </span>{" "}
                  <span className="text-danger" style={{ fontSize: "15px" }}>
                    {payment.payment_status}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">
                    Penalty Charge
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="0.00"
                    disabled
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="0.00"
                    value={payment.amount}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="mb-5">
                <label htmlFor="cvv" className="form-label">
                  Total Amount
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="cvv"
                    placeholder="0.00"
                    min={0}
                  />
                  <button className="btn btn-primary" type="button">
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary col-12">
              Submit Payment
            </button>
          </form>
        </div>
      </div>

      <Modal
        show={message}
        onHide={handleClose1}
        animation={true}
        style={{ backgroundColor: "#393e46;" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-3">
            <Form className="login-form ">
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Enter Username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  size="md"
                  type="password"
                  placeholder="Enter Password"
                />
              </Form.Group>
              <label htmlFor="">Type of Notice</label>
              <select
                className="form-select mb-3"
                aria-label="Disabled select example"
              >
                <option value="1">New Bill Notice</option>
                <option value="2">Overdue Notice</option>
                <option value="3">Due Date Alert</option>
                <option value="3">Birthday Greeting</option>
              </select>
              <Form.Group className="mb-3" controlId="accountNo">
                <Form.Label>Message</Form.Label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default BillRecordTable;
