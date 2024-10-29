import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ModalVideo from "react-modal-video";
const MainVideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };
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
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 3,
      },
    },
  };
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
      <section className="prdouct-video-main bg-white py-5">
        <div className="container-fluid mb-4 w-80">
          <div className="row justify-content-center">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <div className="col p-0">
                <h2 className="f-rob-bol f-30 text-black text-uppercase">
                  HAPPY CLIENT
                </h2>
              </div>
            </div>
            <div className="col-12 mt-4">
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
                              "/assets/images/nutrition/nutrition-review-1.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-2.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-3.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-4.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-5.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-6.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-7.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-8.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-9.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-10.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-11.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
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
                              "/assets/images/nutrition/nutrition-review-12.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
            <div className="col-12 mt-5">
              <div className="row" id="explore">
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0">
                      <div className="ply position-relative">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/nutri-review-video-1.webp"
                          }
                          width="100%"
                          className="border-radius-20"
                          alt="fggroup"
                        />
                        <div className="video-btn play-btn">
                          <a
                            onClick={() => openVideoModal("wuNtHkWxUXY")}
                            className="custom clickof"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0">
                      <div className="ply position-relative">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/nutri-review-video-2.webp"
                          }
                          width="100%"
                          className="border-radius-20"
                          alt="fggroup"
                        />
                        <div className="video-btn play-btn">
                          <a
                            onClick={() => openVideoModal("K04q5L7E4S0")}
                            className="custom clickof"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0">
                      <div className="ply position-relative">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/nutri-review-video-3.webp"
                          }
                          width="100%"
                          className="border-radius-20"
                          alt="fggroup"
                        />
                        <div className="video-btn play-btn">
                          <a
                            onClick={() => openVideoModal("-UhKGOkjDKQ")}
                            className="custom clickof"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainVideoSection;
