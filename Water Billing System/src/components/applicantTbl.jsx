import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
const clientTypeOptions = [
  { value: "Residential", label: "Residential" },
  { value: "Government", label: "Government" },
  { value: "Comm/Indu/Bulk", label: "Comm/Indu/Bulk" },
];

const Application = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const usertype = localStorage.getItem("type");

  const [applicants, setApplicants] = useState([]);
  const [account, setAccounts] = useState("");
  const [inspectionFee, setInspectionFee] = useState("");
  const [client_type, setType] = useState("");
  const [installationFee, setInstallationFee] = useState("");
  const [selectedInstallDate, setSelectedInstallDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amountToPay, setAmountToPay] = useState("");
  const [change, setChange] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState({});
  const [p_date, setPdate] = useState(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });
  const handleClosePay = () => setShowPayment(false);
  const handleShowPay = () => setShowPayment(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showScheInspect, setSchedInspec] = useState(false);
  const handleCloseInspec = () => setSchedInspec(false);
  const handleShowInspec = () => setSchedInspec(true);

  const [showInstall, setShowInstall] = useState(false);
  const handleCloseInstall = () => setShowInstall(false);
  const handleShowInstall = () => setShowInstall(true);
  const onChange = async (e) => {
    setAccounts(e.target.value);
  };
  const [showConfirmation, setConfirmation] = useState(false);

  const handleCloseConfirm = () => setConfirmation(false);
  const handleShowConfirm = () => setConfirmation(true);
  const [formData, setFormData] = useState({
    applicantName: "",
    address: "",
    contact: "",
    date_of_birth: "",
    inspec_fee: "",
    date_applied: "",
    officer_agency: "",
    position: "",
    business_name: "",
    business_position: "",
    client_type: "",
    email: "",
  });

  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  // TODO: GET APPLICANTS
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${backend}/csofficer/applicants`);
        if (!response.ok) throw new Error("Failed to fetch applicants");
        const data = await response.json();

        setApplicants(data);

        setFilteredApplicants(data); // Set filtered list initially to full list
      } catch (error) {
        toast.error("Error fetching applicants");
      }
    };

    fetchApplicants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: validateInput(e.target.name, e.target.value),
    }));
  };
  const validateInput = (name, value) => {
    let validationError = "";

    switch (name) {
      case "email":
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validationError = "Please enter a valid email address.";
        }
        break;

      case "contact":
        if (!/^(\+?63|0)?9\d{9}$/.test(value)) {
          validationError = "Please enter a valid CP Number.";
        }
        break;

      default:
        break;
    }

    return validationError;
  };
  // TODO: NEW APPLICANTS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backend}/csofficer/newApplicant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      const data = await response.json(); // ✅ Ensure response is awaited
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // TODO: FILTER & SEARCH
  useEffect(() => {
    let filteredData = applicants;

    if (searchTerm) {
      filteredData = filteredData.filter((applicant) =>
        `${applicant.firstname} ${applicant.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filteredData = filteredData.filter(
        (applicant) => applicant.status === filterStatus
      );
    }

    setFilteredApplicants(filteredData);
  }, [searchTerm, filterStatus, applicants]);
  // TODO: GET AMOUNT DUE
  const getAmountDue = () => {
    if (paymentType === "inspection") {
      return inspectionFee;
    } else if (paymentType === "installation") {
      return installationFee;
    }
    return 0;
  };
  // TODO: MODAL PAYMENT SEARCH
  const fetchData = async () => {
    // Ensure either acc_num or acc_name is provided
    if (account) {
      try {
        // Make the fetch request
        const response = await fetch(
          `${backend}/biller/findFees/${account}`, // Use query params for dynamic search
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
        if (data.inspection_fee < 0 || data.installation_fee < 0) {
          toast.warn("The account has been successfully settled.", {
            autoClose: 1000,
          });
          setAccName(data.consumerName);
          setAccNum(data.accountNum);
        } else {
          setInspectionFee(data.inspection_fee);
          setInstallationFee(data.installation_fee);
          setPaymentType(data.paymentType);
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
  // TODO: CALCULATE CHANGE
  const handleAmountChange = (e) => {
    const input = e.target.value;

    // Kung walang input, i-clear ang state
    if (!input) {
      setAmountToPay("");
      setChange("");
      return;
    }

    const inputAmount = parseFloat(input) || 0;
    setAmountToPay(inputAmount);

    // I-assume na ang fees ay maaaring hindi numeric kaya ginagawa nating number ang mga ito
    const feeInspection = parseFloat(inspectionFee) || 0;
    const feeInstallation = parseFloat(installationFee) || 0;
    const totalFee = feeInspection + feeInstallation;

    let computedChange = inputAmount - totalFee;
    if (computedChange < 0) {
      computedChange = 0;
    }

    // I-round ang computed change (pwede mo itong i-adjust para 2-decimal places)
    computedChange = Math.round(computedChange);
    setChange(computedChange);
  };
  // TODO: SUBMIT PAYMENT
  const handleSubmitPay = async () => {
    try {
      const computedAmountDue = getAmountDue();
      const response = await fetch(`${backend}/biller/feePayments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify({
          applicant: account,
          amount_paid: amountToPay,
          amountDue: computedAmountDue,
          p_date: p_date,
          paymentType: paymentType,
          change: change,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Payment processed successfully!");
        setAmountToPay(0);
        setChange(0);
        handleClosePay(); // Close modal
        fetchData(); // Refresh data table
      } else {
        alert(data.message || "Failed to process payment.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleScheduleInspection = async (account) => {
    handleShowInspec(true);
    setAccounts(account.applicant_name);
  };
  const handleSubmitSchedule = async () => {
    try {
      console.log(account);
      const response = await fetch(`${backend}/csofficer/scheduleInspec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify({
          applicant: account, // Replace with the actual applicant identifier
          inspectionDate: selectedDate, // The date selected from react-datepicker
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inspection scheduled successfully!");
        // Optionally, close the modal and refresh any necessary data
        setShowScheInspect(false);
        // Refresh or update your data as needed
      } else {
        alert(data.message || "Failed to schedule inspection.");
      }
    } catch (error) {
      console.error("Error scheduling inspection:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleConfirmDoneInspection = async (data) => {
    setAccounts(data.applicant_name);
    handleShowConfirm(true);
  };
  const handleConfirm = async (account) => {
    try {
      const response = await fetch(
        `${backend}/csofficer/doneInspec/${account}`,
        {
          method: "PUT", // or PUT, depending on your API requirements
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Inspected" }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success(`Status updated for account: ${account}`, {
        autoClose: 3000,
      });
      console.log(`Status updated for account: ${account}`);
      handleCloseConfirm();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status. Please try again later.", {
        autoClose: 3000,
      });
    }
  };
  const handleScheduleInstallation = async (account) => {
    setAccounts(account.applicant_name);
    console.log(account);
    handleShowInstall(true);
  };
  const ScheduleInstallation = async () => {
    try {
      // Format date for API
      const formattedDate = selectedInstallDate.toISOString().split("T")[0];
      const response = await fetch(`${backend}/csofficer/scheduleInstall`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantName: account,
          installationDate: formattedDate,
          installationFee: parseFloat(installationFee),
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to schedule installation");
      }

      // Success handling
      toast.success("Installation scheduled successfully!");

      // Reset form or close modal
      handleCloseInstall();

      // Refresh data if needed
      if (typeof fetchInstallations === "function") {
        fetchInstallations();
      }
    } catch (error) {
      console.error("Installation scheduling error:", error);
      toast.error(
        error.message || "Failed to schedule installation. Please try again."
      );
    }
  };
  // FIXME: CS OFFICER COLUMS
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Applicant Name",
      selector: (row) => row.applicant_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Date Applied",
      selector: (row) => new Date(row.date_applied).toLocaleDateString(),
      width: "150px",
    },
    { name: "Contact", selector: (row) => row.contact, width: "150px" },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "180px",
      cell: (row) => (
        <span
          className={`badge rounded-pill border ${
            row.status === "Pending Approval"
              ? "bg-warning-subtle border-warning-subtle text-warning-emphasis"
              : row.status === "New"
              ? "bg-primary-subtle border-primary-subtle text-primary-emphasis"
              : row.status === "For Inspection"
              ? "bg-info-subtle border-info-subtle text-info-emphasis"
              : row.status === "For Installation"
              ? "bg-secondary-subtle border-secondary-subtle text-secondary-emphasis"
              : row.status === "Installing"
              ? "bg-success-subtle border-success-subtle text-success-emphasis"
              : row.status === "Inspected"
              ? "bg-dark-subtle border-dark-subtle text-dark-emphasis"
              : "bg-light-subtle border-light-subtle text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Balance",
      selector: (row) =>
        row.status === "Pending Approval"
          ? "Paid"
          : row.inspection_fee || row.installation_fee,
      cell: (row) => (
        <span
          style={{
            color: row.status === "Pending Approval" ? "green" : "black",
            fontWeight: "bold",
          }}
        >
          {row.status === "Pending Approval"
            ? "Paid"
            : row.inspection_fee || row.installation_fee}
        </span>
      ),
    },

    {
      name: "Action",
      cell: (row) => {
        let buttonLabel = "";
        let buttonVariant = "primary";
        let onClickHandler = () => {};

        switch (row.status) {
          case "New":
            buttonLabel = "Pending Payment";
            return <h6 className="text-primary">{buttonLabel}</h6>; // ✅ Text Only
          case "For Inspection": {
            if (row.inspection_date) {
              const inspectionDate = new Date(row.inspection_date);
              const currentDate = new Date();
              const diffTime = Math.abs(currentDate - inspectionDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays >= 5) {
                // Kapag 5 araw na o higit pa, ipakita ang button para sa Done Inspection
                return (
                  <Button
                    variant="success"
                    onClick={() => handleConfirmDoneInspection(row)}
                  >
                    Done Inspection
                  </Button>
                );
              } else {
                return <h6 className="text-dark fw-bold">Scheduled</h6>;
              }
            } else {
              // Kapag walang inspection date, ipakita ang button para i-schedule ang inspection
              buttonLabel = "Sched Inspection";
              buttonVariant = "info";
              onClickHandler = () => handleScheduleInspection(row);
            }
            break;
          }
          case "Inspected":
            buttonLabel = "Schedule Install";
            buttonVariant = "success";
            onClickHandler = () => handleScheduleInstallation(row);
            break;
          case "For Installation":
            if (!row.isApprove) {
              if (!row.paid_installation && row.installation_date) {
                return <h6 className="text-primary">Pending Payment</h6>;
              } else if (row.paid_installation && row.installation_date) {
                return <h6 className="text-success">Pending Approval</h6>;
              }
            }
            return <h6 className="text-primary">{buttonLabel}</h6>;
          case "Pending Approval":
            buttonLabel = "Pending Approval";
            return <h6 className="text-primary">{buttonLabel}</h6>; // ✅ Text Only
          case "Installing":
            return <h6 className="text-success mt-2">On Going</h6>;

          case "Installed":
            buttonLabel = "Create Account";
            buttonVariant = "dark";
            onClickHandler = () => handleCreateAccount(row);
            break;
          default:
            return <span className="text-muted">N/A</span>;
        }

        return (
          <button
            className={`btn btn-${buttonVariant} btn-sm`}
            onClick={onClickHandler}
          >
            {buttonLabel}
          </button>
        );
      },
    },
  ];
  // FIXME: CASHIER COLUMnS
  const columns2 = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Applicant Name",
      selector: (row) => row.applicant_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Date Applied",
      selector: (row) => new Date(row.date_applied).toLocaleDateString(),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    { name: "Inspection Fee", selector: (row) => row.inspection_fee },
    {
      name: "Installation Fee",
      selector: (row) => row.installation_fee,
      sortable: true,
    },
  ];

  return (
    <div className="mt-3">
      <div className="mb-3 d-flex justify-content-between">
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-6">
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="For Inspection">For Inspection</option>
              <option value="Inspected">Inspected</option>
              <option value="For Installation">For Installation</option>
              <option value="Installed">Installed</option>
            </select>
          </div>
        </div>
        {usertype === "CS_Officer" && (
          <div className="text-end" onClick={handleShow}>
            <Button variant="success">+ New Application</Button>
          </div>
        )}
        {usertype === "cashier" && (
          <div className="text-end" onClick={handleShowPay}>
            <Button variant="success"> Proceed to Payment</Button>
          </div>
        )}
      </div>
      {usertype === "CS_Officer" && (
        <DataTable
          customStyles={customStyles}
          columns={columns}
          pagination
          fixedHeaderScrollHeight="400px"
          responsive
          data={filteredApplicants} // Use filtered applicants
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No Record Found</div>}
        />
      )}
      {usertype === "cashier" && (
        <DataTable
          customStyles={customStyles}
          columns={columns2}
          pagination
          fixedHeaderScrollHeight="400px"
          responsive
          data={filteredApplicants.filter(
            (applicant) =>
              applicant.status === "New" ||
              applicant.status === "For Installation"
          )}
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No Record Found</div>}
        />
      )}
      {/* TODO: NEW APPLICATION MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        className="shadow"
      >
        <Modal.Header className="bg-light border-bottom border-light">
          <Modal.Title className="text-primary">
            <i className="bi bi-file-earmark-text me-2"></i>
            New Application
          </Modal.Title>
          <Button
            variant="light"
            size="sm"
            className="ms-auto border-0"
            onClick={handleClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <div className="mb-2">
              <Row className="g-3">
                <Col md={7}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>Name of Applicant / Representative</Form.Label>
                    <Form.Control
                      type="text"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleChange}
                      placeholder="Enter Name of Applicant"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Classification</Form.Label>
                    <Select
                      options={clientTypeOptions}
                      value={clientTypeOptions.find(
                        (option) => option.value === setType
                      )} // Find selected value
                      onChange={(selectedOption) => {
                        setType(selectedOption.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          client_type: selectedOption.value,
                        }));
                      }}
                      placeholder="Select Type"
                      isSearchable
                      styles={{
                        menu: (provided) => ({
                          ...provided,
                          maxHeight: "150px",
                          overflowY: "auto",
                        }),
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            {client_type === "Government" && (
              <div className="mb-2">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="formOfficerAgency">
                      <Form.Label>Name of Office/Agency</Form.Label>
                      <Form.Control
                        type="text"
                        name="officer_agency"
                        value={formData.officer_agency}
                        onChange={handleChange}
                        placeholder="Enter officer/agency name"
                        className="shadow-sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPosition">
                      <Form.Label>Position</Form.Label>
                      <Form.Control
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Enter your position"
                        className="shadow-sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
            {client_type === "Comm/Indu/Bulk" && (
              <div className="mb-4">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="formBusinessName">
                      <Form.Label>Name of Business</Form.Label>
                      <Form.Control
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        placeholder="Enter business name"
                        className="shadow-sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBusinessPosition">
                      <Form.Label>Your Position</Form.Label>
                      <Form.Control
                        type="text"
                        name="business_position"
                        value={formData.business_position}
                        onChange={handleChange}
                        placeholder="Enter your position"
                        className="shadow-sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
            <div className="mb-4">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      className="shadow-sm"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="shadow-sm"
                      required
                    />
                  </Form.Group>
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <InputGroup className="shadow-sm">
                      <InputGroup.Text id="basic-addon2">
                        <i className="bi bi-calendar-date"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formDateApplied">
                    <Form.Label>Date Applied</Form.Label>
                    <InputGroup className="shadow-sm">
                      <InputGroup.Text id="basic-addon3">
                        <i className="bi bi-calendar-check"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        name="date_applied"
                        value={formData.date_applied}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formContact">
                    <Form.Label>Contact Number</Form.Label>
                    <InputGroup className="shadow-sm">
                      <InputGroup.Text id="basic-addon1">
                        <i className="bi bi-telephone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="09XX-XXX-XXXX"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formInspectionFee">
                    <Form.Label>Inspection Fee</Form.Label>
                    <InputGroup className="shadow-sm">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="inspec_fee"
                        value={formData.inspec_fee}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer className="bg-light border-top border-light p-3">
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
              <i className="bi bi-check2 me-1"></i>
              Submit Application
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* TODO: PAYMENT MODAL FOR APPLICANTS */}
      <Modal show={showPayment} onHide={handleClosePay} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1F316F", color: "white" }}
        >
          <Modal.Title>Let's Settle Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-3 px-1">
              <div className="col-md-8">
                <Form.Label>Search Applicant:</Form.Label>
                <div className="d-flex position-relative">
                  <Form.Control
                    type="text"
                    name="account"
                    placeholder="Search Applicant Name"
                    value={account || ""}
                    onChange={onChange}
                    className="rounded shadow-sm"
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
                    display: account ? "block" : "none",
                    position: "absolute",
                    minWidth: "225px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    zIndex: "1",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginTop: "5px",
                  }}
                >
                  {applicants
                    .filter(
                      (name) =>
                        typeof name.applicant_name === "string" &&
                        typeof account === "string" &&
                        name.applicant_name
                          .toLowerCase()
                          .includes(account.toLowerCase()) &&
                        name.applicant_name !== account
                    )
                    .slice(0, 5)
                    .map((name) => (
                      <div
                        key={name._id}
                        onClick={() => setAccounts(name.applicant_name)}
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
                        {name.applicant_name}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <hr />

            {/* Account Details Section */}
            <div className="row px-1">
              {/* First Row */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Inspection Fee
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">₱</span>
                      <Form.Control
                        type="number"
                        value={inspectionFee || 0}
                        readOnly
                        disabled
                        className="form-control-sm bg-light text-end"
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Installation Fee
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">₱</span>
                      <Form.Control
                        type="number"
                        value={installationFee || 0}
                        readOnly
                        disabled
                        className="form-control-sm bg-light text-end"
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>

              {/* Second Row */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Amount to Pay:</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">₱</span>
                    <Form.Control
                      type="number"
                      value={amountToPay}
                      onChange={handleAmountChange}
                      className="form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="fw-bold">Payment Type:</Form.Label>
                    <Form.Select
                      value={paymentType}
                      disabled
                      readOnly
                      className="form-control-sm"
                    >
                      <option value="">Payment Type</option>
                      <option value="inspection">Inspection Fee</option>
                      <option value="For Installation">Installation Fee</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              {/* Third Row - Payment Date */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Payment Date
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="datetime-local"
                        value={p_date}
                        onChange={(e) => setPdate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="fw-semibold">Change</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">₱</span>
                      <Form.Control
                        type="number"
                        value={change}
                        readOnly
                        disabled
                        className="form-control-sm bg-light text-end"
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button variant="secondary" onClick={handleClosePay}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitPay}>
            Process Payment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* TODO: SCHEDULE INSPECT */}
      <Modal
        show={showScheInspect}
        onHide={handleCloseInspec}
        size="sm"
        centered
        className="inspection-scheduler-modal"
      >
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="text-center fw-bold">
            Schedule Inspection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pt-2">
          <span className="mb-3 fw-bold">Applicant: {account}</span>
          <Form.Group controlId="inspectionDate">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              inline
              calendarClassName="border rounded shadow-sm w-100"
              monthsShown={1}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dayClassName={(date) =>
                date.getDay() === 0 || date.getDay() === 6
                  ? "text-muted"
                  : undefined
              }
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="d-flex justify-content-between align-items-center px-2 py-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    &lt;
                  </button>
                  <div className="d-flex">
                    <select
                      className="form-select form-select-sm me-1"
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {Array.from(
                        { length: 10 },
                        (_, i) => date.getFullYear() - 5 + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select form-select-sm"
                      value={date.getMonth()}
                      onChange={({ target: { value } }) => changeMonth(value)}
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, i) => (
                        <option key={month} value={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    &gt;
                  </button>
                </div>
              )}
            />
          </Form.Group>

          {selectedDate && (
            <div className="mt-3 p-3 bg-light rounded border">
              <p className="mb-1 fw-semibold">Selected date:</p>
              <p className="mb-0 text-primary">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top-0 justify-content-center  pt-0 pb-4">
          <Button
            variant="outline-secondary"
            onClick={handleCloseInspec}
            className=""
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedDate}
            className="px-4"
            onClick={handleSubmitSchedule}
          >
            Schedule Inspection
          </Button>
        </Modal.Footer>
      </Modal>

      {/* TODO: Confirmation */}
      <Modal show={showConfirmation} onHide={handleCloseConfirm} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold">
            Confirm Inspection Completion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-circle-fill text-primary me-3 fs-4"></i>
            <p className="mb-0">
              Are you sure you want to mark the inspection for{" "}
              <strong>Applicant: {account}</strong> as complete? This action
              will update the status to <strong>"Inspected"</strong>.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="outline-secondary" onClick={handleCloseConfirm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(account)}>
            Confirm Completion
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInstall}
        onHide={handleCloseInstall}
        size="md"
        centered
        className="installation-scheduler-modal"
      >
        <Modal.Header
          closeButton
          className="border-bottom-0 pb-0"
          style={{ backgroundColor: "#1F316F", color: "white" }}
        >
          <Modal.Title className="fw-bold">Schedule Installation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pt-3 pb-4">
          <Form.Group controlId="applicantAndCost" className="mb-4">
            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <Form.Label className="fw-semibold">Applicant Name</Form.Label>
                <Form.Control
                  type="text"
                  value={account}
                  disabled
                  className="bg-light"
                />
              </div>
              <div className="flex-grow-1">
                <Form.Label className="fw-semibold">
                  Installation Fees
                </Form.Label>
                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <Form.Control
                    type="number"
                    value={installationFee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="installationDate">
            <div className="calendar-container shadow-sm rounded border mb-3">
              <style>
                {`
          /* Custom calendar styles */
          .calendar-container .react-datepicker {
            width:  100%;
            border: none;
            font-family: inherit;
          }
          .calendar-container .react-datepicker__month-container {
            width: 100%;
          }
          .calendar-container .react-datepicker__day {
            width: 3.5rem;
            height: 2.4rem;
            line-height: 2.4rem;
            margin: 0.2rem;
            border-radius: 50%;
          }
          .calendar-container .react-datepicker__day:hover {
            background-color: #e6f7ff;
          }
          .calendar-container .react-datepicker__day--selected {
            background-color: #1F316F;
            color: white;
            font-weight: bold;
          }
          .calendar-container .react-datepicker__header {
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
          }
          .calendar-container .react-datepicker__day-name {
            width: 2.4rem;
            font-weight: bold;
          }
          .calendar-container .form-select {
            font-size: 0.95rem;
          }
          .weekend-day {
            color: #6c757d;
          }
          .month-nav-button {
            background: #f0f0f0;
            border: 1px solid #dee2e6;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          `}
              </style>
              <DatePicker
                selected={selectedInstallDate}
                onChange={(date) => setSelectedInstallDate(date)}
                dateFormat="MM/dd/yyyy"
                inline
                monthsShown={1}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dayClassName={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                    ? "weekend-day"
                    : undefined
                }
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="d-flex justify-content-between align-items-center px-3 py-2">
                    <button
                      className="month-nav-button border-0"
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select form-select-sm"
                        value={date.getMonth()}
                        onChange={({ target: { value } }) => changeMonth(value)}
                      >
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, i) => (
                          <option key={month} value={i}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        className="form-select form-select-sm"
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {Array.from(
                          { length: 10 },
                          (_, i) => date.getFullYear() - 5 + i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="month-nav-button border-0"
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                )}
              />
            </div>
          </Form.Group>

          {selectedInstallDate && (
            <div className="p-3 bg-light rounded border">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-check text-primary fs-4 me-2"></i>
                <div>
                  <p className="mb-1 fw-semibold">
                    Selected installation date:
                  </p>
                  <p className="mb-0 text-primary fw-bold">
                    {selectedInstallDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top justify-content-end pt-2 pb-3">
          <Button variant="outline-secondary" onClick={handleCloseInstall}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={ScheduleInstallation}
            disabled={!selectedInstallDate}
            className="px-4"
          >
            <i className="bi bi-calendar-plus me-1"></i> Schedule
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Application;
