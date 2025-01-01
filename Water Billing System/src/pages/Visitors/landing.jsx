import React from "react";

const landing = () => {
  return (
    <div>
      <section id="hero" className="hero section accent-background">
        <div className="container position-relative">
          <div className="row gy-5 justify-content-between">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h2>
                Welcome to <span className="accent">CWD Online Portal</span>
              </h2>
              <p>
                Sed autem laudantium dolores. Voluptatem itaque ea consequatur
                eveniet.
              </p>
              <div className="d-flex">
                <a href="#about" className="btn-get-started">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2">
              <img src="assets/img/hero-img.svg" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default landing;
