import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListIcon from "@mui/icons-material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const AdminDash = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
        </div>
        <Container fluid>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="dash-card category-card">
                <Card.Body className="dash-card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <ListIcon className="dash-card-icon me-2" />
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
                    <PeopleAltIcon className="dash-card-icon me-2" />
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
                    <HourglassTopIcon className="dash-card-icon me-2" />
                    <span>Pending</span>
                  </div>
                  <p className="dash-card-value mt-auto mb-0 text-end">10</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default AdminDash;
