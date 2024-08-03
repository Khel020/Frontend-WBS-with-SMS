import React from "react";
import Card from "react-bootstrap/Card";
import image from "../assets/bg.jpg";
import "../styles/loginreg.css";

function login() {
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
      <header class="p-3" style={{ backgroundColor: "#0F3A3F" }}>
        <div class="container-fluid">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <h4 className="text-white">CWD Online Portal</h4>
            <ul class="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0 mx-auto gap-5">
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  Bills
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  Contact Us
                </a>
              </li>
            </ul>
            <div class="text-end">
              <button type="button" class="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className="d-flex mx-5"
        style={{ alignItems: "center", marginTop: "80px" }}
      >
        <div
          className="hero text-white"
          style={{ maxWidth: "600px", marginRight: "200px" }}
        >
          <h1>Casiguran Water District</h1>
          <p className="motto">"Serbisyong Bulahos Para sa Gabos"</p>
          <p className="welcome-message">
            Welcome to the Casiguran Water District Customer Portal. Easily
            access your account, view your bills, and stay updated with SMS
            notifications for a seamless water service experience.
          </p>
        </div>

        <div className="login-form">
          <Card
            style={{
              width: "25rem",
              backgroundColor: "#78A7FF",
              padding: "15px",
              height: "25rem",
            }}
          >
            <Card.Body>
              <main className="form-signin w-100">
                <form>
                  <h1 className="h3 mb-3 fw-normal text-center mb-5">
                    Please sign in
                  </h1>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingUsername"
                      placeholder="Username"
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check text-start my-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="remember-me"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign in
                  </button>
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
