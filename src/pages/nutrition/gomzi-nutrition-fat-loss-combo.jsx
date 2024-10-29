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

function GomziNutritionFatLossCombo() {
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

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("productCartAvailable"));
    const dataAvailable = JSON.parse(localStorage.getItem("cartAvailable"));
    if (localData && dataAvailable) {
      addProductInCart(localData);
    }
  }, []);

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const addtocartdata = {
    id: "6616385f47003e22aea8a103",
    img: "/assets/images/nutrition/fat-loss-combo-1.webp",
    name: "Mass Gainer Powder-1kg + Ignite Fat Burner Pre-Workout",
    price: "9098",
    discount: "5000",
    size: "Combo - 1",
    dis_point: "45%",
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const product = [
    "/assets/images/nutrition/fat-loss-combo-1.webp",
    "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp",
    "/assets/images/nutrition/ignite-fat-burner-1.webp",
    "/assets/images/nutrition/spark-eaa-1.webp",
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
        title="Gomzi Nutrition Fat Loss Combo - Effective Weight Loss & Metabolism
          Boost"
        description="Achieve your weight loss goals with Gomzi Nutrition Fat Loss Combo. A dynamic combination of fat burners and metabolism boosters for effective fat reduction."
        keywords="Fat Loss Combo, weight loss combo, fat burning stack, metabolism booster, burn fat fast, weight management, buy fat loss supplements"
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
        message={"Hello, I wanted to know more about Fat Loss Combo. "}
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
                        Whey Protein Isolate-1kg + Ignite Fat Burner Pre-Workout
                        + Spark EAA
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          15%
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹7,730 /- GST included
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹9,098/-</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.3
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
                                "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp"
                              }
                              className="combo-offer-images"
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
                                "/assets/images/nutrition/ignite-fat-burner-1.webp"
                              }
                              className="combo-offer-images"
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
                              className="combo-offer-images"
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
                          <b style={{ color: "#86c33a" }}>₹7,730</b>
                          {/* &nbsp;&nbsp;<del>₹9,098</del> */}
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="delivery-detail-box p-3">
                        <div className="d-flex justify-content-between">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Whey Protein Isolate - 1kg</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              {/* <del>₹2,250 </del>&nbsp;&nbsp; */}
                              <b>₹3,830</b>
                            </p>
                          </div>
                        </div>
                        <div className="my-2 border-bottom-dash"></div>
                        <div className="d-flex justify-content-between">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Spark EAA - 250 gm</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              {/* <del>₹1,899</del>&nbsp;&nbsp; */}
                              <b>₹1,780</b>
                            </p>
                          </div>
                        </div>
                        <div className="my-2 border-bottom-dash"></div>
                        <div className="d-flex justify-content-between">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Ignite Fat Burner Pre-Workout - 250 gm</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              {/* <del>₹1,599</del>&nbsp;&nbsp; */}
                              <b>₹2,120</b>
                            </p>
                          </div>
                        </div>
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
                              Gomzi Nutrition Whey Protein Isolate
                            </strong>
                          </p>
                          <p className="mb-2">
                            Gomzi Nutrition Whey Protein Isolate is a 100%
                            vegetarian, pure protein that boasts a single
                            ingredient profile offering exactly what's on its
                            label. The supplement is made in a GMP-compliant
                            facility, is free from amino spiking, and undergoes
                            3rd party lab-testing to ensure excellence in purity
                            and quality.
                          </p>
                          <p className="mb-3">
                            Whey Isolate is processed to remove a significant
                            portion of the fats and carbs, resulting in higher
                            protein content per serving and making it suitable
                            for lactose-intolerant. The Dope-free, gluten-free,
                            soy-free, unflavoured, unsweetened, unadulterated
                            Whey Protein Isolate provides a concentrated dose of
                            protein 24.1 gm , BCAAs 5.97 gm and EAAs 10.45 gm
                            per serving.
                          </p>
                          <p>
                            <strong>Ignite Fat Burner Pre-Workout</strong>
                          </p>
                          <p className="mb-2">
                            It will suppress your appetite and provide you with
                            a higher energy level in order to keep the
                            adrenaline levels up. It will also boost your
                            metabolism and burn calories for you. For permanent
                            weight loss, it is recommended to use a fat burner
                            which helps to reduce fat faster.Ignite The Fat
                            Burner Pre-Workout is a sophisticated and
                            comprehensive pre-workout fat burner supplement.
                          </p>
                          <p className="mb-3">
                            Delivering intense energy, supercharged strength,
                            and power, heightened focus, vein-popping pump and
                            endurance, and superior workouts with enhanced
                            thermogenic and fat-burning properties are just a
                            few of the benefits of its uniquely developed
                            formula. For athletes of all levels, Ignite The Fat
                            Burner Pre-Workout is a highly stimulating and
                            effective pre-workout fat-burning supplement that
                            can assist maximize workout performance, burning fat
                            more quickly, and pushing your body beyond previous
                            boundaries.
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
            <NutritionReviewSection product_id="6616385f47003e22aea8a103" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionFatLossCombo;
