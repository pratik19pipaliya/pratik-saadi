import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AddtoCartOffCanvas from "../addtocartcanvas";
import ProductPhotoSection from "./productPhotoSection";

const SizeSelector = ({ activeDiv, handleClick }) => {
  return (
    <div className="col-12 mt-3">
      <p className="f-rob-bol f-18">Size</p>
      <ul className="list-unstyled mb-0">
        {["one", "two"].map((size, index) => (
          <li key={index} className="mr-3 mb-3 d-inline-block">
            <div
              className="avail-in-other-size-main"
              onClick={() => handleClick(size)}
            >
              <div className="d-block avail-in-other-size">
                <span
                  className={`d-block product-type avail-other-size cp ${
                    activeDiv === size ? "active" : ""
                  }`}
                  id={size}
                >
                  <p className="d-block m-0">
                    {size === "one" ? "1kg" : "2kg"}
                  </p>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FlavourSelector = ({ activeDiv, handleClick }) => {
  const flavours = [
    { id: "two", label: "Chocolate" },
    { id: "mawaone", label: "Mawa Kulfi" },
    { id: "mochaone", label: "Mocha Coffee" },
    { id: "mangoone", label: "Mango" },
  ];
  return (
    <div className="col-12 mt-3">
      <p className="f-rob-bol f-18">Flavour</p>
      <ul className="list-unstyled mb-0">
        {flavours.map(({ id, label }) => (
          <li key={id} className="mr-3 mb-3 d-inline-block">
            <div
              className="avail-in-other-size-main"
              onClick={() => handleClick(id)}
            >
              <div className="d-block avail-in-other-size">
                <span
                  className={`d-block product-type avail-other-size cp ${
                    activeDiv === id ? "active" : ""
                  }`}
                  id={id}
                >
                  <p className="d-block m-0">{label}</p>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductTitle = ({ currentProduct }) => {
  const titles = {
    one: "Whey Protein Chocolate",
    mawaone: "Whey Protein Mawa Kulfi",
    mochaone: "Whey Protein Mocha Coffee",
    mangoone: "Whey Protein Mango",
  };

  return (
    <div className="col-12">
      {Object.entries(titles).map(([key, title]) => (
        <h1
          key={key}
          className="f-rob-bol f-22 text-bold"
          style={{ display: currentProduct === key ? "block" : "none" }}
        >
          {title}
        </h1>
      ))}
    </div>
  );
};

const PriceDisplay = ({ currentProduct }) => {
  const prices = {
    one: "₹2,999 /- GST included",
    two: "₹4,919 /- GST included",
  };

  return (
    <div className="col-8 pt-2">
      {Object.entries(prices).map(([key, price]) => (
        <div
          key={key}
          className="d-inline-block"
          style={{ display: currentProduct === key ? "block" : "none" }}
        >
          <span className="d-inline-block mr-2 f-rob-bol f-20 text-red"></span>
          <span className="d-inline-block mr-2 f-rob-bol f-22">{price}</span>
        </div>
      ))}
    </div>
  );
};

const AddToCartButton = ({
  currentProduct,
  toggleMenu,
  productData,
  addtocartData,
}) => {
  const productKeys = [
    "one",
    "two",
    "five",
    "mawaone",
    "mawatwo",
    "mochaone",
    "mochatwo",
    "mangoone",
    "mangotwo",
  ];

  return (
    <div className="col-12 p-0">
      <div className="m-0 w-100 py-4 px-0 px-md-3">
        <div className="common-button mx-2">
          {productKeys.map((key) => (
            <button
              key={key}
              onClick={() => toggleMenu(addtocartData[key])}
              style={{ display: currentProduct === key ? "block" : "none" }}
              className="bg-yellow text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn"
            >
              Add to Cart
            </button>
          ))}
          <AddtoCartOffCanvas
            isOpen={productData?.menuOpen}
            onClose={productData?.onClose}
            productData={productData}
          />
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({
  twokgproduct,
  onekgproduct,
  mawatwokgproduct,
  mawaonekgproduct,
  mochatwokgproduct,
  mochaonekgproduct,
  mangotwokgproduct,
  mangoonekgproduct,
  fivegproduct,
  currentProduct,
  handleClick,
  activeDiv,
  handleoneClick,
  handletwoClick,
  handlemawaoneClick,
  toggleMenu,
  menuOpen,
  productData,
  addtocartdataonekg,
  addtocartdatatwokg,
  addtocartdatafiveg,
  addtocartdatamawaonekg,
  addtocartdatamawatwokg,
  addtocartdatamochaonekg,
  addtocartdatamochatwokg,
  addtocartdatamangoonekg,
  addtocartdatamangotwokg,
}) => {
  return (
    <div className="col-12 p-0 px-md-3 px-xl-4 py-3 py-md-3 h-100 mt-5">
      <div className="col-12 p-0 col-lg-7 h-100 mb-lg-0 px-0 px-md-3 product-detail-left">
        <div className="slider-main h-100">
          <div className="col-12 slider-main-inner-div h-100">
            <div className="row h-100">
              <ProductPhotoSection
                twoKgProduct={twokgproduct || []}
                oneKgProduct={onekgproduct || []}
                mawatwoKgProduct={mawatwokgproduct || []}
                mawaoneKgProduct={mawaonekgproduct || []}
                mochatwoKgProduct={mochatwokgproduct || []}
                mochaoneKgProduct={mochaonekgproduct || []}
                mangotwoKgProduct={mangotwokgproduct || []}
                mangooneKgProduct={mangoonekgproduct || []}
                fiveGProduct={fivegproduct || []}
                currentProduct={currentProduct || []}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 p-0 col-lg-5 mb-3 mt-3 mb-lg-0 product-detail-right">
        <div className="row">
          <SizeSelector activeDiv={activeDiv} handleClick={handleClick} />
          <FlavourSelector activeDiv={activeDiv} handleClick={handleClick} />
          <ProductTitle currentProduct={currentProduct} />
          <PriceDisplay currentProduct={currentProduct} />
          <div className="col-4 text-left text-md-right">
            <div className="row">
              <div className="col cp">
                <span className="d-flex text-secondary cp"></span>
                <div className="d-inline-block">
                  <div className="d-flex align-items-center justify-content-center my-2">
                    <span className="d-flex product-rating text-secondary">
                      <LazyLoadImage
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/nutrition/star.0ed05b90.svg"
                        }
                        className="img-fluid mr-1"
                        alt="star"
                        effect="blur"
                      />
                      <span>4.8</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 pt-3 d-none d-md-inline-block">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-inline-block text-right">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="d-flex product-rating text-secondary">
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/star.0ed05b90.svg"
                      }
                      className="img-fluid mr-1"
                      alt="star"
                      effect="blur"
                    />
                    <span>4.8</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <AddToCartButton
            currentProduct={currentProduct}
            toggleMenu={toggleMenu}
            productData={productData}
            addtocartData={{
              one: addtocartdataonekg,
              two: addtocartdatatwokg,
              five: addtocartdatafiveg,
              mawaone: addtocartdatamawaonekg,
              mawatwo: addtocartdatamawatwokg,
              mochaone: addtocartdatamochaonekg,
              mochatwo: addtocartdatamochatwokg,
              mangoone: addtocartdatamangoonekg,
              mangotwo: addtocartdatamangotwokg,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
