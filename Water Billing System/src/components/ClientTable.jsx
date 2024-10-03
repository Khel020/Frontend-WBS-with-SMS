import React from "react";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import {
  AiFillFileText,
  AiFillDollarCircle,
  AiOutlineFileAdd,
} from "react-icons/ai"; // Ant Design Icons
import DataTable, { defaultThemes } from "react-data-table-component";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/clientTBL.css";
import { useReactToPrint } from "react-to-print";
import ReceiptComponent from "./receipt"; // Import the receipt component

const Table = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowAddBill(false);
  };
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleShow = () => setShow(true);
  //TODO: GET ALL Consumers
  const backend = import.meta.env.VITE_BACKEND;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [search, setSearch] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [account, setAccounts] = useState("");
  const [billNo, setBillNo] = useState("");
  const [arrears, setArrears] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [penaltyCharge, setTotalPenalty] = useState("");
  const [balance, setTotalBalance] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [tendered, setTendered] = useState("");
  const [p_date, setPdate] = useState(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });

  const [address, setAddress] = useState("");
  const [totalChange, setTotalChange] = useState("");
  const [advTotalAmount, setAdvance] = useState("");
  const [details, setDetails] = useState({});
  //TODO: Filtered data based on search input
  const [clients, setClients] = useState([]);
  const [showAddBill, setShowAddBill] = useState(false);
  const [prev_reading, setPreviousReading] = useState(0);
  const [billData, setBillData] = useState({
    acc_num: "",
    accountName: "",
    reading_date: "",
    category: "",
  });
  const [newBill, setNewBill] = useState({
    acc_num: "",
    accountName: "",
    reading_date: "",
    present_read: 0,
    category: "",
    others: "",
    remarks: "",
  });
  const handleCloseBill = () => setShowAddBill(false);
  const handleShowAddBill = async (data) => {
    const response = await fetch(
      `${backend}/biller/latestBill/${data.acc_num}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      }
    );

    const latestBill = await response.json();
    console.log("data", latestBill); // Check the full structure
    console.log("latestBill.prev_reading", latestBill.prev_reading);

    if (
      (latestBill && latestBill.latestBill) ||
      (latestBill && latestBill.prev_reading)
    ) {
      const billData = latestBill.latestBill; // Access the nested latestBill

      setPreviousReading(latestBill.prev_reading || 0); // Set default value
      setBillData({
        ...billData,
        acc_num: data.acc_num || "", // Default to empty string
        accountName: data.accountName || "",
        category: data.client_type || "",
      });
    } else {
      setPreviousReading(0);
      setBillData({
        acc_num: data.acc_num || "", // Default to empty string
        accountName: data.accountName || "",
        category: data.client_type || "",
      });
    }

    setShowAddBill(true);
  };

  const handleChangePresentReading = (e) => {
    const presentRead = e.target.value; // Convert to float and default to 0
    const calculatedConsumption = presentRead - prev_reading; // Use the current value of prev_reading

    setNewBill({
      ...newBill,
      present_read: presentRead,
      consumption: calculatedConsumption >= 0 ? calculatedConsumption : 0, // Ensure consumption is not negative
    });
  };

  const filteredClients = clients.filter((client) => {
    let matchesSearch = client.accountName
      .toLowerCase()
      .includes(search.toLowerCase());

    switch (selectedFilter) {
      case "withBalances":
        return matchesSearch && client.totalBalance > 0;
      case "active":
        return matchesSearch && client.status === "Active";
      case "inactive":
        return matchesSearch && client.status === "Inactive";
      case "pending":
        return matchesSearch && client.status === "Pending";
      default:
        return matchesSearch; // No filter, show all clients
    }
  });

  //TODO: FETCH DATA IF HAS ACC NUM
  const fetchData = async () => {
    // Ensure either acc_num or acc_name is provided
    if (account) {
      console.log("ACCOUNT", account);
      try {
        // Make the fetch request
        const response = await fetch(
          `${backend}/biller/findBillPay/${account}`, // Use query params for dynamic search
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
          }
        );

        // Handle non-OK response status
        if (!response.ok) {
          const identifier = account; // Use whichever one was provided
          toast.warn(`Account ${identifier} not found.`);
          return; // Exit if the response is not OK
        }

        // Parse the response JSON
        const data = await response.json();
        if (data.totalBalance < 0 || data.status === "Paid") {
          toast.warn("The account has been successfully settled.", {
            autoClose: 1000,
          });
          setAccName(data.consumerName);
          setAccNum(data.accountNum);
        } else {
          setBillNo(data.billNo);
          setAccName(data.consumerName);
          setAccNum(data.accountNum);
          setAddress(data.address);
          setTotalPenalty(data.totalPenalty);
          setArrears(data.arrears);
          setAmountPaid(data.amountPaid);
          setBillAmount(data.billAmount);
          setTotalBalance(
            data.totalAmountDue && data.totalBalance
              ? parseFloat(data.totalAmountDue) + parseFloat(data.totalPenalty)
              : data.totalAmountDue
          );
        }

        if (data.error) {
          toast.danger(data.error, {
            autoClose: 1000, // Auto close after 1 second
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAccName("");
        setAddress(""); // Ensure address is cleared
        setTotalBalance("0");
        setTotalPenalty("0"); // Ensure totalPenalty is cleared
        toast.warn("Error: No Bills Found");
      }
    } else {
      // Warn the user if neither account number nor account name is provided
      toast.warn("Please provide either Account Number or Account Name.");
    }
  };

  useEffect(() => {
    CalculateChange(tendered);
  }, [tendered, advTotalAmount]);

  const handlePaymentAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    console.log("Setting payment amount to:", amount);
    setTendered(amount);
    CalculateChange(amount); // Pass the latest amount directly
  };
  const handleAdvancePaymentChange = (e) => {
    const advancePayment = parseFloat(e.target.value);
    setAdvance(advancePayment);
    CalculateChange(tendered); // Recalculate change with the updated advance payment
  };
  const CalculateChange = async (amount) => {
    if (amount) {
      try {
        // Prepare the payload for the request
        const payload = {
          acc_num: acc_num,
          tendered: amount,
        };

        console.log("Data to calculate change:", payload);

        // Make the API call to calculate the change
        const response = await fetch(`${backend}/biller/calculateChange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Failed to calculate change");
        } else {
          const data = await response.json();

          // Calculate the final change after deducting advance payment
          const rawChange = parseFloat(data.change || 0);
          console.log("Change before advance payment:", rawChange);

          const advancePayment = parseFloat(advTotalAmount) || 0; // Handle potential NaN value
          const finalChange = Math.max(rawChange - advancePayment, 0); // Ensure non-negative change

          console.log("Advance payment:", advancePayment);
          console.log("Final change:", finalChange);

          // Log the final change and set it in the state
          setTotalChange(finalChange);
        }
      } catch (error) {
        console.error("Error calculating change:", error);
      }
    }
  };

  //TODO: FETCH ALL CLIENT
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

  //FIXME: FOR PAYMENT
  const handleSubmitPay = async (e) => {
    e.preventDefault();

    // If no valid tendered amount or balance
    if (!tendered || isNaN(tendered) || tendered <= 0) {
      toast.warn("Please enter a valid payment amount.");
      return;
    }

    // If no outstanding balance
    if (balance <= 0) {
      toast.warn("No outstanding balance.");
      return;
    }

    // Combine tendered amount and amountPaid if there's an advance payment
    const totalTendered = parseFloat(
      (parseFloat(amountPaid) || 0) + (parseFloat(tendered) || 0)
    ).toFixed(2);

    // Create the payment object
    const newPayment = {
      billNo,
      acc_num,
      acc_name,
      p_date: new Date(p_date), // Convert string to Date object
      arrears,
      address,
      balance,
      tendered: totalTendered, // Use the combined amount here
      advTotalAmount,
      totalChange,
    };

    console.log("newPayment", newPayment);

    try {
      const response = await fetch(`${backend}/biller/newPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify(newPayment),
      });

      const result = await response.json();

      if (result.success) {
        const paymentData = result.data[0]; // Assuming the first object is what you need

        // Set the payment details to state
        setDetails({
          acc_number: paymentData.paymentResult.acc_num || "N/A",
          name: paymentData.paymentResult.accountName || "N/A",
          balance: paymentData.paymentResult.balance || "0",
          address: paymentData.paymentResult.address || "0",
          amountpaid: totalTendered, // Use totalTendered here for display
          paymentDate: p_date,
          change: totalChange || "0",
          OR_NUM: paymentData.OR_NUM,
        });

        setAccNum(paymentData.acc_num || "0");
        setAccName(paymentData.accountName || " ");
        setTotalPenalty(paymentData.paid || "0");
        setTotalBalance(paymentData.balance || "0");
        setTendered(paymentData.change || "0");
        setPdate(new Date().toLocaleDateString());

        toast.success(result.message || "Payment successful", {
          autoClose: 1000, // Auto close after 1 second
        });

        // Trigger print after 1 second delay
        setTimeout(() => {
          handlePrint();
        }, 1000);
      } else {
        toast.error(result.message || "Payment failed");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Request failed");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const bill = [
      {
        acc_num: billData.acc_num,
        accountName: billData.accountName,
        reading_date: newBill.reading_date,
        present_read: newBill.present_read,
        category: billData.category,
        others: newBill.others,
        remarks: newBill.remarks,
      },
    ];
    console.log("BILL", bill);
    const response = await fetch(`${backend}/biller/addbill/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
      body: JSON.stringify(bill),
    });
    const result = await response.json();

    if (result.success) {
      toast.success(result.message || "Bill successful save", {
        autoClose: 1000, // Auto close after 1 second
      });
      setTimeout(() => {
        handleClose(true);
      }, 1000);
    }
  };

  const onChange = async (e) => {
    setAccounts(e.target.value);
  };
  if (!clients) {
    return (
      <div className="text-danger">
        <span>No Record found</span>
      </div>
    );
  }
  const columns = [
    {
      name: "Acc No.",
      selector: (row) => row.acc_num,
      sortable: true,
      width: "130px", // Adjust width as needed
    },
    {
      name: "Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge  border mx-2  rounded-pill ${
                row.status === "Active"
                  ? "bg-success-subtle border-success-subtle text-success-emphasis "
                  : row.status === "Inactive"
                  ? "bg-danger-subtle border-danger-subtle text-danger-emphasis "
                  : row.status === "Pending"
                  ? "bg-warning-subtle border-warning-subtle text-warning-emphasis "
                  : "bg-secondary"
              }`}
            >
              {row.status}
            </span>
          )}
          <span>{row.accountName}</span>
        </div>
      ),
      sortable: true,
      width: "250px", // Adjust width as needed
    },

    {
      name: "Type",
      selector: (row) => row.client_type,
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Address",
      selector: (row) => row.c_address,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => `₱${parseFloat(row.totalBalance || 0).toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Link to={`/billing-records/${row.acc_num}/${row.accountName}`}>
            <button className="btn btn-outline-primary btn-sm">
              <AiFillFileText style={{ fontSize: "20px" }} />
            </button>
          </Link>

          <button
            className="btn btn-outline-success btn-sm ms-2"
            onClick={() => handleShowAddBill(row)}
          >
            <AiOutlineFileAdd style={{ fontSize: "20px" }} />
          </button>

          <button
            className="btn btn-outline-warning btn-sm ms-2"
            onClick={() => handleDeposit(row)}
          >
            <AiFillDollarCircle style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
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
    <div>
      <div className="row">
        {/* Search Input */}
        <div className="mb-3 col-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{
              border: "1px solid #ced4da", // Default border color
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#61b390")} // Highlight color on focus
            onBlur={(e) => (e.target.style.borderColor = "#ced4da")} // Revert color on blur
          />
        </div>

        {/* Filter Dropdown */}
        <div className="mb-3 col-3">
          <select
            className="form-select"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">All Clients</option>
            <option value="withBalances">With Balances</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Proceed to Payment Button */}
        <div className="col justify-content-end mb-2 text-end">
          <button
            className="btn btn-success justify-content-end mx-3"
            onClick={handleShow}
            type="button"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      <DataTable
        customStyles={customStyles}
        pagination
        fixedHeaderScrollHeight="400px"
        columns={columns}
        data={filteredClients}
        responsive
        fixedHeader
        highlightOnHover
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#1F316F" }}>
          <Modal.Title className="text-white">
            Let's Settle Your Bill
          </Modal.Title>
          <style>
            {`
        .modal-header .btn-close {
          color: white !important; /* Ensure the close button is white */
        }
      `}
          </style>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-md-8">
              <Form.Label>Search Account:</Form.Label>
              <div className="d-flex position-relative">
                <Form.Control
                  type="text"
                  name="account"
                  placeholder="Account Number or Name"
                  value={account}
                  onChange={onChange}
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderColor: "#ced4da",
                  }}
                />
                <Button
                  variant="primary"
                  onClick={fetchData}
                  className="ms-2"
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Search
                </Button>
              </div>

              <div
                style={{
                  display: account ? "block" : "none", // Show suggestions only if there's input
                  position: "absolute",
                  minWidth: "225px",
                  maxHeight: "200px", // Limit height for scroll
                  overflowY: "auto", // Scroll if suggestions exceed height
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  zIndex: "1",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginTop: "5px", // Add space between input and suggestions
                }}
              >
                {clients
                  .filter(
                    (name) =>
                      name.accountName
                        .toLowerCase()
                        .includes(account.toLowerCase()) && // Use includes for flexible search
                      name.accountName !== account
                  )
                  .slice(0, 5)
                  .map((name) => (
                    <div
                      key={name._id}
                      onClick={() => setAccounts(name.accountName)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ADD8E6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      {name.accountName}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col">
              <Form.Label className="fw-bold">Account Number:</Form.Label>
              <Form.Control
                type="text"
                value={acc_num}
                placeholder="Account Number"
                disabled
                style={{ color: "#333", width: "100%" }} // Removed fontWeight
              />
            </div>
            <div className="col">
              <Form.Label className="fw-bold">Account Name:</Form.Label>
              <Form.Control
                type="text"
                value={acc_name}
                placeholder="Account Name"
                disabled
                style={{ color: "#333", width: "100%" }} // Removed fontWeight
              />
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-6 mb-1">
              <Form.Label className="fw-bold">Arrears:</Form.Label>
              <div className="input-group">
                <span className="input-group-text">₱</span>
                <Form.Control
                  type="number"
                  value={arrears}
                  placeholder="0.00"
                  onChange={(e) => setArrears(e.target.value)}
                  style={{ color: "#333" }} // Removed fontWeight
                  disabled
                />
              </div>
            </div>
            <div className="col-6">
              <Form.Label className="fw-bold">Current Amount:</Form.Label>
              <div className="input-group">
                <span className="input-group-text">₱</span>
                <Form.Control
                  type="number"
                  value={billAmount}
                  placeholder="0.00"
                  onChange={(e) => setBillAmount(e.target.value)}
                  style={{ color: "#333" }} // Removed fontWeight
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Label className="fw-bold">Penalty Charge:</Form.Label>
              <div className="input-group">
                <span className="input-group-text">₱</span>
                <Form.Control
                  type="number"
                  value={penaltyCharge}
                  placeholder="0.00"
                  disabled
                  style={{ color: "#333" }} // Removed fontWeight
                />
              </div>
            </div>
            <div className="col">
              <Form.Label className="fw-bold"> Total Balance:</Form.Label>
              <div className="input-group">
                <span className="input-group-text">₱</span>
                <Form.Control
                  type="number"
                  value={balance}
                  placeholder="0.00"
                  disabled
                  style={{ color: "#333" }} // Removed fontWeight
                />
              </div>
            </div>
          </div>
          <hr />
          {/* New Arrears Field */}

          <div className="row">
            <div className="col">
              <Form.Group controlId="amount">
                <Form.Label className="fw-bold">Amount to Pay:</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    step="0.01"
                    value={tendered}
                    onChange={handlePaymentAmountChange}
                    style={{ color: "#333" }} // Removed fontWeight
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentDate">
                <Form.Label className="fw-bold">Payment Date:</Form.Label>
                <Form.Control
                  type="datetime-local" // Changed to datetime-local
                  value={p_date}
                  onChange={(e) => setPdate(e.target.value)}
                  style={{ width: "100%" }}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <Form.Group controlId="advancePayment">
                <Form.Label className="fw-bold">
                  Advance Payment (Optional):
                </Form.Label>
                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={advTotalAmount}
                    onChange={handleAdvancePaymentChange}
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="totalChange">
                <Form.Label className="fw-bold">Total Change:</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <Form.Control
                    type="number"
                    disabled
                    value={totalChange}
                    placeholder="0.00"
                  />
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleSubmitPay}
            className="col-12"
          >
            Proceed to payment <i className="bi bi-arrow-right"></i>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddBill} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1F316F" }}>
          <Modal.Title
            style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}
          >
            Add New Bill
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body style={{ padding: "2rem" }}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formAccNum">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Account Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={billData.acc_num}
                    disabled
                    placeholder="Account Number"
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAccountName">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Account Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={billData.accountName}
                    disabled
                    placeholder="Account Name"
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPreviousRead">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Previous Reading
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={prev_reading || 0}
                    disabled
                    placeholder="Previous Reading"
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPresentRead">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Present Reading
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={newBill.present_read}
                    onChange={handleChangePresentReading}
                    placeholder="Enter present reading"
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formReadingDate">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Reading Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={newBill.reading_date}
                    onChange={(e) =>
                      setNewBill({ ...newBill, reading_date: e.target.value })
                    }
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formConsumption">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Consumption
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={newBill.consumption}
                    disabled
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Category
                  </Form.Label>
                  <Form.Control
                    value={billData.category}
                    onChange={(e) =>
                      setBillData({ ...billData, category: e.target.value })
                    }
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formOthers">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Others (Optional)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={newBill.others}
                    onChange={(e) =>
                      setNewBill({ ...newBill, others: e.target.value })
                    }
                    placeholder="Other details"
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "normal",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formRemarks" className="mb-4">
              <Form.Label style={{ fontWeight: "bold" }}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={billData.remarks}
                onChange={(e) =>
                  setBillData({ ...billData, remarks: e.target.value })
                }
                placeholder="Enter remarks"
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.25rem",
                  fontWeight: "normal",
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ padding: "1.5rem" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ fontWeight: "500" }}
              className="col-12"
            >
              Add Bill
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div style={{ display: "none" }}>
        <ReceiptComponent ref={componentRef} details={details} />
      </div>
    </div>
  );
};

export default Table;
