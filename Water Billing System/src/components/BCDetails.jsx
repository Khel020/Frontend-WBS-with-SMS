import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BillingDetails = () => {
  const [billdetails, setBillDetails] = useState([
    {
      acc_num: " ",
      reading_date: " ",
      due_date: " ",
      accountName: " ",
      consumption: " ",
      dc_date: " ",
      category: " ",
      totalAmount: " ",
      rate: " ",
      p_charge: " ",
      others: " ",
      remarks: " ",
    },
  ]);
  console.log(billdetails);

  const backend = import.meta.env.VITE_BACKEND;
  const { billNumber } = useParams();

  useEffect(() => {
    const fetchBillNum = async () => {
      const response = await fetch(
        `${backend}/biller/getBillbyBillNum/${billNumber}`
      );
      if (!response.ok) {
        return { Message: "No bills found" };
      }
      const data = response.json();
      console.log("data from fetch", data);
      setBillDetails(data);
    };
    fetchBillNum();
  }, []);
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
          <table className="table table-bordered border-dark text-center">
            <tbody>
              <tr>
                <td>
                  <b>Reading Date:</b> {billdetails.reading_date}
                </td>
                <td>
                  <b>Due Date:</b> January 01, 2023 (Sunday)
                </td>
              </tr>
              <tr>
                <td>
                  <b>Previous Reading:</b> O cu m.
                </td>
                <td>
                  <b>Present Reading:</b> 20 cu m.
                </td>
              </tr>
              <tr>
                <td>
                  <b>Consumption</b>: 20 cu m.
                </td>
                <td>
                  <b>Total Amount:</b> 732.00
                </td>
              </tr>
              <tr>
                <td>
                  <b>Water Meter Balance:</b> 0.00
                </td>
                <td>
                  <b>Others:</b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Remarks:</b> Unreadable Meter
                </td>
                <td>
                  <b>Amount Paid:</b> 732.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <a href="#" class="btn btn-primary mt-3">
        <i class="bi bi-arrow-left-circle"></i> Go Back
      </a>
    </>
  );
};

export default BillingDetails;
