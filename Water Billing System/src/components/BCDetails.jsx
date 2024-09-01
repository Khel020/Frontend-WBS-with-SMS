import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BillingDetails = () => {
  const [billdetails, setBillDetails] = useState([]);
  const [error, setError] = useState(null); // Add state for errors

  const backend = import.meta.env.VITE_BACKEND;
  const { billNumber } = useParams();

  useEffect(() => {
    const fetchBillNum = async () => {
      try {
        const response = await fetch(
          `${backend}/biller/getBillbyBillNum/${billNumber}`
        );
        if (!response.ok) {
          throw new Error("No bills found");
        }
        const data = await response.json(); // Await the JSON parsing
        console.log("data from fetch", data);
        setBillDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBillNum();
  }, [backend, billNumber]); // Add dependencies to useEffect

  return (
    <>
      <div className="card">
        <div
          className="card-header text-white text-center"
          style={{
            backgroundColor: "#2E4874",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          November 16, 2022 - December 15, 2023
        </div>
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Display error message */}
          <table className="table table-bordered border-dark text-center">
            <thead>
              <tr>
                <th>Detail</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="text-start">
              {billdetails.map((details, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <b>Reading Date:</b>
                    </td>
                    <td>{details.reading_date}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Due Date:</b>
                    </td>
                    <td>{details.due_date}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Previous Reading:</b>
                    </td>
                    <td>{details.prev_read}</td>{" "}
                    {/* Use dynamic value if available */}
                  </tr>
                  <tr>
                    <td>
                      <b>Present Reading:</b>
                    </td>
                    <td>{details.present_read}</td>{" "}
                    {/* Use dynamic value if available */}
                  </tr>
                  <tr>
                    <td>
                      <b>Consumption:</b>
                    </td>
                    <td>{details.consumption} cu m.</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Amount:</b>
                    </td>
                    <td>{details.totalAmount}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Water Meter Balance:</b>
                    </td>
                    <td>{details.water_meter_balance}</td>{" "}
                    {/* Use dynamic value if available */}
                  </tr>
                  <tr>
                    <td>
                      <b>Others:</b>
                    </td>
                    <td>{details.others}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Remarks:</b>
                    </td>
                    <td>{details.remarks}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Amount Paid:</b>
                    </td>
                    <td>{details.paymentAmount}</td>{" "}
                    {/* Use dynamic value if available */}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <a href="#" className="btn btn-primary mt-3">
        <i className="bi bi-arrow-left-circle"></i> Go Back
      </a>
    </>
  );
};

export default BillingDetails;
