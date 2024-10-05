import React from "react";
import Image from "../../assets/bg.jpg"; // Assuming you're using it somewhere

const About = () => {
  return (
    <div
      style={{
        height: "91vh",
        width: "100%",

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="mt-5">
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4">
              <div
                className="rounded-circle"
                style={{
                  width: "140px",
                  height: "140px",
                  backgroundColor: "var(--bs-secondary-color)",
                }}
              ></div>
              <h2 className="fw-normal">Heading</h2>
              <p>
                Some representative placeholder content for the three columns of
                text below the carousel. This is the first column.
              </p>
              <p>
                <a className="btn btn-secondary" href="#">
                  View details &raquo;
                </a>
              </p>
            </div>
            <div className="col-lg-4">
              <div
                className="rounded-circle"
                style={{
                  width: "140px",
                  height: "140px",
                  backgroundColor: "var(--bs-secondary-color)",
                }}
              ></div>
              <h2 className="fw-normal">Heading</h2>
              <p>
                Another exciting bit of representative placeholder content. This
                time, we've moved on to the second column.
              </p>
              <p>
                <a className="btn btn-secondary" href="#">
                  View details &raquo;
                </a>
              </p>
            </div>
            <div className="col-lg-4">
              <div
                className="rounded-circle"
                style={{
                  width: "140px",
                  height: "140px",
                  backgroundColor: "var(--bs-secondary-color)",
                }}
              ></div>
              <h2 className="fw-normal">Heading</h2>
              <p>
                And lastly this, the third column of representative placeholder
                content.
              </p>
              <p>
                <a className="btn btn-secondary" href="#">
                  View details &raquo;
                </a>
              </p>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">
                First featurette heading.{" "}
                <span className="text-body-secondary">
                  It’ll blow your mind.
                </span>
              </h2>
              <p className="lead">
                Some great placeholder content for the first featurette here.
                Imagine some exciting prose here.
              </p>
            </div>
            <div className="col-md-5">
              <div
                style={{
                  width: "500px",
                  height: "500px",
                  backgroundColor: "var(--bs-secondary-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--bs-secondary-color)" }}>
                  500x500
                </span>
              </div>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">
                Oh yeah, it’s that good.{" "}
                <span className="text-body-secondary">See for yourself.</span>
              </h2>
              <p className="lead">
                Another featurette? Of course. More placeholder content here to
                give you an idea of how this layout would work with some actual
                real-world content in place.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <div
                style={{
                  width: "500px",
                  height: "500px",
                  backgroundColor: "var(--bs-secondary-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--bs-secondary-color)" }}>
                  500x500
                </span>
              </div>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">
                And lastly, this one.{" "}
                <span className="text-body-secondary">Checkmate.</span>
              </h2>
              <p className="lead">
                And yes, this is the last block of representative placeholder
                content. Again, not really intended to be actually read, simply
                here to give you a better view of what this would look like with
                some actual content. Your content.
              </p>
            </div>
            <div className="col-md-5">
              <div
                style={{
                  width: "500px",
                  height: "500px",
                  backgroundColor: "var(--bs-secondary-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--bs-secondary-color)" }}>
                  500x500
                </span>
              </div>
            </div>
          </div>

          <hr className="featurette-divider" />

          <footer className="container">
            <p className="float-end">
              <a href="#">Back to top</a>
            </p>
            <p>
              &copy; 2017–2024 Company, Inc. &middot; <a href="#">Privacy</a>{" "}
              &middot; <a href="#">Terms</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default About;
