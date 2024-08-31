import React from "react";
import Card from "react-bootstrap/Card";
import image from "../../assets/bg.jpg";
import "../../styles/loginreg.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ClientLogin() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Login = {
      username,
      password,
    };
    try {
      const response = await fetch(`${backend}/login/newLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Login),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        // const acc_num = data.acc_num;
        const type = data.type;
        const exp = data.expTKN;
        const name = data.name;

        // Store the token in local storage
        localStorage.setItem("tkn", token);
        localStorage.setItem("type", type);
        localStorage.setItem("exp", exp);

        if (type === "users") {
          navigate("/clientdash/");
        } else if (type === "admin") {
          navigate("/admin-dashboard");
        } else if (type === "billmngr") {
          navigate("/bill-dashboard");
        } else {
          navigate("/login");
        }
      } else {
        console.log("Login failed: ");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
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
        height: "90vh",
        margin: "0",
      }}
    >
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-between ">
          <div className="col-12 col-lg-6 text-start text-lg-left mb-5 mb-lg-0 ">
            <div
              className={`hero text-white ${show ? "show" : ""}`}
              style={{ padding: "20px" }}
            >
              <h1 style={{ fontSize: "2.5rem" }}>Casiguran Water District</h1>
              <p className="motto" style={{ fontSize: "1.2rem" }}>
                "Serbisyong Bulahos Para sa Gabos"
              </p>
              <p
                className="welcome-message"
                style={{ fontSize: "1rem", lineHeight: "1.5" }}
              >
                Welcome to the Casiguran Water District Customer Portal. Easily
                access your account, view your bills, and stay updated with SMS
                notifications for a seamless water service experience.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-5 d-flex justify-content-center ">
            <Card
              style={{
                width: "100%",
                maxWidth: "30rem",
                backgroundColor: "#78A7FF",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Card.Body className="p-3 p-md-4">
                <main className="form-signin w-100">
                  <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-center mb-5">
                      Login
                    </h1>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingUsername"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Account Name</label>
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
                    <button
                      className="btn btn-primary w-100 py-2"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <div className="form-check text-center mt-4 ">
                      <p>
                        Don't have an account?
                        <Link to="/register">
                          <a href="">Sign up</a>
                        </Link>
                      </p>
                    </div>
                  </form>
                </main>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
