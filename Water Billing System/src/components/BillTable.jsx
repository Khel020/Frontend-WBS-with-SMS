import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Modal, ListGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { AiFillEye, AiOutlineEdit, AiFillFilePdf } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button
function BillTable() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;
  const [billdetails, setBillDetails] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleClose = () => setShow(false);

  const handleShow = async (billNumber) => {
    setShow(true);
    try {
      const response = await fetch(
        `${backend}/biller/getBillbyBillNum?billNumber=${billNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No bills found");
      }

      const data = await response.json(); // Await the JSON parsing
      console.log("data from fetch", data);
      setBillDetails(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch(`${backend}/biller/getAllBills`, {
        method: "GET",
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("tkn")}`,
      });
      if (!response.ok) {
        console.log({ error: "Invalid Credentials" });
      }
      const data = await response.json();
      console.log(data);
      setBills(data);
    };
    fetchBills();
  }, []);

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

  const exportToExcel = () => {
    // Format the records for Excel export
    const formattedBills = filteredBills.map((record) => ({
      "Bill No.": record.billNumber,
      "Reading Date": record.reading_date,
      "Due Date": record.due_date,
      "Account Name": record.accountName,
      "Payment Status": record.payment_status,
      "Total Amount Due": record.totalDue,
    }));

    // Create a worksheet from the formatted records
    const worksheet = XLSX.utils.json_to_sheet(formattedBills);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Collection Summary");

    // Generate file name based on the selected month
    const monthName = selectedMonth.toLocaleString("default", {
      month: "long",
    });
    const year = selectedMonth.getFullYear();
    const fileName = `Bill_Record_${monthName}_${year}.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };

  if (!bills) {
    return <div>Loading...</div>;
  }
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
      cell: (row) => {
        return (
          <span
            style={{
              color: row.dayPastDueDate > 5 ? "red" : "black",
              fontWeight: row.dayPastDueDate > 5 ? "bold" : "normal",
            }}
          >
            {formatDate(row.due_date)}
          </span>
        );
      },
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Account Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Status",
      selector: (row) => row.payment_status,
      sortable: true,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Bill Amount",
      selector: (row) => "₱ " + row.currentBill.toFixed(2),
      sortable: true,
      width: "160", // Adjust width as needed
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-primary btn-sm"
            title="View Bill"
            onClick={() => handleShow(row.billNumber)}
          >
            <AiFillEye style={{ fontSize: "20px" }} />
          </button>

          {/* Button to Edit Bill */}
          <button
            className="btn btn-outline-warning btn-sm ms-2"
            onClick={() => handleEdit(row)}
            title="Edit Bill"
          >
            <AiOutlineEdit style={{ fontSize: "20px" }} />
          </button>

          {/* Button to Download Bill */}
          <button
            className="btn btn-outline-success btn-sm ms-2"
            onClick={() => handleDownload(row)}
            title="Download Bill"
          >
            <AiFillFilePdf style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
      sortable: true,
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
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#1F702C",
        color: "white",
        fontSize: "12px",
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
    <div style={{ overflow: "visible" }}>
      <div className="row mb-3">
        <div className="col-9 d-flex align-items-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="form-control"
            calendarClassName="custom-datepicker"
          />
        </div>
        <div className="col-3 d-flex justify-content-end">
          <button
            onClick={exportToExcel}
            className="btn btn-success d-flex align-items-center"
          >
            <FaFileExport className="me-2" /> Export Excel
          </button>
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        pagination
        fixedHeaderScrollHeight="400px"
        fixedHeader
        columns={columns}
        data={filteredBills}
        responsive
        highlightOnHover
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Billing Statement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {billdetails.length > 0 ? (
            billdetails.map((bill) => (
              <div key={bill._id} className="mb-4">
                <h5 className="mb-3  text-center text-primary"></h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Bill Number:</strong> {bill.billNumber}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Account Name:</strong> {bill.accountName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Present Reading:</strong> {bill.present_read}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Previous Reading:</strong> {bill.prev_read}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Consumption:</strong> {bill.consumption}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Bill Amount:</strong> {bill.currentBill}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Arrears:</strong> {bill.arrears}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Amount Paid:</strong> {bill.amountPaid}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Penalty Charge:</strong> {bill.p_charge}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={
                        bill.payment_status === "Paid"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {bill.payment_status}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Remarks:</strong> <span> {bill.remarks}</span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ))
          ) : (
            <p className="text-muted">
              No billing information is available at this time.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Acknowledge
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BillTable;
