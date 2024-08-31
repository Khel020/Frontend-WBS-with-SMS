import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Userlist() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setEdit] = useState(false);
  const handleEditClose = () => {
    setEdit(false);
  };
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("type");
  const usertype = token;
  const [users, setUsers] = useState([]);
  const [editAccount, setEditCustomer] = useState({
    _id: "",
    name: "",
    contact: "",
    address: "",
    email: "",
    role: "",
  });
  const [search, setSearch] = useState("");
  const backend = import.meta.env.VITE_BACKEND;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    lastname: "",
    contact: "",
    address: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("FormData", formData);
  };

  useEffect(() => {
    axios
      .get(`${backend}/admin/GetAllUsers`)
      .then((response) => {
        // Ensure to access response.data to get the data
        if (response.data && response.data.success) {
          setUsers(response.data.data); // Update state with the data from the response
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleEditValues = (data) => {
    setEditCustomer({ ...data });
    setEdit(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editAccount, [name]: value });
    console.log("AKSJD", editAccount);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    let endpoint;
    console.log("Role:", editAccount.role);

    switch (editAccount.role) {
      case "admin":
        endpoint = "/admin/editAdmin";
        break;
      case "user":
        endpoint = "/user/editUser";
        break;
      case "biller":
        endpoint = "/biller/editBiller";
        break;
      default:
        console.error("Invalid role selected");
        return;
    }

    const updates = {
      _id: editAccount._id,
      name: editAccount.name,
      email: editAccount.email,
      contact: editAccount.contact,
      address: editAccount.address,
    };

    try {
      const response = await axios.put(`${backend}${endpoint}`, updates);
      if (response.data.success) {
        toast.success("Account Successfully Updated!", {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        // Handle error response
        toast.error("Failed to update account.");
      }
    } catch (error) {
      console.error(
        "Error updating account:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleAccountStatusChange = (data) => {};

  const filterUsers = users.filter((users) => {
    return users.username.toLowerCase().includes(search.toLowerCase());
  });
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
  const columns = [
    {
      name: "Account Name:",
      sortable: true,
      selector: (row) => row.name,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Date Created",
      sortable: true,
      selector: (row) => formatDate(row.dateCreated),
      width: "150px", // Adjust width as needed
    },
    {
      name: "Email.",
      sortable: true,
      selector: (row) => row.email,
      width: "250px", // Adjust width as needed
    },
    {
      name: "Contact No.",
      sortable: true,
      selector: (row) => row.contact,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Usertype",
      sortable: true,
      selector: (row) =>
        row.usertype === "users"
          ? "Users"
          : row.usertype === "admin"
          ? "Admin"
          : "Biller",
      width: "120px", // Adjust width as needed
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
      width: "150px", // Adjust width as needed
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => (
        <div>
          <i
            className={`bi bi-toggle-${
              row.status === "active" ? "on" : "off"
            } ${row.status === "active" ? "text-success" : "text-danger"}`}
            style={{ fontSize: "25px", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleAccountStatusChange(row._id, row.status)}
            title={
              row.status === "active"
                ? "Deactivate Account"
                : "Activate Account"
            }
          ></i>

          <i
            className="bi bi-pencil-square text-success"
            onClick={() => handleEditValues(row)} // Pass the current row data
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
          ></i>
          <i
            className="bi bi-x-square-fill text-danger"
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
          ></i>
        </div>
      ),
      width: "152px", // Adjust width as needed
    },
  ];
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORMDATA", formData);
    // Determine the endpoint based on the selected role
    let endpoint;
    switch (formData.role) {
      case "admin":
        endpoint = "/admin/add";
        break;
      case "user":
        endpoint = "/user/newUser";
        break;
      case "biller":
        endpoint = "/biller/addBiller";
        break;
      default:
        console.error("Invalid role selected");
        return;
    }

    // Perform the POST request to the appropriate endpoint
    try {
      const response = await fetch(`${backend}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Account Successfully Created!");
      } else {
        const errors = result.errors || {};
        setErrors(errors);
        toast.error(result.message || "Error: Unable to create account");
      }
    } catch (err) {
      console.error("Error creating account:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded ">
          <h1 className="h2">Manage Accounts</h1>
        </div>
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
              className="btn btn-primary btn-sm mx-3"
              onClick={handleShow}
            >
              Add Account
            </button>
          </div>
        </div>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="550px"
          columns={columns}
          data={filterUsers}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>Loading</div>}
        />
      </main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Select role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="biller">Biller</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Account
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* TODO: EDIT MODAL */}
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            {/* Section: Personal Information */}
            <h5 className="mb-3">Personal Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Fullname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={editAccount.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={editAccount.email}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="contact"
                    value={editAccount.contact}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={editAccount.address}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
}

export default Userlist;
