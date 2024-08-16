import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const BillRecordTable = () => {
  const [message, setMessage] = useState(false);
  const handleClose1 = () => setMessage(false);
  const handleShow1 = () => setMessage(true);
  const [bills, setBills] = useState([]);
  const { acc_number } = useParams();
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");

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
                        <Link
                          to="paybill"
                          className="bi bi-cash-coin"
                          style={{
                            fontSize: "25px",
                            cursor: "pointer",
                            color: "#19A903",
                            marginRight: "10px",
                            marginTop: "3px",
                          }}
                        ></Link>
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
    </div>
  );
};

export default BillRecordTable;
