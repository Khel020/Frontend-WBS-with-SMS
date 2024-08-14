import React from "react";

const tableStyle = {
  fontSize: "0.9rem",
};

function Table() {
  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered" style={tableStyle}>
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                Tittle
              </th>
              <th scope="col" className="text-center">
                Message
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">
                The phrase "send a message" or "sending a message" is also used
                for actions taken by a party to convey that party's attitude
                towards a certain thing. For example, a government that executes
                people who commit acts of treason is sending a message that
                treason will not be tolerated.[5] Conversely, a party that
                appears through its actions to endorse something that it opposes
                can be said to be "sending the wrong message",[5] while one
                which appears to simultaneously endorse contradictory things can
                be said to be sending "mixed messages"
              </td>
              <td className="text-center">
                <button type="button" className="btn btn-success btn-sm">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger btn-sm ms-1">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">
                The phrase "send a message" or "sending a message" is also used
                for actions taken by a party to convey that party's attitude
                towards a certain thing. For example, a government that executes
                people who commit acts of treason is sending a message that
                treason will not be tolerated.[5] Conversely, a party that
                appears through its actions to endorse something that it opposes
                can be said to be "sending the wrong message",[5] while one
                which appears to simultaneously endorse contradictory things can
                be said to be sending "mixed messages"
              </td>
              <td className="text-center">
                <button type="button" className="btn btn-success btn-sm">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger btn-sm ms-1">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">
                The phrase "send a message" or "sending a message" is also used
                for actions taken by a party to convey that party's attitude
                towards a certain thing. For example, a government that executes
                people who commit acts of treason is sending a message that
                treason will not be tolerated.[5] Conversely, a party that
                appears through its actions to endorse something that it opposes
                can be said to be "sending the wrong message",[5] while one
                which appears to simultaneously endorse contradictory things can
                be said to be sending "mixed messages"
              </td>
              <td className="text-center">
                <button type="button" className="btn btn-success btn-sm">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger btn-sm ms-1">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">
                The phrase "send a message" or "sending a message" is also used
                for actions taken by a party to convey that party's attitude
                towards a certain thing. For example, a government that executes
                people who commit acts of treason is sending a message that
                treason will not be tolerated.[5] Conversely, a party that
                appears through its actions to endorse something that it opposes
                can be said to be "sending the wrong message",[5] while one
                which appears to simultaneously endorse contradictory things can
                be said to be sending "mixed messages"
              </td>
              <td className="text-center">
                <button type="button" className="btn btn-success btn-sm">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger btn-sm ms-1">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
