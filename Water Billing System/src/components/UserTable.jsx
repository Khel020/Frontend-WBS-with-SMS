import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1020/user/users")
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
        class="table-responsive"
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Account Number</th>
              <th scope="col">Account Name</th>
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
                  <td>{data.acc_name}</td>
                  <td>{data.contact}</td>
                  <td>{data.meter_num}</td>
                  <td>{data.email}</td>
                  <td></td>
                  <td className="text-center">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <i
                        className="bi bi-pencil-square"
                        onClick={handleShow1}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "#D3BB01",
                        }}
                      ></i>
                      <i
                        className="bi bi-archive"
                        onClick={handleShow2}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "#EE4547",
                        }}
                      ></i>
                      <i
                        className="bi bi-eye"
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "#04BABA",
                        }}
                      ></i>
                    </div>
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
            <form class="row g-3">
              <div class="col-md-4">
                <label for="validationServer01" class="form-label">
                  First name
                </label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="validationServer01"
                  value="Mark"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="col-md-4">
                <label for="validationServer02" class="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="validationServer02"
                  value="Otto"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="col-md-4">
                <label for="validationServerUsername" class="form-label">
                  Account Number
                </label>
                <div class="input-group has-validation">
                  <input
                    type="text"
                    class="form-control is-invalid"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    class="invalid-feedback"
                  >
                    Please choose a username.
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <label for="validationServer03" class="form-label">
                  Baranggay
                </label>
                <input
                  type="text"
                  class="form-control is-invalid"
                  id="validationServer03"
                  aria-describedby="validationServer03Feedback"
                  required
                />
                <div id="validationServer03Feedback" class="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>
              <div class="col-md-4">
                <label for="validationServer04" class="form-label">
                  House Number
                </label>
                <input
                  type="number"
                  class="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  min={1}
                  placeholder="000"
                />
                <div id="validationServer04Feedback" class="invalid-feedback">
                  Please select a valid state.
                </div>
              </div>
              <div class="col-md-4">
                <label for="validationServer05" class="form-label">
                  Purok
                </label>
                <input
                  type="number"
                  class="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div id="validationServer05Feedback" class="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>
              <div class="col-md-7">
                <label for="validationServer05" class="form-label">
                  Contact
                </label>
                <input
                  type="number"
                  class="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div id="validationServer05Feedback" class="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>
              <div class="col-md-5">
                <label for="validationServer05" class="form-label">
                  Meter Number
                </label>
                <input
                  type="number"
                  class="form-control is-invalid"
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  placeholder="0"
                  min={1}
                  max={5}
                />
                <div id="validationServer05Feedback" class="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom04" class="form-label">
                  Status
                </label>
                <select class="form-select" id="validationCustom04" required>
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div id="validationServer05Feedback" class="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom04" class="form-label">
                  Client Type
                </label>
                <select class="form-select" id="validationCustom04" required>
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div id="validationServer05Feedback" class="invalid-feedback">
                  Please provide a valid zip.
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input is-invalid"
                    type="checkbox"
                    value=""
                    id="invalidCheck3"
                    aria-describedby="invalidCheck3Feedback"
                    required
                  />
                  <label class="form-check-label" for="invalidCheck3">
                    Agree to terms and conditions
                  </label>
                  <div id="invalidCheck3Feedback" class="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="submit">
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
