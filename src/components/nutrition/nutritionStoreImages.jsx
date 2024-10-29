import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NutritionStoreImages = () => {
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
        items: 2,
      },
      1000: {
        items: 3,
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
                  Nutrition Store
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center overflow-hidden">
            <div className="slider-container col-12 px-md-5">
              <div className="row">
                <div className="col-12 pb-5">
                  <div className="mx-auto">
                    <OwlCarousel
                      id="fwg-owl"
                      className="owl-theme"
                      {...carouselOptions2}
                    >
                      <div className="item">
                        <div className="d-inline-block w-100" tabIndex="-1">
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-1.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
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
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-2.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
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
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-3.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
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
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-4.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
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
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-5.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
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
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/nutrition-shop-6.webp"
                                  }
                                  className="img-fluid"
                                  alt="nutrition-shop"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default NutritionStoreImages;
