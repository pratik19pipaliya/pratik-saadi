import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonials = () => {
  const carouselOptions2 = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  return (
    <section className="odd-even-section">
      <section className="deals-of-the-day-main py-5">
        <div className="container-fluid w-80">
          <div className="row justify-content-center">
            <div className="col-12 p-0 d-flex align-items-center justify-content-between mb-3">
              <div className="col p-0">
                <h2 className="f-rob-bol f-30 text-white text-uppercase">
                  Testimonials
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center overflow-hidden">
            <div className="slider-container col-12 px-md-5">
              <div className="row">
                <div className="col"></div>
                <div className="col-md-10 pb-5">
                  <div className="mx-auto">
                    <OwlCarousel
                      id="fwg-owl"
                      className="owl-theme"
                      {...carouselOptions2}
                    >
                      <div className="text-center item">
                        <img
                          className="box-shadow rounded-circle mb-3 d-inline-block"
                          style={{ width: "100px" }}
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/aashis.webp"
                          }
                          alt="client"
                        />
                        <div className="text-center pt-md-4">
                          <h4 className="h4 text-white">Ashish</h4>
                          <p className="text-white mb-5 f-rob-reg f-14 lp-2">
                            "Refuel Whey Protein Blend, with 33 servings per
                            container, is a nutritional powerhouse. It's a
                            game-changer in the world of fitness supplements,
                            offering a perfect balance of quality protein and
                            essential nutrients."
                          </p>
                        </div>
                      </div>
                      <div className="text-center item">
                        <img
                          className="box-shadow rounded-circle mb-3 d-inline-block"
                          style={{ width: "100px" }}
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/chirag.webp"
                          }
                          alt="client"
                        />
                        <div className="text-center pt-md-4">
                          <h4 className="h4 text-white">Chirag Chandlekar</h4>
                          <p className="text-white mb-5 f-rob-reg f-14 lp-2">
                            "I've been using Gomzi Nutrition Whey Protein for
                            the past six months, and I couldn't be happier with
                            the results."
                          </p>
                        </div>
                      </div>
                      <div className="text-center item">
                        <img
                          className="box-shadow rounded-circle mb-3 d-inline-block"
                          style={{ width: "100px" }}
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/pragnesh.webp"
                          }
                          alt="client"
                        />
                        <div className="text-center pt-md-4">
                          <h4 className="h4 text-white">Pragnesh Maisuria</h4>
                          <p className="text-white mb-5 f-rob-reg f-14 lp-2">
                            "Whey Protein Isolate is praised for its high
                            protein purity and minimal lactose and fat content,
                            making it an ideal choice for lean muscle building
                            and post-workout recovery among users."
                          </p>
                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Testimonials;
