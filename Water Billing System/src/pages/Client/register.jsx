import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import image from "../../assets/bg.jpg";
import "../../styles/loginreg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function ListExample() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  // Form data and error state
  const [formData, setFormData] = useState({
    acc_name: "",
    email: "",
    password: "",
    contact: "",
    acc_num: "",
    meter_num: "",
    birthday: "",
  });
  const [error, setError] = useState({});

  const validateInput = (name, value) => {
    let validationError = "";

    switch (name) {
      case "acc_name":
        if (!value.trim()) {
          validationError = "Account name is required.";
        } else if (/\d/.test(value)) {
          validationError = "Account name should not contain numbers.";
        }
        break;

      case "email":
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validationError = "Please enter a valid email address.";
        }
        break;

      case "password":
        const password = value.trim();
        if (!password) {
          validationError = "Password is required.";
        } else if (password.length < 8) {
          validationError = "Password must be at least 8 characters long.";
        } else if (password.length > 12) {
          validationError = "Password must not exceed 12 characters.";
        }
        break;

      case "contact":
        if (!/^(\+?63|0)?9\d{9}$/.test(value)) {
          validationError = "Please enter a valid CP Number.";
        }
        break;

      case "acc_num":
        if (!value.trim()) {
          validationError = "Account Number is required.";
        } else if (!/^\d{3}-\d{3}-\d{3}$/.test(value)) {
          validationError = "Account Number must be in the format 000-000-000.";
        }
        break;

      case "meter_num":
        if (!value.trim()) {
          validationError = "Meter Number is required.";
        } else if (value.length !== 8) {
          validationError = "Meter Number must be exactly 8 characters long.";
        }
        break;

      case "birthday":
        if (!value.trim()) {
          validationError = "Birthday is required.";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          validationError = "Birthday must be in the format YYYY-MM-DD.";
        }
        break;

      default:
        break;
    }

    setError((prevError) => ({
      ...prevError,
      [name]: validationError,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    Object.keys(formData).forEach((key) => {
      validateInput(key, formData[key]);
      if (error[key]) validationErrors[key] = error[key];
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:1020/user/newUser/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Registration successful!", {
            onClose: () => navigate("/login"),
          });
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (err) {
        toast.error("Error occurred: " + err.message);
      }
    } else {
      setError(validationErrors);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        margin: "0",
      }}
    >
      <div
        className="d-flex justify-content-center mx-auto"
        style={{ alignItems: "center" }}
      >
        <div
          className={`hero text-white ${show ? "show" : ""}`}
          style={{
            maxWidth: "500px",
            marginRight: "350px",
            marginTop: "40px",
          }}
        >
          <h1>Casiguran Water District</h1>
          <p className="motto">"Serbisyong Bulahos Para sa Gabos"</p>
          <p className="welcome-message">
            Welcome to the Casiguran Water District Customer Portal. Easily
            access your account, view your bills, and stay updated with SMS
            notifications for a seamless water service experience.
          </p>
        </div>

        <div className="register-form">
          <Card
            style={{
              width: "30rem",
              backgroundColor: "#78A7FF",
              padding: "5px",
              fontSize: "1px",
              marginTop: "40px",
            }}
          >
            <Card.Body style={{ alignItems: "center" }}>
              <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
                Register
              </h4>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                  <label htmlFor="Accountname" className="form-label">
                    Account Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="acc_name"
                      className="form-control"
                      placeholder="Ex. John Doe"
                      id="Accountname"
                      value={formData.acc_name}
                      onChange={handleInputChange}
                    />
                    {error.acc_name && (
                      <div className="text-danger">{error.acc_name}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="pass" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="pass"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {error.password && (
                    <div className="text-danger">{error.password}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Accountnum" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="acc_num"
                    id="Accountnum"
                    placeholder="000-000-000"
                    value={formData.acc_num}
                    onChange={handleInputChange}
                  />
                  {error.acc_num && (
                    <div className="text-danger">{error.acc_num}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="number"
                    name="contact"
                    className="form-control"
                    id="Contact"
                    placeholder="+63"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                  {error.contact && (
                    <div className="text-danger">{error.contact}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Meternumber" className="form-label">
                    Meter Number
                  </label>
                  <input
                    type="number"
                    name="meter_num"
                    className="form-control"
                    id="Meternumber"
                    placeholder="ex. 00210021"
                    value={formData.meter_num}
                    onChange={handleInputChange}
                  />
                  {error.meter_num && (
                    <div className="text-danger">{error.meter_num}</div>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="Birthdate" className="form-label">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    className="form-control"
                    id="Birthdate"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
                  {error.birthday && (
                    <div className="text-danger">{error.birthday}</div>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="Email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {error.email && (
                    <div className="text-danger">{error.email}</div>
                  )}
                </div>

                <div className="col-12 mb-2 mt-3">
                  <hr />
                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign up
                  </button>
                </div>

                <div className="col-12 mb-3 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login">
                      <a href="">Sign in</a>
                    </Link>
                  </p>
                </div>
              </form>
              <ToastContainer />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ListExample;
