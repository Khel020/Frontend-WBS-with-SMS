import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Add this line to import styles

const BillRecords = () => {
  const { accountName } = useParams();
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  const [show, setShow] = useState(false);
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [currentBill, setCurrentBill] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [arrears, setArrears] = useState("");
  const [pCharge, setPCharge] = useState("");
  const [remarks, setRemarks] = useState("");
  const [others, setOthers] = useState("");
  const [adjustment, setAdjustment] = useState({
    currentBill: "",
    amountPaid: "",
    arrears: "",
    p_charge: "",
    remarks: "",
    others: "",
  });
  const [startDate, setStartDate] = useState(null);
  const { acc_number } = useParams();

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
      setFilteredBills(data); // Initialize filteredBills with fetched data
    };
    fetchBillByAccNum();
  }, [acc_number, backend]);

  useEffect(() => {
    const filterBills = () => {
      let filtered = bills;

      // Filter by month
      if (startDate) {
        const startMonth = new Date(startDate).getMonth();
        const startYear = new Date(startDate).getFullYear();
        filtered = filtered.filter((bill) => {
          const billDate = new Date(bill.reading_date);
          return (
            billDate.getMonth() === startMonth &&
            billDate.getFullYear() === startYear
          );
        });
      }

      setFilteredBills(filtered);
    };

    filterBills();
  }, [bills, startDate]);

  const handleShow = (data) => {
    setAdjustment({ ...data });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSaveChanges = () => {
    handleSave({
      currentBill,
      amountPaid,
      arrears,
      pCharge,
      remarks,
      others,
    });
    handleClose();
  };

  const handlePrint = (row) => {
    // Implement print functionality
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const columns = [
    {
      name: "Bill No.",
      selector: (row) => row.billNumber,
      sortable: true,
      width: "100px", // Adjust width as needed
    },
    {
      name: "Reading Date",
      selector: (row) => formatDate(row.reading_date),
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Due Date",
      selector: (row) => formatDate(row.due_date),
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Consumption",
      selector: (row) => `${row.consumption} m³`, // Append 'm³' for cubic meters
      // Optional: Add formatting or styling if needed
    },
    {
      name: "Amount",
      selector: (row) => `₱${row.currentBill.toFixed(2)}`, // Format amount with peso sign and two decimal places
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => `₱${row.amountPaid.toFixed(2)}`, // Format amount with peso sign and two decimal places
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.payment_status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", padding: "8px" }}>
          <i
            className="bi bi-pencil-square"
            style={{
              fontSize: "22px",
              color: "#555", // Subtle business-like color
              cursor: "pointer",
              transition: "color 0.2s ease-in-out",
              marginRight: "10px", // Space between icons
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")} // Subtle hover effect
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")} // Restore color on hover out
            title="Adjustment" // Tooltip
            onClick={() => handleShow(row)}
          ></i>
          <i
            className="bi bi-printer"
            style={{
              fontSize: "22px",
              color: "#555", // Subtle business-like color
              cursor: "pointer",
              transition: "color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")} // Subtle hover effect
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")} // Restore color on hover out
            title="Print" // Tooltip
            onClick={() => handlePrint(row)} // Function to handle print action
          ></i>
        </div>
      ),
      width: "100px", // Adjust width as needed
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd", // Border around the entire table
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#61b390",
        color: "dark",
        fontSize: "10px",
      },
    },
    rows: {
      style: {
        minHeight: "45px", // override the row height
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      },
    },

    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: defaultThemes.default.text.primary,
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "0px 5px",
        cursor: "pointer",
        transition: "0.4s",
        color: defaultThemes.default.text.primary,
        fill: defaultThemes.default.text.primary,
        backgroundColor: "#fff",
        "&:hover:not(:disabled)": {
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
      },
    },
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
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">{accountName} Billing Record</h1>
        </div>
        <div className="row mb-3">
          <div className="col mx-1">
            <Form.Group>
              <Form.Label className="fw-bold mx-2">Select Month</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="form-control"
              />
            </Form.Group>
          </div>
          <div className="col text-end">
            <Link to={`/receive-payments/${acc_number}/${accountName}`}>
              <button className="btn btn-primary">Receive Payments</button>
            </Link>
          </div>
        </div>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={filteredBills} // Use filtered data
          responsive
          highlightOnHover
          noDataComponent={
            <div className="text-danger">
              <span>No Record found</span>
            </div>
          }
        />
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className="bg-light border-bottom">
            <Modal.Title>Adjust Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">
                      Current Bill Amount
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={adjustment.currentBill}
                      onChange={(e) => setCurrentBill(e.target.value)}
                      placeholder="Current Bill Amount"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Amount Paid</Form.Label>
                    <Form.Control
                      type="number"
                      value={adjustment.amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      placeholder="Amount Paid"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Arrears</Form.Label>
                    <Form.Control
                      type="number"
                      value={adjustment.arrears}
                      onChange={(e) => setArrears(e.target.value)}
                      placeholder="Arrears"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Penalty Charge</Form.Label>
                    <Form.Control
                      type="number"
                      value={adjustment.p_charge}
                      onChange={(e) => setPCharge(e.target.value)}
                      placeholder="Penalty Charge"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Remarks"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Other Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                      placeholder="Additional Details"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top">
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default BillRecords;
