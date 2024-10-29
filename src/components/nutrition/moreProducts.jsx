import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

function MoreProducts() {
  const carouselOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
  };

  return (
    <>
      <div className="product-odd-even-section">
        <section className="py-5 right-before d-block">
          <div className="container-fluid w-80">
            <div className="row justify-content-center mb-2">
              <div className="col-11 p-0 d-flex justify-content-between align-items-center">
                <div className="col-11 p-0 d-flex align-items-center justify-content-between">
                  <h2 className="f-rob-bol f-30 text-white text-uppercase">
                    More Products
                  </h2>
                </div>
              </div>
            </div>
            <div className="row pb-5">
              <OwlCarousel
                id="fwg-owl"
                className="owl-theme"
                {...carouselOptions}
              >
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-1.webp"
                              }
                              className="img-fluid  "
                              alt="Whey Protein"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            Whey Protein
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-whey-protein-concentrate">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-3.webp"
                              }
                              className="img-fluid  "
                              alt="Whey Concentrate"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            Whey Concentrate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-whey-protein-isolate">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-2.webp"
                              }
                              className="img-fluid  "
                              alt="Whey Isolate"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            Whey Isolate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-5.webp"
                              }
                              className="img-fluid  "
                              alt="GNC Mega Men"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            Ignite Fat Burner
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-spark-eaa">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-6.webp"
                              }
                              className="img-fluid  "
                              alt="Spark EAA"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            Spark EAA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="d-inline-block"
                    tabIndex="-1"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <Link to="/nutrition/gomzi-nutrition-atp-creatine">
                            <LazyLoadImage
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/categories-7.webp"
                              }
                              className="img-fluid  "
                              alt="ATP Creatine"
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <div className="custom-tooltip-main">
                          <p className="my-2 f-pop-sembol f-14 text-white">
                            ATP Creatine
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MoreProducts;
