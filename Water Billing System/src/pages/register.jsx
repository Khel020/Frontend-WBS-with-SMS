import React from "react";
import Card from "react-bootstrap/Card";
import image from "../assets/bg.jpg";

import axios from "axios";
import "../styles/loginreg.css";
import { useState, useEffect } from "react";
function ListExample() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  const [acc_name, setAccName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [birthday, setBday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      acc_name,
      email,
      password,
      contact,
      acc_num,
      meter_num,
      birthday,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/user/newUser/",
        newUser
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
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
        className="d-flex  justify-content-center mx-auto"
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
            notifications htmlFor a seamless water service experience.
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
                  <label
                    htmlFor="validationServerUsername"
                    className="form-label"
                  >
                    Account Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="validationServerUsername"
                      required
                      onChange={(e) => setAccName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control is-Valid"
                    id="validationServer03"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    Password must be between 8 and 12 characters.
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    required
                    onChange={(e) => setAccNum(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    required
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  ></div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Meter Number
                  </label>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    required
                    onChange={(e) => setMeterNum(e.target.value)}
                  />
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  ></div>
                </div>
                <div className="col-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby=""
                    required
                    onChange={(e) => setBday(e.target.value)}
                  />
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  ></div>
                </div>
                <div className="col-6">
                  <label htmlFor="validationServer03" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control is-invalid"
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  ></div>
                </div>

                <div className="col-12 mb-2 mt-3">
                  <hr />
                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign up
                  </button>
                </div>

                <div className="col-12 mb-3 text-center">
                  <p>
                    Already have an account? <a href="/login">Sign in</a>
                  </p>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ListExample;
