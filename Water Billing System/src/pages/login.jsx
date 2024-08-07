import React from "react";
import Card from "react-bootstrap/Card";
import image from "../assets/bg.jpg";
import "../styles/loginreg.css";
import axios from "axios";
import { useState, useEffect } from "react";

function login() {
  const [show, setShow] = useState(false);
  const [acc_name, setAccName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Login = {
      acc_name,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/login/newLogin",
        Login
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);
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

        <div className="login-form">
          <Card
            style={{
              width: "30rem",
              backgroundColor: "#78A7FF",
              fontSize: "1px",
              marginTop: "100px",
            }}
          >
            <Card.Body className="p-5">
              <main className="form-signin w-100">
                <form onSubmit={handleSubmit}>
                  <h1 className="h3 mb-3 fw-normal text-center mb-5">Login</h1>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingUsername"
                      placeholder="Username"
                      onChange={(e) => setAccName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check text-center mt-4 mx-auto mb-3">
                    <a
                      href=""
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign in
                  </button>
                  <div className="form-check text-center mt-4 ">
                    <p>
                      Don't have an account?{" "}
                      <a href="/register" className="text-dark">
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </main>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default login;
