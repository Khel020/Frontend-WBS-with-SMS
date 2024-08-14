import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const BillRecordTable = () => {
  const bills = [
    {
      id: 12,
      ReadingDate: " 05/09/2024",
      DueDate: "06/25/2024",
      Consumption: "20cm3",
      Amount: "732.00",
      DisconnectionDate: "06/30/2024",
    },
    {
      id: 13,
      ReadingDate: "06/27/2024",
      DueDate: "07/25/2024",
      Consumption: "25cm3",
      Amount: "800.00",
      DisconnectionDate: "07/30/2024",
    },
    {
      id: 14,
      ReadingDate: "07/28/2024",
      DueDate: "08/24/2024",
      Consumption: "26cm3",
      Amount: "732.00",
      DisconnectionDate: "08/29/2024",
    },
    {
      id: 15,
      ReadingDate: "01/10/2024",
      DueDate: "01/15/2024",
      Consumption: "30cm2",
      Amount: "810.00",
      DisconnectionDate: "01/20/2024",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
    {
      id: 16,
      ReadingDate: "12/01/2023",
      DueDate: "12/01/2023",
      Consumption: "35cm2",
      Amount: "900.00",
      DisconnectionDate: "12/06/2023",
    },
  ];

  const [message, setMessage] = useState(false);

  const handleClose1 = () => setMessage(false);
  const handleShow1 = () => setMessage(true);

  return (
    <div>
      <div
        class="table-responsive"
        style={{ maxHeight: "70vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                ID
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
                Disconnection Date
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((data) => {
              return (
                <tr>
                  <th className="text-center">{data.id}</th>
                  <td className="text-center">{data.ReadingDate}</td>
                  <td className="text-center">{data.DueDate}</td>
                  <td className="text-center">{data.Consumption}</td>
                  <td className="text-center">{data.Amount}</td>
                  <td className="text-center">{data.DisconnectionDate}</td>
                  <td className="text-center">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <i
                        class="bi bi-eye-fill"
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "#04BABA",
                          marginRight: "10px",
                        }}
                      ></i>
                      <i
                        class="bi bi-printer"
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "#C57219",
                          marginRight: "10px",
                        }}
                      ></i>
                      <i
                        class="bi bi-chat-left-text-fill"
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
                        class="bi bi-cash-coin"
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
            })}
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
                class="form-select mb-3"
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
                  class="form-control"
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
