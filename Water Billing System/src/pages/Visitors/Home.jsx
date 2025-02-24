import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [showMoreMandate, setShowMoreMandate] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("tkn");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${backend}/token/tokenCheck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          switch (data.usertype) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "cashier":
              navigate("/bill-dashboard");
              break;
            case "data entry staff":
              navigate("/staff-dashboard");
              break;
            case "Information Tech":
              navigate("/it-dashboard");
              break;
            case "CS_Officer":
              navigate("/cs-consumers");
              break;
            case "users":
              navigate("/clientdash");
              break;
            default:
              localStorage.clear();
              navigate("/");
          }
        } else {
          localStorage.clear();
          navigate("/");
        }
      } catch (err) {
        console.error("Error during token validation:", err);
        localStorage.clear();
        navigate("/");
      }
    };

    validateToken();
  }, [navigate]);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    transition: "opacity 0.3s ease",
    cursor: "pointer",
    display: "block",
    marginBottom: "10px",
  };

  const ulStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
  };

  const contactTextStyle = {
    marginBottom: "10px",
  };
  const cardStyle = (isHovered) => ({
    height: "100%",
    border: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-10px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 10px 20px rgba(0,0,0,0.1)"
      : "0 4px 6px rgba(0,0,0,0.05)",
    backgroundColor: isHovered ? "#ffffff" : "#ffffff",
  });

  const titleStyle = {
    color: "#16A085",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const cardBodyStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#16A085",
    border: "none",
    marginTop: "auto",
    transition: "all 0.3s ease",
  };

  return (
    <>
      <main>
        <section
          id="hero"
          className="hero section"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#009688",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="p-5">
            <Row className="align-items-center justify-content-between">
              <Col
                lg={6}
                className="order-2 order-lg-1"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out",
                }}
              >
                <div style={{ paddingRight: "40px" }}>
                  <h3
                    className="display-4 fw-bold mb-4"
                    style={{
                      transition: "all 0.5s ease-out",
                      animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
                    }}
                  >
                    Welcome to CWD Online Portal
                  </h3>
                  <p
                    className="lead mb-4"
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      transition: "all 0.5s ease-out",
                      animation: isVisible ? "fadeInUp 1s ease-out" : "none",
                    }}
                  >
                    Easily access your account, view your bills, and stay
                    updated with SMS notifications for a seamless water service
                    experience.
                  </p>
                  <div
                    className="d-flex gap-3 flex-wrap"
                    style={{
                      transition: "all 0.5s ease-out",
                      animation: isVisible ? "fadeInUp 1.2s ease-out" : "none",
                    }}
                  >
                    <Button
                      href="/register"
                      size="sm" // Smaller button size
                      style={{
                        borderRadius: "10px",
                        padding: "8px 16px", // Reduced padding for smaller buttons
                        transition: "all 0.3s ease",
                        backgroundColor: "#FFFFFF",
                        color: "#00838F",
                        border: "2px solid #FFFFFF",
                        fontSize: "14px", // Smaller text size
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.backgroundColor = "#00838F";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.color = "#00838F";
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      href="/login"
                      variant="outline-light"
                      size="sm" // Smaller button size
                      className="fw-semibold"
                      style={{
                        borderRadius: "10px",
                        padding: "8px 20px", // Reduced padding for smaller buttons
                        transition: "all 0.3s ease",
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        border: "2px solid #FFFFFF",
                        fontSize: "14px", // Smaller text size
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.color = "#00838F";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                    >
                      My Bills
                    </Button>
                  </div>
                </div>
              </Col>

              {/* Right Image */}
              <Col
                lg={5}
                className="order-1 order-lg-2 d-none d-lg-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(50px)",
                  transition: "all 1s ease-out",
                }}
              >
                <img
                  src="assets/img/file.png"
                  className="img-fluid"
                  alt="Hero Illustration"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    animation: isVisible
                      ? "float 3s ease-in-out infinite"
                      : "none",
                  }}
                />
              </Col>
            </Row>
          </div>

          <style>
            {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
          </style>
        </section>

        {/* Additional Information Section */}
        <section className="mt-5" id="about">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <div className="service-pledge-wrapper ">
                  <h2
                    className="mb-4 fw-bold"
                    style={{ color: "#16A085", fontSize: "40px" }}
                  >
                    About Us
                  </h2>
                  <div className="pledge-content">
                    <div className="mt-4">
                      <hr
                        className="mx-auto"
                        style={{
                          width: "50px",
                          height: "3px",
                          backgroundColor: "#16A085",
                          opacity: "1",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5 ">
          <Container>
            <Row className="g-4">
              {/* Mission Card */}
              <Col lg={4}>
                <div
                  onMouseEnter={() => setHoveredCard("mission")}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={cardStyle(hoveredCard === "mission")}
                >
                  <Card.Body style={cardBodyStyle}>
                    <h4 style={titleStyle}>Our Mission</h4>
                    <Card.Text style={{ color: "#4a5568" }}>
                      To provide clean and safe water to all communities in our
                      service areas. We aim to ensure the health and well-being
                      of our customers by delivering quality water with
                      sustainable management practices.
                    </Card.Text>
                  </Card.Body>
                </div>
              </Col>

              {/* Vision Card */}
              <Col lg={4}>
                <div
                  onMouseEnter={() => setHoveredCard("vision")}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={cardStyle(hoveredCard === "vision")}
                >
                  <Card.Body style={cardBodyStyle}>
                    <h4 style={titleStyle}>Our Vision</h4>
                    <Card.Text style={{ color: "#4a5568" }}>
                      To be the leading provider of water solutions, recognized
                      for innovation, efficiency, and commitment to
                      environmental sustainability. We envision a future where
                      every individual has access to clean and affordable water.
                    </Card.Text>
                  </Card.Body>
                </div>
              </Col>

              {/* Mandate Card */}
              <Col lg={4}>
                <div
                  onMouseEnter={() => setHoveredCard("mandate")}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={cardStyle(hoveredCard === "mandate")}
                >
                  <Card.Body style={cardBodyStyle}>
                    <h4 style={titleStyle}>Our Mandate</h4>
                    <Card.Text style={{ color: "#4a5568" }}>
                      We are mandated to deliver a safe and sustainable water
                      supply to our customers, promote responsible water use,
                      and support the community through various programs and
                      partnerships.
                    </Card.Text>
                    {showMoreMandate && (
                      <Card.Text
                        style={{ color: "#4a5568", marginTop: "1rem" }}
                      >
                        Our mandate extends to providing technical assistance to
                        ensure optimal water management practices, investing in
                        infrastructure to improve service, and fostering
                        collaboration with stakeholders to address local water
                        challenges.
                      </Card.Text>
                    )}
                    <Button
                      style={{
                        ...buttonStyle,
                        backgroundColor:
                          hoveredCard === "mandate" ? "#147d6f" : "#16A085",
                      }}
                      onClick={() => setShowMoreMandate(!showMoreMandate)}
                    >
                      {showMoreMandate ? "Show Less" : "Show More"}
                    </Button>
                  </Card.Body>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="mt-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <div className="service-pledge-wrapper">
                  <h2
                    className="mb-4 fw-bold"
                    style={{ color: "#16A085", fontSize: "40px" }}
                  >
                    Board of Directors
                  </h2>
                  <div className="pledge-content">
                    <div className="mt-4">
                      <hr
                        className="mx-auto"
                        style={{
                          width: "50px",
                          height: "3px",
                          backgroundColor: "#16A085",
                          opacity: "1",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              {/* Card 1 */}
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/BoardofDirectors/Chairman of the Board.jpg"
                    alt="Walter White"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Ruiz H. Jersey
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Chairman of the Board
                  </p>
                </div>
              </Col>

              {/* Card 2 */}
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/BoardofDirectors/Vice Chairman of the Board.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Mamerto D. Te
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Vice Chairman of the Board
                  </p>
                </div>
              </Col>

              {/* Card 3 */}
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/BoardofDirectors/Secretary of the board.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Brian B. Espedido
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Secretary of the board
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/BoardofDirectors/Member of the Board.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Neney V. Labalan
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Member of the board
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/BoardofDirectors/Member of the board2.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Eduardo T. Frivaldo
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Member of the board
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="mt-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <div className="service-pledge-wrapper">
                  <h2
                    className="mb-4 fw-bold"
                    style={{ color: "#16A085", fontSize: "40px" }}
                  >
                    Management Officials
                  </h2>
                  <div className="pledge-content">
                    <div className="mt-4">
                      <hr
                        className="mx-auto"
                        style={{
                          width: "50px",
                          height: "3px",
                          backgroundColor: "#16A085",
                          opacity: "1",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/EDUARDO-P-TEJADA.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    EDUARDO P. TEJADA
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    General Manager C
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/LOUIE-H-RAFER.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Ralph Louie H. Rafer
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Senior Corporate Accountant C
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/Ruby1-240x300.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Ruby R. Buban
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Administrative/ General Service Officer A
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/CECILIO-E-HABALO.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Cecilio E. Habalo, Jr.
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Customer Service Officer A
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/duque1-267x300.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Leandro H. Duque
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>Cashier A</p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/ROBERTO-D-LACZA.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Roberto D. Lacza
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Senior Property Officer A
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/SIMEON-HABOC-231x300.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Simeon H. Haboc
                  </h5>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Water Maintenance Head
                  </p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6} className="mb-4">
                <div
                  className="board-card"
                  style={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src="/Management Officials/Jomar-257x300.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "15px",
                    }}
                  />
                  <h5
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Engr. Jomar H. Venus
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Utilities/ Customer Service Assistant A
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          style={{
            padding: "40px 20px",
            borderRadius: "8px",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#16A085",
            }}
          >
            Why Choose Our System?
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "300px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-file-earmark-text"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Bill Management Made Easy
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                View and download your water bills anytime, anywhere.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "300px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-chat-dots"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Real-Time SMS Alerts
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Get instant notifications for due dates, payments, and updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "300px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-graph-up"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Usage Tracking
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Analyze your water consumption trends month-by-month.
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "40px 20px",
            borderRadius: "8px",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#16A085",
            }}
          >
            How to Get Started
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-person-plus"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Create an Account
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Register using your account number and name.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-box-arrow-in-right"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Login Anytime
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Access your account anytime anyware
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-bell"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Receive Notifications
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Stay informed about due dates via SMS alerts.
              </p>
            </div>

            {/* Step 4 */}
            <div
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <i
                className="bi bi-credit-card"
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  color: "#16A085",
                }}
              ></i>
              <h3
                style={{
                  color: "#555",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                Monitor Your Account
              </h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Track your water usage, bills and trasactions
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          backgroundColor: "#008374",
          color: "#fff",
          padding: "40px 0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div className="container">
          <Row>
            <Col lg={4} md={6} sm={12} className="mb-4">
              <div>
                <a
                  href="/"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                    color: "#fff",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  CWD Online Portal
                </a>
                <p
                  style={{
                    marginTop: "10px",
                    opacity: "0.9",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    maxWidth: "450px",
                    textAlign: "justify",
                  }}
                >
                  Easily access your account, view your bills, and stay updated
                  with SMS notifications for a seamless water service
                  experience.
                </p>
                <div style={{ marginTop: "20px" }}>
                  <a
                    href="https://www.facebook.com/CasiguranWD.official/"
                    style={{ color: "#fff", marginRight: "15px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-facebook"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </a>
                  <a
                    href="https://casiguranwd.gov.ph/"
                    style={{ color: "#fff", marginRight: "15px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-globe" style={{ fontSize: "24px" }}></i>
                  </a>
                  <a
                    href="https://casiguranwd.gov.ph/"
                    style={{ color: "#fff", marginRight: "15px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-envelope"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12} className="mb-4">
              <div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Useful Links
                </h4>
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    marginBottom: "0",
                  }}
                >
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href="/"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "16px",
                        transition: "color 0.3s",
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href="/about"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "16px",
                        transition: "color 0.3s",
                      }}
                    >
                      About us
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href="/services"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "16px",
                        transition: "color 0.3s",
                      }}
                    >
                      Services
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href="/terms"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "16px",
                        transition: "color 0.3s",
                      }}
                    >
                      Terms of service
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href="/privacy"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "16px",
                        transition: "color 0.3s",
                      }}
                    >
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={5} md={12} sm={12} className="mb-4">
              <div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Contact Us
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  L. Hapal Street
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  Brgy. Central
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  Casiguran, Sorsogon
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Phone: </strong>
                  <a
                    href="tel:+639172095367"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    +639172095367
                  </a>
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Email: </strong>
                  <a
                    href="mailto:casiguranwd1988@gmail.com"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    casiguranwd1988@gmail.com
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </footer>

      <Button
        onClick={scrollToTop}
        className="position-fixed scroll-top"
        style={{
          bottom: "20px",
          right: "20px",
          backgroundColor: "#16A085",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      >
        <i className="bi bi-arrow-up-short fs-5"></i>
      </Button>
    </>
  );
};

export default Home;
