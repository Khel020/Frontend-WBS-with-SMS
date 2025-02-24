import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import DataTable from "react-data-table-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

const PaymentHistory = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;
  const [payments, setPayments] = useState([]);
  const { acc_num, accountName } = useParams();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `${backend}/biller/getPayments/${acc_num}`
        );
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPayment();
  }, [acc_num, backend]);

  const formatDateTime = (date) => {
    return new Date(date)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const generateReceipt = (payment) => {
    return `\n\n========== PAYMENT RECEIPT ==========
    \nDate: ${formatDateTime(payment.paymentDate)}
    \nAccount Name: ${accountName}
    \nAccount Number: ${acc_num}
    \n----------------------------------
    \nTotal Due: ₱${payment.amountDue.toFixed(2)}
    \nPayment Received: ₱${payment.tendered.toFixed(2)}
    \nChange Given: ₱${payment.change.toFixed(2)}
    \nNotes: ${payment.notes || "N/A"}
    \n==================================\n`;
  };

  const handleViewReceipt = (payment) => {
    alert(generateReceipt(payment));
  };

  const handlePrintReceipt = (payment) => {
    const receiptContent = generateReceipt(payment);
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(`<pre>${receiptContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadReceipt = (payment) => {
    const receiptContent = generateReceipt(payment);
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `receipt_${payment.id}.txt`;
    link.click();
  };

  const columns = [
    { name: "OR No.", selector: (row, index) => index + 1, width: "100px" },
    {
      name: "Payment Date",
      selector: (row) => formatDateTime(row.paymentDate),
      width: "200px",
    },
    {
      name: "Total Due",
      selector: (row) => `₱${row.amountDue.toFixed(2)}`,
      width: "150px",
    },
    {
      name: "Payment Received",
      selector: (row) => `₱${row.tendered.toFixed(2)}`,
    },
    { name: "Notes", selector: (row) => row.notes || "N/A" },
    { name: "Change Given", selector: (row) => `₱${row.change.toFixed(2)}` },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">Actions</Popover.Header>
                <Popover.Body>
                  <button
                    className="d-block mb-2 btn btn-link"
                    onClick={() => handleViewReceipt(row)}
                  >
                    View Receipt
                  </button>
                  <button
                    className="d-block mb-2 btn btn-link"
                    onClick={() => handlePrintReceipt(row)}
                  >
                    Print Receipt
                  </button>
                  <button
                    className="d-block mb-2 btn btn-link"
                    onClick={() => handleDownloadReceipt(row)}
                  >
                    Download Receipt
                  </button>
                </Popover.Body>
              </Popover>
            }
          >
            <button className="btn btn-link p-0">
              <FaEllipsisV size={20} />
            </button>
          </OverlayTrigger>
        </div>
      ),
      width: "180px",
    },
  ];
  const customStyles = {
    table: {
      style: {
        overflow: "hidden",
        borderRadius: "5px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#EEF1F8", // Lightest blue
        color: "#333333", // Dark text for contrast
      },
    },
    rows: {
      style: {
        minHeight: "40px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
    },
  };
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 me-3">Payments of {accountName}</h1>
        </div>
        <Link to={`/billing-records/${acc_num}/${accountName}`}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            size="small"
            className="mb-3"
          >
            Back
          </Button>
        </Link>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={payments}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={
            <div className="text-danger">
              <span>No Record found</span>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default PaymentHistory;
