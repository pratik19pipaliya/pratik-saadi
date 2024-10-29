import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ModalVideo from "react-modal-video";

function HappyClientReview() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  // Owl Carousel options
  const carouselOptions = {
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
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <div className="col p-0">
            <h2 className="f-rob-bol f-30 text-black text-uppercase">
              HAPPY CLIENT
            </h2>
          </div>
        </div>
        <div className="col-12 mt-4">
          <OwlCarousel id="fwg-owl" className="owl-theme" {...carouselOptions}>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-1.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-2.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-3.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-4.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-5.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-6.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-12">
                <div className="categories-product-main text-center">
                  <div className="category-product-item">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutrition-review-7.webp"
                      }
                      className="img-fluid"
                      alt="nutrition-review"
                      effect="blur"
                    />
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
                <div className="blog p-0" style={{ borderRadius: "10px" }}>
                  <div className="ply position-relative">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutri-review-video-1.webp"
                      }
                      width="100%"
                      style={{ borderRadius: "10px" }}
                      alt="fggroup"
                      effect="blur"
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
                <div className="blog p-0" style={{ borderRadius: "10px" }}>
                  <div className="ply position-relative">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutri-review-video-2.webp"
                      }
                      width="100%"
                      style={{ borderRadius: "10px" }}
                      alt="fggroup"
                      effect="blur"
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
                <div className="blog p-0" style={{ borderRadius: "10px" }}>
                  <div className="ply position-relative">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/nutri-review-video-3.webp"
                      }
                      width="100%"
                      style={{ borderRadius: "10px" }}
                      alt="fggroup"
                      effect="blur"
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
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
    </>
  );
}

export default HappyClientReview;
