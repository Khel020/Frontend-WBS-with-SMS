import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    axios
      .get(`${backend}/user/users`)
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const [edit, setEdit] = useState(false);

  const handleClose1 = () => setEdit(false);
  const handleShow1 = () => setEdit(true);

  const [archive, setArchive] = useState(false);

  const handleClose2 = () => setArchive(false);
  const handleShow2 = () => setArchive(true);

  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-success text-center">
            <tr>
              <th scope="col">Account Number</th>
              <th scope="col">Username</th>
              <th scope="col">Contact</th>
              <th scope="col">Meter No.</th>
              <th scope="col">Email</th>
              <th scope="col">Usertype</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{data.acc_num}</th>
                  <td>{data.username}</td>
                  <td>{data.contact}</td>
                  <td>{data.meter_num}</td>
                  <td>{data.email}</td>
                  <td>{data.usertype}</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-info btn-sm ms-1">
                      <i
                        className="bi bi-pencil-square"
                        onClick={handleShow1}
                      ></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-1"
                    >
                      <i
                        className="bi bi-archive-fill"
                        onClick={handleShow2}
                      ></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm ms-1"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EditModal */}
      <Modal show={edit} onHide={handleClose1} animation={true} style={{}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-3">
            <form className="row g-3">
              <div className="col-md-6">
                <label for="validationServer01" className="form-label">
                  Account Name
                </label>
                <input
                  type="text"
                  className="form-control is-valid"
                  id="validationServer01"
                  value="Mark"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-4">
                <label for="validationServer02" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control is-valid"
                  id="validationServer02"
                  value="Otto"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <label for="validationServerUsername" className="form-label">
                  Account Number
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control is-invalid"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    Please choose a username.
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label for="validationServer03" className="form-label">
                  Baranggay
                </label>
                <input
                  type="text"
                  className="form-control is-invalid"
                  id="validationServer03"
                  aria-describedby="validationServer03Feedback"
                  required
                />
                <div
                  id="validationServer03Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid city.
                </div>
              </div>
              <div className="col-md-4">
                <label for="validationServer04" className="form-label">
                  House Number
                </label>
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  min={1}
                  placeholder="000"
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please select a valid state.
                </div>
              </div>
              <div className="col-md-4">
                <label for="validationServer05" className="form-label">
                  Purok
                </label>
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div
                  id="validationServer05Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid zip.
                </div>
              </div>
              <div className="col-md-7">
                <label for="validationServer05" className="form-label">
                  Contact
                </label>
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div
                  id="validationServer05Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid zip.
                </div>
              </div>
              <div className="col-md-5">
                <label for="validationServer05" className="form-label">
                  Meter Number
                </label>
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div
                  id="validationServer05Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid zip.
                </div>
              </div>
              <div className="col-md-6">
                <label for="validationCustom04" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="validationCustom04"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div
                  id="validationServer05Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid zip.
                </div>
              </div>
              <div className="col-md-6">
                <label for="validationCustom04" className="form-label">
                  Client Type
                </label>
                <select
                  className="form-select"
                  id="validationCustom04"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div
                  id="validationServer05Feedback"
                  className="invalid-feedback"
                >
                  Please provide a valid zip.
                </div>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input is-invalid"
                    type="checkbox"
                    value=""
                    id="invalidCheck3"
                    aria-describedby="invalidCheck3Feedback"
                    required
                  />
                  <label className="form-check-label" for="invalidCheck3">
                    Agree to terms and conditions
                  </label>
                  <div id="invalidCheck3Feedback" className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Archive Modal */}
      <Modal show={archive} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Archive</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UserTable;
