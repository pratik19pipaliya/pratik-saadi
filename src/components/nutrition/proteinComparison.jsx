import React from "react";
import "../../assets/css/nutrition.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
function ProteinComparison() {
  return (
    <>
      <div className="container-fluid p-0 mb-5">
        <div>
          <Link to="/nutrition/gomzi-nutrition-all-combo">
            <LazyLoadImage
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/nutrition-combo-banner.webp"
              }
              width="100%"
              className="d-none d-md-block"
              alt="fggroup"
              effect="blur"
            />
            <LazyLoadImage
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/nutrition-combo-banner-1.webp"
              }
              width="100%"
              className="d-block d-md-none"
              alt="fggroup"
              effect="blur"
            />
          </Link>
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/assets/images/nutrition/protein-comparison.webp"
            }
            width="100%"
            className="mt-5 d-none d-md-block"
            alt="fggroup"
            effect="blur"
          />
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/assets/images/nutrition/protein-comparison-1.webp"
            }
            width="100%"
            className="mt-5 d-block d-md-none"
            alt="fggroup"
            effect="blur"
          />
        </div>
      </div>
    </>
  );
}

export default ProteinComparison;
