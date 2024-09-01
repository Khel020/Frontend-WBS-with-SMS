import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/clientTBL.css";

const Table = () => {
  //State for storing data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //TODO: GET ALL Consumers
  const backend = import.meta.env.VITE_BACKEND;

  const [search, setSearch] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");

  const [penaltyCharge, setTotalPenalty] = useState("");
  const [balance, setTotalBalance] = useState("");
  const [paymentAmount, setPayment] = useState("");
  const [p_date, setPdate] = useState("");
  const [address, setAddress] = useState("");
  const [totalChange, setTotalChange] = useState("");
  const [advTotalAmount, setAdvance] = useState("");

  //TODO: Filtered data based on search input
  const [clients, setClients] = useState([]);
  const filteredClients = clients.filter((client) => {
    return (
      client.acc_num.toLowerCase().includes(search.toLowerCase()) ||
      client.accountName.toLowerCase().includes(search.toLowerCase()) ||
      client.client_type.toLowerCase().includes(search.toLowerCase()) ||
      (
        client.c_address.house_num +
        ", Purok " +
        client.c_address.purok +
        ", " +
        client.c_address.brgy
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  //TODO: FETCH DATA IF HAS ACC NUM
  const fetchData = async () => {
    if (acc_num) {
      try {
        const response = await fetch(
          `${backend}/biller/findBillPay/${acc_num}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
          }
        );
        if (!response.ok) {
          toast.warn(`Account number ${acc_num} Not found`);
        }
        const data = await response.json();
        setAccName(data.consumerName);
        setAddress(data.address);
        setTotalPenalty(data.totalPenalty);
        setTotalBalance(data.totalAmountDue);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAccName("");
        setAddress(""); // Ensure address is cleared
        setBills([]);
        setTotalBalance("0");
        setTotalPenalty("0"); // Ensure totalPenalty is cleared
        toast.warn("Error No Bills Found");
      }
    }
  };

  useEffect(() => {
    CalculateChange(paymentAmount);
  }, [paymentAmount, advTotalAmount]);

  const handlePaymentAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    console.log("Setting payment amount to:", amount);
    setPayment(amount);
    CalculateChange(amount); // Pass the latest amount directly
  };
  const handleAdvancePaymentChange = (e) => {
    const advancePayment = parseFloat(e.target.value);
    setAdvance(advancePayment);
    CalculateChange(paymentAmount); // Recalculate change with the updated advance payment
  };
  const CalculateChange = async (amount) => {
    if (amount) {
      try {
        // Prepare the payload for the request
        const payload = {
          acc_num: acc_num,
          paymentAmount: amount,
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

    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.warn("Please enter a valid payment amount.");
      return;
    }
    const newPayment = {
      acc_num,
      acc_name,
      p_date,
      address,
      balance, // balance
      paymentAmount, //tendered
      advTotalAmount, //for advance payment
      totalChange, // change
    };
    console.log("Data for payments", newPayment);
    const response = await fetch(`${backend}/biller/newPayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
      body: JSON.stringify(newPayment),
    })
      .then((response) => response.json()) // Parse JSON from response
      .then((result) => {
        // Access success property to determine the response flow
        if (result.success) {
          // Extract data from the first element of the data array
          const paymentData = result.data[0]; // Assuming the first object is what you need

          setAccNum(paymentData.acc_num || "0");
          setAccName(paymentData.accountName || " ");
          setTotalPenalty(paymentData.paid || "0"); // Example mapping
          setTotalBalance(paymentData.balance || "0");
          setPayment(paymentData.change || "0"); // Example mapping
          setPdate(new Date().toLocaleDateString()); // Setting a date example

          // Show success toast
          toast.success(result.message || "Payment successful");
        } else {
          // If response.success is false, show an error toast
          toast.error(result.message || "Payment failed");
        }
      })
      .catch((error) => {
        // Handle any fetch-related errors
        console.error("Request failed:", error);
        toast.error("Request failed");
      });
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
      selector: (row) =>
        row.c_address.house_num +
        ", Purok " +
        row.c_address.purok +
        ", " +
        row.c_address.brgy,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => (row.totalBalance ? row.totalBalance : "0.00"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/billing-records/${row.acc_num}/${row.accountName}`}>
            <button className="btn btn-info btn-sm">
              <span>View Bills</span>
            </button>
          </Link>
        </div>
      ),

      sortable: true,
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
    <div>
      <div className="container-fluid">
        <div className="row">
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
          <div className="col d-flex justify-content-end mb-2">
            <button
              className="btn btn-success btn-sm mx-3"
              onClick={handleShow}
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={filteredClients}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>Loading</div>}
        />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quick Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Account Lookup:</h5>
          <div className="row mt-4">
            <div className="col">
              <Form.Label>Account Number:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="acc_num"
                  placeholder="Enter Account Number"
                  value={acc_num}
                  onChange={(e) => setAccNum(e.target.value)}
                />
                <Button variant="primary" onClick={fetchData} className="ms-2">
                  Search
                </Button>
              </div>
            </div>
            <div className="col">
              <Form.Label>Account Name:</Form.Label>
              <Form.Control
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={acc_name}
                disabled
              />
            </div>
          </div>
          <hr />
          <h5>Bill Information:</h5>
          <div className="row mt-4">
            <div className="col">
              <Form.Label>Penalty Charge:</Form.Label>
              <Form.Control
                type="number"
                value={penaltyCharge}
                placeholder="0.00"
                disabled
              />
            </div>
            <div className="col-6">
              <Form.Label>Total Balance:</Form.Label>
              <Form.Control
                type="number"
                value={balance}
                placeholder="0.00"
                disabled
              />
            </div>
          </div>
          <hr />
          <h5>Payment Details:</h5>
          <div className="row">
            <div className="col">
              <Form.Group controlId="amount">
                <Form.Label>Amount to Pay:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  step="0.01"
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentDate">
                <Form.Label>Payment Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={p_date}
                  onChange={(e) => setPdate(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <Form.Group controlId="advancePayment">
                <Form.Label>Advance Payment (Optional):</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter advance amount"
                  value={advTotalAmount}
                  onChange={handleAdvancePaymentChange}
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-4">
              <Form.Group controlId="totalChange">
                <Form.Label>Total Change:</Form.Label>
                <Form.Control
                  type="number"
                  disabled
                  value={totalChange}
                  placeholder="0.00"
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitPay}>
            Submit Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Table;
