import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CusTable from "../../components/CustomerTbl";
import { Container, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
const Customers = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  const [activationDate, setActivationDate] = useState("");
  const [accountName, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [status, setStatus] = useState("");
  const [pipe_size, setPipe] = useState("");
  const [client_type, setType] = useState("");
  const [initial_read, setInitial] = useState("");
  const [install_date, setInstallDate] = useState("");
  const [installation_fee, setInstallationFee] = useState("");
  const [connection_fee, setConnectionFee] = useState("");
  const [meter_installer, setMeterInstaller] = useState("");
  const [zone, setZone] = useState("");
  const [seq_num, setSeqNum] = useState("");
  const [book, setBook] = useState("");
  const [address, setAddress] = useState({
    house_num: "",
    purok: "",
    brgy: "",
  });

  const [brand_num, setBrandNum] = useState("");
  const [show, setShow] = useState(false);
  const [showAcc, setActivation] = useState(false);
  //FIX THIS
  const [forActivation, setforActivation] = useState([]);

  const handleShowAccs = () => {
    setActivation(true);
    const accountForAct = async () => {
      const response = await fetch(`${backend}/admin/forActivation`);
      if (!response.ok) {
        throw new Error("Error Getting For Activation Accounts");
      }
      const data = await response.json();
      setforActivation(data.result);
    };
    accountForAct();
  };
  const handleCloseAccModal = () => setActivation(false);

  // Handle input change for address
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  // Handle installation date change and compute activation date
  const handleInstallDateChange = (e) => {
    const installDate = new Date(e.target.value);
    const day = installDate.getDate();
    let activationDate;

    if (day >= 1 && day <= 15) {
      // If installation date is between 1-15, activation date is the next month
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 1, // Next month
        2
      );
    } else if (day >= 16) {
      // If installation date is between 16-30, activation date is the month after next
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 2, // Month after next
        2
      );
    }

    // Convert the activation date to a string in YYYY-MM-DD format
    const activationDateString = activationDate.toISOString().split("T")[0];

    // Update the state
    setActivationDate(activationDateString);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (zone && client_type) {
        const data = {
          zone: zone,
          c_type: client_type,
        };
        try {
          const response = await fetch(`${backend}/admin/generate_accNum`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setAccNum(result.result.acc_num);
          setSeqNum(result.result.seq_num);
          setBook(result.result.book);
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [zone, client_type]);

  // Handle form submission to add new client
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (acc_num) {
      const accountNumber = acc_num;
      const newClient = {
        accountNumber,
        accountName,
        meter_num,
        pipe_size,
        initial_read,
        status,
        address,
        client_type,
        install_date,
        activationDate,
        brand_num,
        installation_fee,
        connection_fee,
        meter_installer,
        zone,
        seq_num,
        book,
      };
      try {
        const response = await axios.post(
          `${backend}/admin/newclient/`,
          newClient
        );
        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle show/hide modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
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
      <main className="col-md-9 ms-sm-auto col-lg-10">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Customer List</h1>
        </div>
        <Container fluid>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Accounts for Activation</span>
                  </div>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                  </span>
                  <Link
                    className=" mt-auto mb-0 text-end"
                    onClick={handleShowAccs}
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Active Consumers</span>
                  </div>

                  <p className="dash-card-value mt-auto mb-0 text-end">500</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Inactive Consumers</span>
                  </div>

                  <p className="dash-card-value mt-auto mb-0 text-end">1200</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="d-flex mb-3 mx-3">
          <Button variant="success" size="sm" onClick={handleShow}>
            <i className="bi bi-person-plus"></i> Add Customer
          </Button>
        </div>

        <CusTable />

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="px-3">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="row mt-2">
                  {/* Account Name */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="accountName" className="form-label fw-bold">
                      Account Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accountName"
                      required
                      value={accountName}
                      onChange={(e) => setAccName(e.target.value)}
                    />
                  </div>

                  {/* Account Number */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="acc_num" className="form-label fw-bold">
                      Account Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="acc_num"
                      required
                      disabled
                      value={acc_num}
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="status" className="form-label fw-bold">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      required
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* House Number */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="house_num" className="form-label fw-bold">
                      House Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="house_num"
                      placeholder="130"
                      required
                      value={address.house_num}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Purok */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="purok" className="form-label fw-bold">
                      Purok
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purok"
                      placeholder="4"
                      required
                      value={address.purok}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Barangay */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="barangay" className="form-label fw-bold">
                      Barangay
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brgy"
                      placeholder="Timbayog"
                      required
                      value={address.brgy}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Client Type */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="client_type" className="form-label fw-bold">
                      Client Type
                    </label>
                    <select
                      className="form-select"
                      id="client_type"
                      required
                      value={client_type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a type
                      </option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Government">Government</option>
                    </select>
                  </div>

                  {/* Zone */}
                  {/* Zone */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zone" className="form-label fw-bold">
                      Zone
                    </label>
                    <select
                      className="form-select"
                      id="zone"
                      required
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a zone
                      </option>
                      <option value="01">Zone 01</option>
                      <option value="02">Zone 02</option>
                      <option value="03">Zone 03</option>
                      <option value="04">Zone 04</option>
                      <option value="05">Zone 05</option>
                      <option value="06">Zone 06</option>
                      {/* Add more zones as needed */}
                    </select>
                  </div>

                  {/* Book */}
                </div>

                {/* Installation Details */}
                <hr />
                <div className="row mt-2">
                  {/* Installation Date */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label
                      htmlFor="install_date"
                      className="form-label fw-bold"
                    >
                      Installation Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="install_date"
                      required
                      value={install_date}
                      onChange={(e) => {
                        setInstallDate(e.target.value);
                        handleInstallDateChange(e); // Call the function here
                      }}
                    />
                  </div>

                  {/* Activation Date */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label
                      htmlFor="activation_date"
                      className="form-label fw-bold"
                    >
                      Activation Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="activation_date"
                      value={activationDate}
                      onChange={handleInstallDateChange}
                      disabled
                    />
                  </div>

                  {/* Meter Number */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label htmlFor="meter_num" className="form-label fw-bold">
                      Meter Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="meter_num"
                      required
                      value={meter_num}
                      onChange={(e) => setMeterNum(e.target.value)}
                    />
                  </div>

                  {/* Brand Number */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label htmlFor="brand_num" className="form-label fw-bold">
                      Brand Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="brand_num"
                      required
                      value={brand_num}
                      onChange={(e) => setBrandNum(e.target.value)}
                    />
                  </div>

                  {/* Initial Reading */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label
                      htmlFor="initial_reading"
                      className="form-label fw-bold"
                    >
                      Initial Reading
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="initial_reading"
                      required
                      value={initial_read}
                      onChange={(e) => setInitial(e.target.value)}
                    />
                  </div>

                  {/* Pipe Size */}
                  <div className="col-md-6 col-lg-4 mb-3">
                    <label htmlFor="pipe_size" className="form-label fw-bold">
                      Pipe Size
                    </label>
                    <select
                      className="form-select"
                      id="pipe_size"
                      required
                      value={pipe_size}
                      onChange={(e) => setPipe(e.target.value)}
                    >
                      <option value="" disabled>
                        Select pipe size
                      </option>
                      <option value="1/2 inch">1/2 inch</option>
                      <option value="1 inch">1 inch</option>
                      <option value="2 inch">2 inch</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <hr />

                {/* Fees */}
                <div className="col-12 mt-3"></div>
                <div className="col-md-4">
                  <label
                    htmlFor="installation_fee"
                    className="form-label fw-bold"
                  >
                    Installation Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installation_fee"
                    required
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="connection_fee"
                    className="form-label fw-bold"
                  >
                    Connection Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="connection_fee"
                    required
                    value={connection_fee}
                    onChange={(e) => setConnectionFee(e.target.value)}
                  />
                </div>

                <div className="col-md-4 mt-3">
                  <label
                    htmlFor="meter_installer"
                    className="form-label fw-bold"
                  >
                    Meter Installer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="meter_installer"
                    required
                    value={meter_installer}
                    onChange={(e) => setMeterInstaller(e.target.value)}
                  />
                </div>

                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>

          {/* Fix THis */}
        </Modal>

        <Modal
          show={showAcc}
          onHide={handleCloseAccModal}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Consumer Activation Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Account No.</th>
                  <th scope="col">Activation in</th>
                  <th scope="col">Activation Date</th>
                </tr>
              </thead>
              {forActivation.map((accs, index) => (
                <tbody>
                  <tr>
                    <th scope="row" key={index}>
                      {index}
                    </th>
                    <td>{accs.accountName}</td>
                    <td>{accs.acc_num}</td>
                    <td>
                      <Countdown
                        date={new Date(accs.activation_date).getTime()}
                        renderer={({
                          days,
                          hours,
                          minutes,
                          seconds,
                          completed,
                        }) => {
                          if (completed) {
                            return <span>Activated</span>;
                          } else {
                            return (
                              <span>
                                {days}d {hours}h {minutes}m {seconds}s
                              </span>
                            );
                          }
                        }}
                      />
                    </td>
                    <td>{formatDate(accs.activation_date)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
};

export default Customers;
