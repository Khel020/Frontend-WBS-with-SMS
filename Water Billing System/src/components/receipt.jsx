import React from "react";

const ReceiptComponent = React.forwardRef((props, ref) => {
  const {
    acc_number,
    name,
    address,
    currentBillAmount,
    arrears,
    others,
    pca,
    fca,
    lca,
    amountpaid,
    change,
    balance,
    billerName,
    paymentDate,
    scDiscount,
    tendered,
  } = props.details || {};

  return (
    <div ref={ref} className="receipt-container">
      <style>{`
        .receipt-container {
          width: 100%;
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          margin-top: 50px;
          padding: 40px;
        }
        .dynamic {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .title {
          font-weight: bold;
          margin-top: 10px;
          text-align: left;
        }
        .footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>

      {/* Header */}
      <p className="dynamic">
        <span>Name:</span> <span>{name}</span>
      </p>
      <p className="dynamic">
        <span>Account Number:</span> <span>{acc_number}</span>
      </p>
      <p className="dynamic">
        <span>Address:</span> <span>{address}</span>
      </p>

      {/* Payment Breakdown */}
      <p className="title">Payment Breakdown:</p>
      <p className="dynamic">
        <span>Current Amount:</span> <span>{currentBillAmount}</span>
      </p>
      <p className="dynamic">
        <span>Arrears:</span> <span>{arrears}</span>
      </p>
      <p className="dynamic">
        <span>Others:</span> <span>{others}</span>
      </p>
      <p className="dynamic">
        <span>PCA:</span> <span>{pca}</span>
      </p>
      <p className="dynamic">
        <span>FCA:</span> <span>{fca}</span>
      </p>
      <p className="dynamic">
        <span>LCA:</span> <span>{lca}</span>
      </p>

      {/* Amount Due */}
      <p className="title">Amount Due:</p>
      <p className="dynamic">
        <span>SC Discount:</span> <span>{scDiscount}</span>
      </p>
      <p className="dynamic">
        <span>Tendered:</span> <span>{tendered}</span>
      </p>
      <p className="dynamic">
        <span>Paid:</span> <span>{amountpaid}</span>
      </p>
      <p className="dynamic">
        <span>Change:</span> <span>{change}</span>
      </p>
      <p className="dynamic">
        <span>Balance:</span> <span>{balance}</span>
      </p>

      {/* Footer */}
      <div className="footer">
        <p>Biller Name: {billerName}</p>
        <p>Payment Date: {paymentDate}</p>
      </div>
    </div>
  );
});

export default ReceiptComponent;
