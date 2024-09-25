import React from "react";

const ReceiptComponent = React.forwardRef((props, ref) => {
  const {
    acc_number,
    name,
    balance,
    amountpaid,
    paymentDate,
    change,
    OR_NUM,
    address,
  } = props.details || {}; // Use props.details for better compatibility
  return (
    <div ref={ref} style={styles.container}>
      <header style={styles.header}>
        <p style={styles.subtitle}>Republic of the Philippines</p>
        <h1 style={styles.title}>CASIGURAN WATER DISTRICT</h1>
        <p style={styles.subtitle}>Central Casiguran Sorsogon</p>
        <p style={styles.subtitle}>Non-VAT Req. TIN 004-202-667-00000</p>
        <p style={styles.title} className="text-danger">
          OFFICIAL RECEIPT NO. {OR_NUM}
        </p>
      </header>
      <div style={styles.infoSection}>
        <p style={styles.infoItem}>Acct No. {acc_number}</p>
        <p style={styles.infoItem}>Name: {name}</p>
        <p style={styles.infoItem}>Address: {address}</p>
        <p style={styles.infoItem}>Balance: {balance}</p>
        <p style={styles.infoItem}>Paid: {amountpaid}</p>
        <p style={styles.infoItem}>Date: {paymentDate}</p>
        <p style={styles.infoItem}>Change: {change}</p>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          For inquiries, contact us at [Your Contact Information].
        </p>
      </footer>
    </div>
  );
});

const styles = {
  container: {
    padding: "5px",
    border: "none",
    borderRadius: "0",
    width: "100mm", // Adjust width for continuous form paper
    margin: "0 auto",
    fontFamily: "'Courier New', Courier, monospace", // Better font for dot matrix printing
    fontSize: "10px",
  },
  header: {
    paddingBottom: "5px",
    marginBottom: "5px",
    textAlign: "center",
  },
  title: {
    fontSize: "12px",
    margin: "0",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "8px",
    margin: "2px 0 0",
    color: "#555",
  },
  infoSection: {
    margin: "5px 0",
    border: "1px solid",
  },
  infoItem: {
    marginBottom: "3px",
    fontSize: "10px",
  },
  footer: {
    paddingTop: "5px",
    marginTop: "5px",
    textAlign: "center",
    fontSize: "8px",
    color: "#555",
  },
  footerText: {
    margin: "0",
  },
};

export default ReceiptComponent;
