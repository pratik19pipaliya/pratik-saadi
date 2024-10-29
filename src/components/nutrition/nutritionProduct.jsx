import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const NutritionProduct = ({
  nutritionName,
  nutritionImg,
  nutritionMobileImg,
  nutritionLink,
}) => {
  return (
    <section className="mb-5">
      <div>
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="col-12">
            <h2 className="f-rob-bol f-30 text-black text-uppercase">
              {nutritionName}
            </h2>
          </div>
        </div>
        <div className="item mt-3">
          <Link to={`/nutrition/${nutritionLink}`}>
            <LazyLoadImage
              className="d-none d-md-block border-radius-20"
              src={process.env.PUBLIC_URL + nutritionImg}
              alt="Fggroup"
              width="100%"
            />
            <LazyLoadImage
              className="d-block d-md-none w-100 mt-3 border-radius-20"
              src={process.env.PUBLIC_URL + nutritionMobileImg}
              alt="Fggroup"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NutritionProduct;
