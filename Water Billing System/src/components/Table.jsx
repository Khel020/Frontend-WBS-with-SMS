// src/components/BillView.js
import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMediaQuery } from "react-responsive";

const BillView = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const billData = [
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    {
      accountName: "John Doe",
      accountNumber: "023-456",
      meterNumber: "00210021",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    // Add more bills as needed
  ];

  return (
    <Container className="mt-4">
      <h1 className="mb-4">View Your Bill</h1>

      {isMobile ? (
        // Mobile version (Cards)
        <div className="d-md-none">
          {billData.map((bill, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                <Card.Title>Account Summary</Card.Title>
                <Card.Text>
                  <strong>Account Name:</strong> {bill.accountName}
                </Card.Text>
                <Card.Text>
                  <strong>Account Number:</strong> {bill.accountNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Meter Number:</strong> {bill.meterNumber}
                </Card.Text>

                <Card.Title className="mt-3">Bill Details</Card.Title>
                <Card.Text>
                  <strong>Reading Date:</strong> {bill.readingDate}
                </Card.Text>
                <Card.Text>
                  <strong>Due Date:</strong> {bill.dueDate}
                </Card.Text>
                <Card.Text>
                  <strong>Amount Due:</strong> {bill.amountDue}
                </Card.Text>
                <Card.Text>
                  <strong>Payment Status:</strong> {bill.paymentStatus}
                </Card.Text>
                <Card.Text>
                  <strong>Payment Type:</strong> {bill.paymentType}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="text-center">
                  <Button variant="success" className="mb-2" block>
                    View Details
                  </Button>
                  <Button variant="primary" className="mb-2" block>
                    Print Bill
                  </Button>
                  <Button variant="info" block>
                    Pay Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop version (Table)

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Meter Number</th>
              <th>Reading Date</th>
              <th>Due Date</th>
              <th>Amount Due</th>
              <th>Payment Status</th>
              <th>Payment Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billData.map((bill, index) => (
              <tr key={index}>
                <td>{bill.accountName}</td>
                <td>{bill.accountNumber}</td>
                <td>{bill.meterNumber}</td>
                <td>{bill.readingDate}</td>
                <td>{bill.dueDate}</td>
                <td>{bill.amountDue}</td>
                <td>{bill.paymentStatus}</td>
                <td>{bill.paymentType}</td>
                <td>
                  <Button variant="success" size="sm">
                    <i className="bi bi-eye-fill"></i> View
                  </Button>
                  <Button variant="primary" size="sm" className="ms-1">
                    <i className="bi bi-printer"></i> Print
                  </Button>
                  <Button variant="info" size="sm" className="ms-1">
                    <i className="bi bi-currency-dollar"></i> Pay
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BillView;
