import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../../styles/about-us.css";
const ContactUs = () => {
  return (
    <div
      style={{
        height: "91vh",
        width: "100%",
      }}
    >
      <div className="d-flex ">
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>
              <Card className="mx-auto">
                <Row className="g-0">
                  <Col md={6}>
                    <Card.Body
                      style={{
                        backgroundColor: "#0B6481",
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                      className="h-100"
                    >
                      <Card.Title className="text-white mb-4 fs-4 fw-bold">
                        Contact us
                      </Card.Title>
                      <ul
                        className="list-unstyled text-white mb-0"
                        style={{ marginTop: "1rem" }}
                      >
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill me-3 fs-5"></i>
                          <span>V2F5+883, Casiguran, Sorsogon</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-envelope-fill me-3 fs-5"></i>
                          <span>casiguranwd1988@gmail.com</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-telephone-fill me-3 fs-5"></i>
                          <span>+639172095367</span>
                        </li>
                      </ul>
                      <div className="mt-auto pt-4">
                        <i className="bi bi-facebook text-white fs-4 mx-3"></i>
                        <i className="bi bi-envelope text-white fs-4 mx-3"></i>
                        <i className="bi bi-instagram text-white fs-4 mx-3"></i>
                      </div>
                    </Card.Body>
                  </Col>
                  <Col md={6}>
                    <Card.Body
                      style={{ backgroundColor: "#F6BC9B", padding: "2rem" }}
                      className="h-100"
                    >
                      <Card.Title className="fs-4 mb-3">
                        Get in touch
                      </Card.Title>
                      <Card.Subtitle className="mb-3 text-muted">
                        Feel free to get in touch with us.
                      </Card.Subtitle>
                      <Form>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="inputEmail4"
                        >
                          <Form.Label column sm={3} className="text-start">
                            Name:
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="text" size="sm" />
                          </Col>

                          <Form.Label column sm={3} className="text-start">
                            Email:
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="email" size="sm" />
                          </Col>
                          <Form.Label column sm={3} className="text-start">
                            Message:
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control as="textarea" rows={3} size="sm" />
                          </Col>
                        </Form.Group>
                        <div className="text-center mt-4">
                          <Button
                            style={{
                              backgroundColor: "#7EABA",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "5px",
                            }}
                          >
                            Send
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
