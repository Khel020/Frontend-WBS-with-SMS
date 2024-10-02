import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Add this line to import styles
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BillRecords = () => {
  const { accountName, acc_number } = useParams();
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  const [show, setShow] = useState(false);
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [adjustment, setAdjustment] = useState({
    _id: "",
    currentBill: "",
    amountPaid: "",
    reading_date: "",
    due_date: "",
    arrears: "",
    p_charge: "",
    prev_read: "",
    present_read: "",
    reason: "",
    adjustmentType: "",
    remarks: "",
  });

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
    console.log(data._id);

    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handlePrint = (row) => {
    // Implement print functionality
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare the data from the modal for submission
      const adjustmentData = {
        currentBill: adjustment.currentBill,
        arrears: adjustment.arrears,
        amountPaid: adjustment.amountPaid,
        p_charge: adjustment.p_charge,
        others: adjustment.others,
        prev_read: adjustment.prev_read,
        present_read: adjustment.present_read,
        remarks: adjustment.remarks,
        reading_date: adjustment.reading_date,
        due_date: adjustment.due_date,
      };

      // Send a PUT request to update the bill
      const response = await fetch(
        `${backend}/biller/adjustbill/${adjustment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
          body: JSON.stringify(adjustmentData),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success("Bill Adjusted Successfully", { autoClose: 1000 });
        console.log("AKSJHDGAHSDGH");
      } else {
        toast.error("Failed to adjust bill. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error adjusting bill:", error);
      toast.error("Error occurred while adjusting the bill", {
        autoClose: 2000,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#1F702C", // Consistent header background
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "transparent", // Inherits background from headRow
        color: "white",
        fontSize: "12px",
        padding: "10px", // Adjust padding for aesthetics
      },
    },
    rows: {
      style: {
        minHeight: "45px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
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
          <Modal.Header
            closeButton
            className="bg-primary text-white border-bottom"
          >
            <Modal.Title>Bill Adjustment</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <Row className="g-3">
              {/* Current Bill Amount */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    Current Bill Amount
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.currentBill}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        currentBill: e.target.value,
                      })
                    }
                    placeholder="Enter current bill amount"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Amount Paid */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Amount Paid</Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.amountPaid}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        amountPaid: e.target.value,
                      })
                    }
                    placeholder="Enter amount paid"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Reading Date */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Reading Date</Form.Label>
                  <DatePicker
                    selected={
                      adjustment.reading_date
                        ? new Date(adjustment.reading_date)
                        : null
                    }
                    onChange={(date) =>
                      setAdjustment({ ...adjustment, reading_date: date })
                    }
                    dateFormat="MMMM d, yyyy"
                    className="form-control border-primary"
                    placeholderText="Select reading date"
                    style={{ marginBottom: "15px" }} // Added margin for better spacing
                  />
                </Form.Group>
              </Col>

              {/* Due Date */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Due Date</Form.Label>
                  <DatePicker
                    selected={
                      adjustment.due_date ? new Date(adjustment.due_date) : null
                    }
                    onChange={(date) =>
                      setAdjustment({ ...adjustment, due_date: date })
                    }
                    dateFormat="MMMM d, yyyy"
                    className="form-control border-primary"
                    placeholderText="Select due date"
                    style={{ marginBottom: "15px" }} // Added margin for better spacing
                  />
                </Form.Group>
              </Col>

              {/* Arrears */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Arrears</Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.arrears}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        arrears: e.target.value,
                      })
                    }
                    placeholder="Enter arrears"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Penalty Charge */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Penalty Charge</Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.p_charge}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        p_charge: e.target.value,
                      })
                    }
                    placeholder="Enter penalty charge"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Previous Reading */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Previous Reading</Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.prev_read}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        prev_read: e.target.value,
                      })
                    }
                    placeholder="Enter previous reading"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Present Reading */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Present Reading</Form.Label>
                  <Form.Control
                    type="number"
                    value={adjustment.present_read}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        present_read: e.target.value,
                      })
                    }
                    placeholder="Enter present reading"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Reason for Adjustment */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Reason</Form.Label>
                  <Form.Control
                    type="text"
                    value={adjustment.reason}
                    onChange={(e) =>
                      setAdjustment({ ...adjustment, reason: e.target.value })
                    }
                    placeholder="Enter reason for adjustment"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>

              {/* Adjustment Type */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Adjustment Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={adjustment.adjustmentType}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        adjustmentType: e.target.value,
                      })
                    }
                    className="border-primary"
                  >
                    <option value="">Select Type</option>
                    <option value="Increase">Debit</option>
                    <option value="Decrease">Credit</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Remarks */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Remarks</Form.Label>
                  <Form.Control
                    type="text"
                    value={adjustment.remarks}
                    onChange={(e) =>
                      setAdjustment({
                        ...adjustment,
                        remarks: e.target.value,
                      })
                    }
                    placeholder="Enter remarks"
                    className="border-primary"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="success"
              onClick={handleSaveChanges}
              className="mt-3"
            >
              Save Changes
            </Button>
          </Modal.Body>
        </Modal>
      </main>
      <ToastContainer />
    </div>
  );
};

export default BillRecords;
