import React from "react";

const tableStyle = {
  fontSize: "0.9rem",
};

function Table() {
  const tableData = [
    {
      select: <input type="checkbox" />,
      meterNo: "023-456",
      readingDate: "2023-08-15",
      dueDate: "2023-09-15",
      name: "Diamond Abihin",
      amountDue: "$150.00",
      paymentStatus: "Unpaid",
      paymentType: "Cash",
    },
    // Add more data objects here for additional rows
  ];

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
                Select
              </th>
              <th scope="col" className="text-center">
                Meter No.
              </th>
              <th scope="col" className="text-center">
                Reading Date
              </th>
              <th scope="col" className="text-center">
                Due Date
              </th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Amount Due
              </th>
              <th scope="col" className="text-center">
                Payment Status
              </th>
              <th scope="col" className="text-center">
                Payment Type
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.select}</td>
                <td className="text-center">{row.meterNo}</td>
                <td className="text-center">{row.readingDate}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.amountDue}</td>
                <td className="text-center">{row.paymentStatus}</td>
                <td className="text-center">{row.paymentType}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-success btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-1">
                    <i className="bi bi-printer"></i>
                  </button>
                  <button type="button" className="btn btn-info btn-sm ms-1">
                    <i class="bi bi-currency-dollar"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
