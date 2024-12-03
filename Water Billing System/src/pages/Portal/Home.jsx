import React, { useState } from "react";
import {
  Carousel,
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { FiArrowUpCircle } from "react-icons/fi";

const Home = () => {
  const [showMoreMandate, setShowMoreMandate] = useState(false);
  const [showMoreVision, setShowMoreVision] = useState(false);
  const [waterUsage, setWaterUsage] = useState(0);
  const [billAmount, setBillAmount] = useState(0);

  const calculateBill = () => {
    // Assuming a basic formula for the bill calculation based on water usage
    const rate = 5; // Example rate per cubic meter
    const calculatedBill = waterUsage * rate;
    setBillAmount(calculatedBill);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Carousel Section */}
      <Carousel className="my-5 px-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image1.png"
            alt="First slide"
            style={{
              height: "30rem",
              objectFit: "fill",
              borderRadius: "8px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image2.png"
            alt="Second slide"
            style={{ height: "30rem", objectFit: "fill", borderRadius: "8px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image3.jpg"
            alt="Third slide"
            style={{ height: "30rem", objectFit: "fill", borderRadius: "8px" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Mission, Vision, Values, and Service Pledge Section */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={3}>
            <Card
              className="h-100"
              style={{
                border: "none",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                backgroundColor: "#F5F8FC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Header
                style={{
                  backgroundColor: "#003161",
                  color: "#fff",
                  textAlign: "start",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  padding: "1.2rem",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                MISSION
              </Card.Header>
              <Card.Body style={{ padding: "25px" }}>
                <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  To provide safe, reliable, and affordable water services for
                  our community.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100"
              style={{
                border: "none",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                backgroundColor: "#F5F8FC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Header
                style={{
                  backgroundColor: "#003161",
                  color: "#fff",
                  textAlign: "start",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  padding: "1.2rem",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                VISION
              </Card.Header>
              <Card.Body style={{ padding: "25px" }}>
                <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  {showMoreVision
                    ? "The Casiguran Water District works towards a dynamic, reliable, and self-sustaining water utility, using its resources for the optimum satisfaction of its concessionaires."
                    : "The Casiguran Water District works towards a dynamic, reliable, and self-sustaining water utility..."}
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#024CAA",
                      fontWeight: "600",
                    }}
                    onClick={() => setShowMoreVision(!showMoreVision)}
                  >
                    {showMoreVision ? " Read Less" : " Read More"}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100"
              style={{
                border: "none",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                backgroundColor: "#F5F8FC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Header
                style={{
                  backgroundColor: "#003161",
                  color: "#fff",
                  textAlign: "start",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  padding: "1.2rem",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                VALUES
              </Card.Header>
              <Card.Body style={{ padding: "25px" }}>
                <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  Integrity, Service Excellence, Accountability, Teamwork,
                  Innovation
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100"
              style={{
                border: "none",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                backgroundColor: "#F5F8FC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Header
                style={{
                  backgroundColor: "#003161",
                  color: "#fff",
                  textAlign: "start",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  padding: "1.2rem",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                SERVICE PLEDGE
              </Card.Header>
              <Card.Body style={{ padding: "25px" }}>
                <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  To provide quality water services to our customers with utmost
                  responsibility, integrity, and dedication.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Scroll to Top Button */}
      <div
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          backgroundColor: "#003161",
          color: "#fff",
          borderRadius: "50%",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FiArrowUpCircle size={32} />
      </div>
    </div>
  );
};

export default Home;
