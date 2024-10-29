import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const HomePageMoreProduct = () => {
  const carouselOptions1 = {
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
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  };
  return (
    <section className="top-categories-main bg-white py-3 py-md-5">
      <div className="container-fluid w-80">
        <div className="row justify-content-center">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <div className="col">
              <h2 className="f-rob-bol f-30 text-black text-uppercase">
                top categories
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt-4 pb-5 justify-content-center overflow-hidden">
          <div className="col-12">
            <OwlCarousel
              id="fwg-owl"
              className="owl-theme"
              {...carouselOptions1}
            >
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                            alt="Whey Protein Blend"
                            effect="blur"
                          />
                        </Link>
                      </div>
                      <div className="custom-tooltip-main">
                        <p className="my-2 f-pop-sembol f-14">
                          Whey Protein Blend
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                        <p className="my-2 f-pop-sembol f-14">
                          Whey Concentrate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                        <p className="my-2 f-pop-sembol f-14">Whey Isolate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                        <p className="my-2 f-pop-sembol f-14">
                          Ignite Fat Burner
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                        <p className="my-2 f-pop-sembol f-14">Spark EAA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="d-inline-block w-100" tabIndex="-1">
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
                        <p className="my-2 f-pop-sembol f-14">ATP Creatine</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageMoreProduct;
