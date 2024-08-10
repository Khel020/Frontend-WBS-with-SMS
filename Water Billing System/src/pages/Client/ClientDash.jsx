import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const ClientDash = () => {
  return (
    <div>
      <header
        class="p-3 mb-3 border-bottom"
        style={{ backgroundColor: "#22A470" }}
      >
        <div class="container-fluid">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-center ">
            <a
              href="/"
              class="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none text-white"
            >
              Client Portal
            </a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content mb-md-0 mx-5 ">
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis text-white">
                  Your Bills
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis text-white">
                  Service Request
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis text-white">
                  Payment History
                </a>
              </li>
            </ul>

            <form
              class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 mx-3 text-white "
              role="search"
            >
              <input
                type="search"
                class="form-control  "
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <div className="mx-3">
              <i
                class="bi bi-bell-fill text-white"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ClientDash;
