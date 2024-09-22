import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { AiFillFileText } from "react-icons/ai"; // Ant Design Icons
import { BsFilePlus } from "react-icons/bs"; // Bootstrap Icons
import DataTable, { defaultThemes } from "react-data-table-component";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/clientTBL.css";
import { useReactToPrint } from "react-to-print";
import ReceiptComponent from "./receipt"; // Import the receipt component

const Table = () => {
  //State for storing data
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    window.location.reload(); // This will refresh the page
  };
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
  const [penaltyCharge, setTotalPenalty] = useState("");
  const [balance, setTotalBalance] = useState("");
  const [paymentAmount, setPayment] = useState("");
  const [p_date, setPdate] = useState("");
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

    if (latestBill && latestBill.latestBill) {
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
        console.log("Data", data);

        if (data.error) {
          toast.warn(data.error, {
            autoClose: 1000, // Auto close after 1 second
          });
        }
        setBillNo(data.billNo);
        setAccName(data.consumerName);
        setAccNum(data.accountNum);
        setAddress(data.address);
        setTotalPenalty(data.totalPenalty);
        setTotalBalance(
          data.totalAmountDue && data.totalBalance
            ? parseFloat(data.totalAmountDue) + parseFloat(data.totalPenalty)
            : data.totalAmountDue
        );
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
    if (balance <= 0) {
      toast.warn("No outstanding balance.");
      return;
    }
    const newPayment = {
      billNo,
      acc_num,
      acc_name,
      p_date,
      address,
      balance,
      paymentAmount,
      advTotalAmount,
      totalChange,
    };

    console.log("Data for payments", newPayment);

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

        setDetails({
          acc_number: paymentData.paymentResult.acc_num || "N/A",
          name: paymentData.paymentResult.accountName || "N/A",
          balance: paymentData.paymentResult.balance || "0",
          address: paymentData.paymentResult.address || "0",
          amountpaid: paymentAmount,
          paymentDate: p_date,
          change: totalChange || "0",
          OR_NUM: paymentData.OR_NUM,
        });

        setAccNum(paymentData.acc_num || "0");
        setAccName(paymentData.accountName || " ");
        setTotalPenalty(paymentData.paid || "0");
        setTotalBalance(paymentData.balance || "0");
        setPayment(paymentData.change || "0");
        setPdate(new Date().toLocaleDateString());

        toast.success(result.message || "Payment successful", {
          autoClose: 1000, // Auto close after 1 second
        });
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
      handleClose(true);
    }
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
            <BsFilePlus style={{ fontSize: "20px" }} />
          </button>
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
          <Modal.Title>Let's Settle Your Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8">
              <Form.Label>Search Account:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="account"
                  placeholder="Account Number or Name"
                  value={account}
                  onChange={(e) => setAccounts(e.target.value)}
                  style={{ width: "100%" }}
                />
                <Button variant="primary" onClick={fetchData} className="ms-2">
                  Search
                </Button>
              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col">
              <Form.Label>Account Number:</Form.Label>
              <Form.Control
                type="text"
                value={acc_num}
                placeholder="Account Number"
                disabled
                style={{ fontWeight: "bold", color: "#333", width: "100%" }}
              />
            </div>
            <div className="col">
              <Form.Label>Account Name:</Form.Label>
              <Form.Control
                type="text"
                value={acc_name}
                placeholder="Account Name"
                disabled
                style={{ fontWeight: "bold", color: "#333", width: "100%" }}
              />
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col">
              <Form.Label>Penalty Charge:</Form.Label>
              <Form.Control
                type="number"
                value={penaltyCharge}
                placeholder="0.00"
                disabled
                style={{ width: "100%" }}
              />
            </div>
            <div className="col">
              <Form.Label>Total Balance:</Form.Label>
              <Form.Control
                type="number"
                value={balance}
                placeholder="0.00"
                disabled
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <hr />

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
                  style={{ fontWeight: "bold", color: "#333", width: "100%" }}
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
                  style={{ width: "100%" }}
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
                  placeholder="0.00"
                  value={advTotalAmount}
                  onChange={handleAdvancePaymentChange}
                  style={{ fontWeight: "bold", color: "#333", width: "100%" }}
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
                  style={{ fontWeight: "bold", color: "#333", width: "100%" }}
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

      <Modal show={showAddBill} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Add New Bill
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body style={{ padding: "2rem" }}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formAccNum">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Account Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={billData.acc_num}
                    disabled
                    placeholder="Account Number"
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAccountName">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Account Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={billData.accountName}
                    disabled
                    placeholder="Account Name"
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPreviousRead">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Previous Reading
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={prev_reading || 0}
                    disabled
                    placeholder="Previous Reading"
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPreviousRead">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Present Reading
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={newBill.present_read} // Default to 0 if undefined
                    onChange={handleChangePresentReading}
                    placeholder="Enter present reading"
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formReadingDate">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Reading Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={newBill.reading_date}
                    onChange={(e) =>
                      setNewBill({ ...newBill, reading_date: e.target.value })
                    }
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formConsumption">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Consumption
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={newBill.consumption}
                    disabled
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Category
                  </Form.Label>
                  <Form.Control
                    value={billData.category}
                    onChange={(e) =>
                      setBillData({ ...billData, category: e.target.value })
                    }
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formOthers">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Others (Optional)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={newBill.others}
                    onChange={(e) =>
                      setNewBill({ ...newBill, others: e.target.value })
                    }
                    placeholder="Other details"
                    style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formRemarks" className="mb-4">
              <Form.Label style={{ fontWeight: "500" }}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={billData.remarks}
                onChange={(e) =>
                  setBillData({ ...billData, remarks: e.target.value })
                }
                placeholder="Enter remarks"
                style={{ padding: "0.75rem", borderRadius: "0.25rem" }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ padding: "1.5rem" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ fontWeight: "500" }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={{ fontWeight: "500" }}
            >
              Save Bill
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
