import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PrintReceipt = ({ paymentDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Receipt</Text>
        <Text>Date: {paymentDetails.date}</Text>
        <Text>Amount Paid: {paymentDetails.amount}</Text>
        <Text>Receipt Number: {paymentDetails.receiptNumber}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default PrintReceipt;
