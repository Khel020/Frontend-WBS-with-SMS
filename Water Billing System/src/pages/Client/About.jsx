import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";

const About = () => {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div style={{ background: "#f0f8ff", padding: "2rem" }}>
      <h2>About Us</h2>
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="history">Our History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="people">Board of Directors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="beliefs">Management Officials</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="history">
            <h3 className="mt-3">Our History</h3>
            <p>
              The Municipality of Casiguran is located at the southmost tip of
              Bicol Peninsula. It is about 18 kilometers south of the City of
              Sorsogon, the provincial capital. It is bounded by the City of
              Sorsogon in the north, by Juban in the south, by Gubat, Barcelona
              and Bulusan in the east. This coastal town, with a flat to
              gradually sloping terrain, has farming and fishing as the main
              sources of income.
            </p>
            <p>
              The water supply system of Casiguran was originally constructed in
              1932 thru a grant from the U.S government. This water system was
              designed to serve the towns of Casiguran and Juban. In 1948, the
              management of the system was transferred to the National
              Waterworks and Sewerage Authority and then to the municipal
              government in 1973. Sometime in 1986, the Casiguran Rural Works
              and Sanitation Association(RWSA) were created which in turn took
              over the management of the system. It was dissolved in 1988,
              whereupon the Casiguran Water District was officially formed on
              October 10, 1988 and was issued a Conditional Certificate of
              Conformance number 366. The District then formally took over the
              management and operation of the system, assuming all the assets
              and liabilities of the defunct RWSA under the leadership of Mr.
              Artemio H. Huet. Among the liabilities are Php 2,841,151.10 worth
              of piping materials loaned from also the defunct RWDC.
            </p>
            <p>
              In 1990, a Php 7.862 level III loan granted by LWUA was used to
              finance the installation of transmission and distribution
              pipelines and service connections, and the construction of
              chlorinating facility, break pressure chambers and source intake
              box. On July 18,1992, the newly completed water supply system was
              inaugurated. It is to serve the whole poblacion, barangays
              Inalagadian, Escuala, San Juan, Tigbao and San Antonio. Another
              Php 1.164 M level III loan was availed in 1994, to implement the
              Php 1M grant from the Countrywide Development Fund of Congressman
              Salvador Escudero III. And for a total amount of Php 1.172 ( Php
              1M grant and Php 0.742 loan availments), the service area was
              extended to five adjoining barangays namely Colambis, Rizal,
              Ponong, trece Martires and Boton.
            </p>
            <p>
              The first Chairman of the Board was Ruiz Jersey. He was followed
              by Chairman Gregorio Hare, Chairman Wilfredo Guantero, Chairman
              Eduardo P. Tejada and Chairman Carlos Baloloy. Past members of the
              Board were Jose Hitosis, Dionesio Bunao, Monserat de Jesus,
              Edilberto Geres, Pilar M. Refumanta, Federico Habla, Vicente
              Agong, Antonio Mateos, Gerry Grajo, Hilario Hachero and Mario
              Gonzales. Ruiz Jersey is still with the District as Chairman while
              Chairman Eduardo P. Tejada is now the General Manager.
            </p>
            <p>
              OROK SPRING. This is the main water source of the District,
              recently acquired thru court settlement. Now it provides not only
              potable water but unlimited thrill and relaxation for local and
              foreign tourists. Part of the proceeds of the Orok Cold Spring
              Resort goes to Watershed Protection Program.
            </p>
          </Tab.Pane>

          <Tab.Pane eventKey="people">
            <div className="container">
              <h2 className="text-center mb-5">Board of Directors</h2>
              <div className="row text-center mt-3">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 shadow-sm rounded"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <img
                      src="/public/BoardofDirectors/Chairman of the Board.jpg"
                      alt="Chairman of the Board"
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "5px solid #007bff", // Optional border for emphasis
                      }}
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title fw-bold">
                        Chairman of the Board
                      </h4>
                      <p className="card-text text-muted">
                        Casiguran, Sorsogon, Philippines
                      </p>
                      <a className="btn btn-outline-primary btn-sm" href="#">
                        View details &raquo;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 shadow-sm rounded"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <img
                      src="/public/BoardofDirectors/Vice Chairman of the Board.jpg"
                      alt="Vice Chairman of the Board"
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "5px solid #007bff", // Optional border for emphasis
                      }}
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title fw-bold">
                        Vice Chairman of the Board
                      </h4>
                      <p className="card-text text-muted">
                        Sample content for Vice Chairman
                      </p>
                      <a className="btn btn-outline-primary btn-sm" href="#">
                        View details &raquo;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 shadow-sm rounded"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <img
                      src="/public/BoardofDirectors/Secretary of the board.jpg"
                      alt="Secretary of the Board"
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "5px solid #007bff", // Optional border for emphasis
                      }}
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title fw-bold">
                        Secretary of the Board
                      </h4>
                      <p className="card-text text-muted">
                        Sample content for Secretary
                      </p>
                      <a className="btn btn-outline-primary btn-sm" href="#">
                        View details &raquo;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 shadow-sm rounded"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <img
                      src="/public/BoardofDirectors/Member of the board.jpg"
                      alt="Member of the Board"
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "5px solid #007bff", // Optional border for emphasis
                      }}
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title fw-bold">
                        Member of the Board
                      </h4>
                      <p className="card-text text-muted">
                        Sample content for Member 4
                      </p>
                      <a className="btn btn-outline-primary btn-sm" href="#">
                        View details &raquo;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 shadow-sm rounded"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <img
                      src="/public/BoardofDirectors/Member of the board2.jpg"
                      alt="Member of the Board"
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "5px solid #007bff", // Optional border for emphasis
                      }}
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title fw-bold">
                        Member of the Board
                      </h4>
                      <p className="card-text text-muted">
                        Sample content for Member 5
                      </p>
                      <a className="btn btn-outline-primary btn-sm" href="#">
                        View details &raquo;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="featurette-divider" />

              <footer className="container text-center mt-5">
                <p>
                  &copy; 2017–2024 Company, Inc. &middot;{" "}
                  <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
                </p>
                <p>
                  <a href="#">Back to top</a>
                </p>
              </footer>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="beliefs">
            <h3 className="mt-3">Our Beliefs</h3>
            <p>
              We believe in sustainability and providing accessible water
              services for all.
            </p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default About;
