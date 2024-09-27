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
          height: auto;
          position: relative;
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          margin-top: 50px;
          padding: 40px;
        }
        .dynamic {
          position: absolute;
        }
        /* Header Section */
        .name {
          top: 10mm;
          left: 10mm;
          margin-bottom: 5mm;
        }
        .acc-number {
          top: 10mm;
          right: 10mm;
          position: absolute;
          margin-bottom: 5mm;
        }
        .address {
          top: 18mm;
          left: 10mm;
          margin-bottom: 5mm;
        }

        /* Payment Breakdown Section */
        .breakdown-title {
          top: 35mm;
          left: 10mm;
          margin-bottom: 3mm;
        }
        .current, .arrears, .others, .pca, .fca, .lca {
          margin-bottom: 3mm;
        }
        .current {
          top: 40mm;
          left: 10mm;
        }
        .arrears {
          top: 47mm;
          left: 10mm;
        }
        .others {
          top: 54mm;
          left: 10mm;
        }
        .pca {
          top: 61mm;
          left: 10mm;
        }
        .fca {
          top: 68mm;
          left: 10mm;
        }
        .lca {
          top: 75mm;
          left: 10mm;
        }

        /* Amount Due Section */
        .amount-due-title {
          top: 35mm;
          right: 50mm;
          position: absolute;
          margin-bottom: 15mm;
        }
        .amount {
          right: 10mm;
          position: absolute;

        }
        .sc-discount {
          top: 47mm;
          right: 50mm;
        }
        .tendered {
            top: 54mm;
          right: 50mm;
        }
        .paid {
          top: 61mm;
          right: 50mm;
        }
        .change {
          top: 68mm;
          right: 50mm;
        }
        .balance {
          top: 75mm;
          right: 50mm;
        }

        /* Footer Section */
        .biller-name {
          top: 90mm;
          left: 10mm;
          margin-top: 10mm;
        }
        .payment-date {
          top: 90mm;
          right: 10mm;
          position: absolute;
          margin-top: 10mm;
        }
      `}</style>

      {/* Header */}
      <p className="dynamic name"> {name}</p>
      <p className="dynamic acc-number">{acc_number}</p>
      <p className="dynamic address"> {address}</p>
      {/* Payment Breakdown */}
      <p className="dynamic breakdown-title">Payment Breakdown:</p>
      <p className="dynamic current">
        Current Amount: <span className="amount">{currentBillAmount}</span>
      </p>
      <p className="dynamic arrears">
        Arrears: <span className="amount">{arrears}</span>
      </p>
      <p className="dynamic others">
        Others: <span className="amount">{others}</span>
      </p>
      <p className="dynamic pca">
        PCA: <span className="amount">{pca}</span>
      </p>
      <p className="dynamic fca">
        FCA: <span className="amount">{fca}</span>
      </p>
      <p className="dynamic lca">
        LCA: <span className="amount">{lca}</span>
      </p>

      {/* Amount Due */}
      <p className="dynamic amount-due-title">Amount Due:</p>
      <p className="dynamic sc-discount">
        SC Discount: <span className="amount">{scDiscount}</span>
      </p>
      <p className="dynamic tendered">
        Tendered: <span className="amount">{tendered}</span>
      </p>
      <p className="dynamic paid">
        Paid: <span className="amount">{amountpaid}</span>
      </p>
      <p className="dynamic change">
        Change: <span className="amount">{change}</span>
      </p>
      <p className="dynamic balance">
        Balance: <span className="amount">{balance}</span>
      </p>

      {/* Footer */}
      <p className="dynamic biller-name">Biller Name: {billerName}</p>
      <p className="dynamic payment-date">Payment Date: {paymentDate}</p>
    </div>
  );
});

export default ReceiptComponent;
