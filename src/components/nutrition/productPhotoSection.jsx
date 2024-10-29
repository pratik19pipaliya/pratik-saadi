import React, { useEffect, useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

function ProductPhotoSection({
  twoKgProduct,
  oneKgProduct,
  mawatwoKgProduct,
  mawaoneKgProduct,
  mochatwoKgProduct,
  mochaoneKgProduct,
  mangotwoKgProduct,
  mangooneKgProduct,
  currentProduct,
  fiveGProduct,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [prevIndex, setPrevIndex] = useState(activeImageIndex);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setOpacity(0.5);
      const fadeOutTimer = setTimeout(() => {
        setPrevIndex(activeImageIndex);
        setOpacity(1);
      }, 300);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [activeImageIndex]);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <>
      <div className="col-12 p-0 product-hori-slider-main">
        <div className="product-imgs one-book singal-product-img d-none d-lg-block">
          <div
            className="row"
            style={{
              display: currentProduct === "two" ? "block" : "none",
            }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <div
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: opacity,
                  }}
                  ref={imageRef}
                >
                  <InnerImageZoom
                    src={twoKgProduct[prevIndex]}
                    zoomSrc={twoKgProduct[prevIndex]}
                    zoomType="hover"
                    zoomPreload={true}
                    alt="FG Group"
                    width="80%"
                    effect="blur"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {twoKgProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-4 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <LazyLoadImage
                            src={image}
                            alt="FG Group"
                            effect="blur"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: currentProduct === "one" ? "block" : "none",
            }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <div
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: opacity,
                  }}
                  ref={imageRef}
                >
                  <InnerImageZoom
                    src={oneKgProduct[prevIndex]}
                    zoomSrc={oneKgProduct[prevIndex]}
                    zoomType="hover"
                    zoomPreload={true}
                    alt="FG Group"
                    width="80%"
                    effect="blur"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {oneKgProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-4 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <LazyLoadImage
                            src={image}
                            alt="FG Group"
                            effect="blur"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ display: currentProduct === "five" ? "block" : "none" }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <div
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: opacity,
                  }}
                  ref={imageRef}
                >
                  <InnerImageZoom
                    src={fiveGProduct[prevIndex]}
                    zoomSrc={fiveGProduct[prevIndex]}
                    zoomType="hover"
                    zoomPreload={true}
                    alt="FG Group"
                    width="80%"
                    effect="blur"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {fiveGProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-4 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={image}
                            alt="FG Group"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="product-imgs one-book singal-product-img d-block d-lg-none">
          <div
            className="row"
            style={{
              display: currentProduct === "two" ? "block" : "none",
            }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <img
                  src={twoKgProduct[prevIndex]}
                  alt="FG Group"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {twoKgProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-2 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <LazyLoadImage
                            src={image}
                            alt="FG Group"
                            effect="blur"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: currentProduct === "one" ? "block" : "none",
            }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <div
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: opacity,
                  }}
                  ref={imageRef}
                >
                  <img
                    src={oneKgProduct[prevIndex]}
                    alt="FG Group"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {oneKgProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-2 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <LazyLoadImage
                            src={image}
                            alt="FG Group"
                            effect="blur"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ display: currentProduct === "five" ? "block" : "none" }}
          >
            <div className="col-12">
              <div className="main-image text-center">
                <div
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: opacity,
                  }}
                  ref={imageRef}
                >
                  <img
                    src={fiveGProduct[prevIndex]}
                    alt="FG Group"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="thumbnail-images">
                {fiveGProduct.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="d-flex">
                      <div className="col-12 px-2 mt-4 text-center">
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={image}
                            alt="FG Group"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPhotoSection;
