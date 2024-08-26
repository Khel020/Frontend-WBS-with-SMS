import React from "react";
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
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //TODO: GET ALL Consumers
  const backend = import.meta.env.VITE_BACKEND;
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [selectedBill, setSelectedBill] = useState("");
  const [duedate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [penaltyCharge, setPenalty] = useState("");
  const [balance, setTotalBalance] = useState("");
  const [paymentAmount, setPayment] = useState("");
  const [p_date, setPdate] = useState("");
  const [address, setAddress] = useState("");
  // Filtered data based on search input
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

        if (response.ok) {
          const data = await response.json();
          setBills(data.consumerBills || []);
          setTotalBalance(data.totalBill || "0");

          if (data.consumerBills && data.consumerBills.length > 0) {
            setAccName(data.consumerBills[0].accountName);
            setAddress(data.address);
          } else {
            setAccName("");
            toast.info("No bills found.");
          }
        } else {
          setBills([]);
          setTotalBalance("0");
          setAccName("");
          toast.error("Error fetching data or no bills found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAccName("");
        setBills([]);
        setTotalBalance("0");
        toast.warn("Error No Bills Found");
      }
    }
  };

  const handleBillSelect = (e) => {
    const billId = e.target.value;
    setSelectedBill(billId);

    const selectedBill = bills.find((bill) => bill._id === billId);

    if (selectedBill) {
      setDueDate(
        selectedBill.due_date
          ? new Date(selectedBill.due_date).toLocaleDateString()
          : "N/A"
      );
      setTotalAmount(selectedBill.totalAmount ? selectedBill.totalAmount : "0");
      setPenalty(selectedBill.p_charge ? selectedBill.p_charge : "0");
    } else {
      setDueDate("");
      setTotalAmount("0");
      setPenalty("0");
    }
  };

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

  const handleSubmitPay = async (e) => {
    e.preventDefault();
    const newBill = {
      acc_num,
      acc_name,
      address,
      totalAmount,
      paymentAmount,
    };
    try {
      const response = await axios.post(
        `${backend}/biller/newclient/`,
        newBill
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  if (!clients) {
    return <div>Loading...</div>;
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
            <a className="btn btn-info btn-sm">
              <span>View Bills</span>
            </a>
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
          noDataComponent={<div>No data available</div>}
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
              <Form.Label>Unpaid Bills:</Form.Label>
              <Form.Select
                aria-label="Select Bill Number"
                onChange={handleBillSelect}
                value={selectedBill}
                name="acc_num"
              >
                <option value="">Select Bill No. or Period</option>
                {bills.map((bill) => (
                  <option key={bill._id} value={bill._id}>
                    {bill.billNumber}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col">
              <Form.Label>Due Date:</Form.Label>
              <Form.Control type="text" value={duedate} disabled />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <Form.Label>Penalty Charge:</Form.Label>
              <Form.Control
                type="number"
                value={penaltyCharge}
                placeholder="0.00"
                disabled
              />
            </div>
            <div className="col">
              <Form.Label>Amount Due:</Form.Label>
              <Form.Control
                type="number"
                value={totalAmount}
                placeholder="0.00"
                disabled
              />
            </div>
          </div>
          <div className="row">
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
                  onChange={(e) => setPayment(e.target.value)}
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
