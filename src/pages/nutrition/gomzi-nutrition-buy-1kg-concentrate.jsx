import React, { useEffect, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import AddtoCartOffCanvas from "../../components/addtocartcanvas";
import LoginModal from "../../assets/js/popup/login.jsx";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import ModalVideo from "react-modal-video";
import SingleProductPhotoSection from "../../components/nutrition/SingleProductPhotoSection";
import MoreProducts from "../../components/nutrition/moreProducts";
import CertifiedProduct from "../../components/nutrition/certified";
import HappyClientReview from "../../components/nutrition/happyClient";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import HowToUse from "../../components/nutrition/howToUse.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionBuy1KgConcentrate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const toggleMenu = async (data) => {
    // localStorage.setItem("addtocart", "true");
    // localStorage.setItem(
    //   "productData",
    //   JSON.stringify({
    //     ...data,
    //   })
    // );

    try {
      if (!isAuthenticated) {
        setMenuOpen(false);
        setShowModal(true);
        localStorage.setItem("productCartAvailable", JSON.stringify(data));
        localStorage.setItem("cartAvailable", true);
      } else {
        const existingData = JSON.parse(
          localStorage.getItem("addItemInCart")
        ) || { products: [] };
        const productExists = existingData.products.some(
          (product) => product.product_id === data.id
        );

        if (!productExists) {
          existingData.products.push({
            product_id: data.id,
            quantity: data?.quantity || 1,
            mrpPrice: data.price || 0,
          });
        }

        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
        const response = await axiosInstance.post("/order-cart/add-item", {
          item_id: data.id,
          quantity: data?.quantity || 1,
          item_type: "FG_MEAL_PRODUCT",
        });
        if (response.data.response === "OK") {
          setProductData(data);
          // setMenuOpen(!menuOpen);
          window.location.href = "/nutrition/cart";
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addProductInCart = async (data) => {
    try {
      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: data.id,
        quantity: 1,
        item_type: "FG_MEAL_PRODUCT",
      });
      if (response.data.response === "OK") {
        setProductData(data);
        // setMenuOpen(!menuOpen);
        window.location.href = "/nutrition/cart";
        localStorage.removeItem("cartAvailable");
        localStorage.removeItem("productCartAvailable");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const addtocartdata = {
    id: "66a22f581e55f03e92d535b9",
    img: "/assets/images/nutrition/gomzi-nutrition-buy-1kg-concentrate-1.webp",
    name: "Whey Protein Concentrate-1kg + Spark EAA",
    price: "3499",
    discount: "7997",
    size: "Combo",
    dis_point: "31.24%",
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const product = [
    "/assets/images/nutrition/gomzi-nutrition-buy-1kg-concentrate-1.webp",
    "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp",
    "/assets/images/nutrition/spark-eaa-1.webp",
    "/assets/images/nutrition/gomzi-nutrition-shaker.webp",
  ];

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const addToCart = localStorage.getItem("addtocart");
    if (addToCart === "true") {
      setTimeout(() => {
        setProductData(addtocartdata);
        setMenuOpen(true);
        localStorage.removeItem("addtocart");
      }, 2000);
    }
  }, []);

  return (
    <>
      <PageMeta
        title="Premium Whey Concentrate 1kg with Free EAA and Shaker | Nutrition"
        description="Boost your protein intake with our 1kg Whey Concentrate. Includes free EAA and shaker! Perfect for pre-gym supplements. Enhance nutrition and collagen."
        keywords="optimum nutrition, nutrition, pre-gym supplements, supplements weight gainer, Weight Gainer For Men, protein for mass gainer, Whey Protein Powder, best Indian whey  protein, fat burner, pre-workout supplements"
        canonicalUrl={canonicalUrl}
        metaScript={`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1144699046738070');
            fbq('track', 'PageView');
          `}
        noscriptData={`
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1" />
          `}
        googleTag={`
            https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38
          `}
        googleScriptData={`
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J50WNKGW38');
          `}
      />
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
      {showModal && <LoginModal onClose={closeModal} />}
      <NutritionHeader />
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about Whey Concentrate 1kg with Free EAA and Shaker. "
        }
        options={{ pageRef: true }}
      />
      <div className="main-content margintop-nutrition">
        <section className="product-detail-main bg-white">
          <div className="container-fluid w-80 mb-4">
            <div className="row justify-content-center w-100 mx-auto">
              <div className="col-12 p-0 px-md-3 px-xl-4 py-3 py-md-3 h-100 mt-5">
                <div className="col-12 p-0 col-lg-7 h-100 mb-lg-0 px-0 px-md-3 product-detail-left">
                  <SingleProductPhotoSection product={product} />
                </div>
                <div className="col-12 p-0 col-lg-5 mb-3 mt-3 mb-lg-0 product-detail-right">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="f-rob-bol f-22 text-bold">
                        Buy 1kg Whey Protein Concentrate And Get Free Spark EAA
                        + Shaker
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          ₹7,997
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹3,499 /-
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹225/-</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.8
                          </span>
                        </div>
                      </div>
                    </div>
                    <RawMaterial />
                    <div className="col-12 mt-4">
                      <p className="f-rob-bol f-22">Combo</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/spark-eaa-1.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/gomzi-nutrition-shaker.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                      </ul>
                      <div>
                        <p className="ql-align-justify f-20 mb-1">
                          Total price:{" "}
                          <b className="multi-product-price">₹3,499</b>
                          {/* &nbsp;&nbsp;<del>₹7,997</del> */}
                        </p>
                      </div>
                    </div>
                    <div className="col-12 p-0">
                      <div className="m-0 w-100 py-4 px-0 px-md-3">
                        <div className="common-button mx-2">
                          <button
                            onClick={() => toggleMenu(addtocartdata)}
                            className="bg-yellow d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn"
                          >
                            Add to Cart
                          </button>
                          {menuOpen ? (
                            <>
                              <AddtoCartOffCanvas
                                isOpen={menuOpen}
                                onClose={() => setMenuOpen(false)}
                                productData={productData}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 return-policy-main">
                      <div className="mt-3 editor-text">
                        <Authentic />
                        <ul className="list-unstyled">
                          <li className="d-block mb-3">
                            <div className="mb-2 ql-editor descriptionShow text-secondary">
                              <CompanyDetails />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/trust-badges.webp"
                      }
                      width="100%"
                      className="d-block mt-4"
                      alt="trust-badges"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="row justify-content-center mb-4">
                  <div className="col-9 px-0">
                    <ul
                      className="nav nav-pills w-100 nav-justified mb-3 tab-head"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item f-20 nav-link text-uppercase active show">
                        Description
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-9 my-3 break-all">
                    <div
                      className="tab-content tab-detail"
                      id="pills-tabContent"
                    >
                      <div
                        className="tab-pane fade editor-text active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div className="descriptionShow text-secondary">
                          <p>
                            <strong>
                              Gomzi Nutrition Whey Protein Concentrate
                            </strong>
                          </p>
                          <p className="mb-2">
                            In the terms of performance, Gomzi Nutrition Whey
                            Protein Concentrate is an excellent protein
                            supplement for bodybuilders and fitness champions.
                            As a result of the formula, proteins are absorbed by
                            the body in the most bio-available way possible.
                          </p>
                          <p className="mb-3">
                            Essentially, Gomzi Nutrition whey protein contains
                            24.1g of Protein and 4.98g of BCAA. Each combination
                            of whey provides different amounts and combinations
                            of amino acids, resulting in different effects on
                            the body. Since it is premium whey protein, the
                            quality of each whey protein is quite high. With the
                            addition of amino acids, the whey protein blend
                            functions like regular protein. It should be noted
                            that proteins are generally helpful in aiding
                            Post-workout and Pre-workout recovery after an
                            intense physical workout, resulting in greater
                            protein synthesis rates.
                          </p>
                          <p>
                            <strong>Gomzi Nutrition Whey Spark EAA</strong>
                          </p>
                          <p className="mb-2">
                            SPARK EAA is an advanced science-based solution that
                            contains 13 Ultra amino acids as well as hydration
                            and a vitamin booster combination. EAAs aid in
                            muscle growth and regeneration while also lowering
                            fatigue and soreness. This formula contains taurine,
                            which aids in muscle re-energizing and mending, as
                            well as citrulline, which aids in the oxygenation
                            and elimination of toxins from muscles.
                          </p>
                          <p className="mb-3">
                            This drink has a smooth and creamy texture thanks to
                            Ultra Granulation Technology. 13 Ultra Amino acids
                            help in muscle recovery Muscle Hydrating
                            Electrolytes help Hydrate Muscle Fibres for Proper
                            Muscle & Nerve Function Added Vitamin booster blend
                            that aids Muscle Growth and Health, Enhances
                            Metabolism SPARK EAA is vegetarian, caffeine and
                            banned substance free with no added sugar.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HowToUse
            src1="step-1.mp4"
            src2="step-2.mp4"
            src3="step-3.mp4"
            src4="step-4.mp4"
            step1="Add 300 ml of water/milk"
            step2="Mix 1 scoop of Protein"
          />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="66a22f581e55f03e92d535b9" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionBuy1KgConcentrate;
