import React from "react";

const tableStyle = {
  fontSize: "0.5rem",
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
                Date
              </th>
              <th scope="col" className="text-center">
                Due Date
              </th>
              <th scope="col" className="text-center">
                Total Amount
              </th>
              <th scope="col" className="text-center">
                Payment History
              </th>
              <th scope="col" className="text-center">
                Remaining Amount
              </th>
              <th scope="col" className="text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center">023-956-234</th>
              <td className="text-center">Diamond Abihin</td>
              <td className="text-center">023-456</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">diamond@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
            <tr>
              <th className="text-center">023-234-456</th>
              <td className="text-center">Errol Christian Aurelio</td>
              <td className="text-center">356-234</td>
              <td className="text-center">Active</td>
              <td className="text-center">Commercial</td>
              <td className="text-center">EErolchrist@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
