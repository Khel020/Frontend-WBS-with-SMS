import React, { useState } from "react";
import { Carousel, Card, Container, Row, Col, Button } from "react-bootstrap";
import { FiArrowUpCircle } from "react-icons/fi";

const Home = () => {
  // State to manage "Read More" for Mandate Card
  const [showMoreMandate, setShowMoreMandate] = useState(false);

  // State to manage "Read More" for Vision Card
  const [showMoreVision, setShowMoreVision] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel className="my-5 px-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image1.png" // Replace with your image URL
            alt="First slide"
            style={{ height: "30rem" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image2.png" // Replace with your image URL
            alt="Second slide"
            style={{ height: "30rem" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Pictures/Image3.jpg" // Replace with your image URL
            alt="Third slide"
            style={{ height: "30rem" }}
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
                borderRadius: "10px",
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
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
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  padding: "1rem",
                }}
              >
                MISSION
              </Card.Header>
              <Card.Body style={{ padding: "20px" }}>
                <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
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
                borderRadius: "10px",
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
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
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  padding: "1rem",
                }}
              >
                VISION
              </Card.Header>
              <Card.Body style={{ padding: "20px" }}>
                <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {showMoreVision
                    ? "The Casiguran Water District works towards a dynamic, reliable, and self-sustaining water utility, using its resources for the optimum satisfaction of its concessionaires."
                    : "The Casiguran Water District works towards a dynamic, reliable, and self-sustaining water utility..."}
                  <span
                    style={{ cursor: "pointer", color: "#024CAA" }}
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
                borderRadius: "10px",
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
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
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  padding: "1rem",
                }}
              >
                MANDATE
              </Card.Header>
              <Card.Body style={{ padding: "20px" }}>
                <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {showMoreMandate
                    ? "Pursuant to Presidential Decree No. 198 (Provincial Water Utilities Act of 1973), the Casiguran Water District was formed for the purpose of the following: Acquiring, installing, improving, maintaining and operating water supply and distribution systems for domestic, industrial, municipal and agricultural uses for residents and lands within the boundaries of such districts; Conducting such other functions and operations incidental to water resource development, utilization and disposal within such districts, as are necessary or incidental to said purpose. (Presidential Decree No. 198, Chapter II, Sec. 5)"
                    : "Pursuant to Presidential Decree No. 198 (Provincial Water Utilities Act of 1973), the Casiguran Water District was formed for the purpose of..."}
                  <span
                    style={{ cursor: "pointer", color: "#024CAA" }}
                    onClick={() => setShowMoreMandate(!showMoreMandate)}
                  >
                    {showMoreMandate ? " Read Less" : " Read More"}
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
                borderRadius: "10px",
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
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
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  padding: "1rem",
                }}
              >
                SERVICE PLEDGE
              </Card.Header>
              <Card.Body style={{ padding: "20px" }}>
                <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  “SERBISYONG BULAHOS PARA SA GABOS”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "#024CAA",
          color: "#fff",
          textAlign: "center",
          padding: "1rem 0",
          marginTop: "2rem",
        }}
      >
        <p>© 2024 Casiguran Water District. All Rights Reserved.</p>
      </footer>

      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#024CAA",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 15px",
          zIndex: 1000,
        }}
      >
        <FiArrowUpCircle style={{ fontSize: "20px" }} />
      </Button>
    </div>
  );
};

export default Home;
