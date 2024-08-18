import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/Sidebar.jsx";
import { Container, Row, Col, Card } from "react-bootstrap";

import "../../styles/Dashboard.css";

export default function BillerDash() {
  const consumptions = [
    { name: "January", water: "200" },
    { name: "Febuary", water: "10" },
    { name: "March", water: "2" },
    { name: "April", water: "3" },
    { name: "May", water: "5" },
    { name: "June", water: "6" },
    { name: "July", water: "8" },
    { name: "August", water: "1" },
    { name: "September", water: "200" },
    { name: "October", water: "100" },
    { name: "November", water: "200" },
    { name: "December", water: "200" },
  ];
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div
      className="listclient d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
          <h1 className="h2">Dashboard</h1>
        </div>
        <Container fluid>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="dash-card category-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Categories</span>
                  </div>
                  <p className="dash-card-value mt-auto mb-0 text-end">2</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card clients-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Total Clients</span>
                  </div>
                  <p className="dash-card-value mt-auto mb-0 text-end">20K</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="dash-card pending-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span>Pending</span>
                  </div>
                  <p className="dash-card-value mt-auto mb-0 text-end">10</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <LineChart
                width={500}
                height={300}
                data={consumptions}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="water" stroke="#82ca9d" />
              </LineChart>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
