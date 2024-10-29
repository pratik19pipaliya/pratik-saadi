import React, { useEffect, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import AddtoCartOffCanvas from "../../components/addtocartcanvas";
import LoginModal from "../../assets/js/popup/login.jsx";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import CertifiedProduct from "../../components/nutrition/certified";
import ModalVideo from "react-modal-video";
import SingleProductPhotoSection from "../../components/nutrition/SingleProductPhotoSection";
import MoreProducts from "../../components/nutrition/moreProducts";
import HappyClientReview from "../../components/nutrition/happyClient";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionB12Veda() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const addToCart = localStorage.getItem("addtocart");
  const [productData, setProductData] = useState(null);
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

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const addtocartdata = {
    id: "66e807f379c30ad8b5e16525",
    img: "/assets/images/nutrition/b12-veda-1.webp",
    name: "Sugarguard Diabetes Care Powder",
    price: "1649",
    discount: "999",
    size: "500 gms",
    dis_point: "39.41%",
  };

  const product = [
    "/assets/images/nutrition/b12-veda-1.webp",
    "/assets/images/nutrition/b12-veda-2.webp",
    "/assets/images/nutrition/b12-veda-3.webp",
    "/assets/images/nutrition/b12-veda-4.webp",
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (addToCart === "true") {
      setTimeout(() => {
        setProductData(addtocartdata);
        setMenuOpen(true);
        localStorage.removeItem("addtocart");
      }, 2000);
    }
  }, [addToCart]);

  return (
    <>
      <PageMeta
        title="Gomzi Nutrition B12 Veda - Boost Energy & Vitality with Vitamin B12"
        description="Enhance your energy levels and support nerve health with Gomzi Nutrition B12 Veda. A potent source of Vitamin B12 for overall well-being and vitality."
        keywords="B12 Veda, vitamin B12 supplement, energy booster, nerve health, B12 for vitality, buy vitamin B12, energy support supplement"
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
          "Hello, I wanted to know more about Gomzi Nutrition B12 Veda. "
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
                    <div className="col-12 mt-3 d-block d-lg-none">
                      <p className="f-rob-bol f-18">Size</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mr-3 mb-3 d-inline-block">
                          <div className="avail-in-other-size-main">
                            <div className="d-block avail-in-other-size active">
                              <span className="d-block product-type avail-other-size cp active">
                                <p className="d-block m-0">500 gms</p>
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12">
                      <h1 className="f-rob-bol f-22 text-bold">B12 Veda</h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          39.41%
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹999
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹1,649/-</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.6
                          </span>
                        </div>
                      </div>
                    </div>
                    <RawMaterial />
                    <div className="col-12 mt-3 d-none d-lg-block">
                      <p className="f-rob-bol f-18">Size</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mr-3 mb-3 d-inline-block">
                          <div className="avail-in-other-size-main">
                            <div className="d-block avail-in-other-size active">
                              <span className="d-block product-type avail-other-size cp active">
                                <p className="d-block m-0">500 gms</p>
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
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
                          {/* <button className="bg-light-red d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn-1">
                            Sold Out
                          </button> */}
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
                            <strong>Gomzi Nutrition B12 Veda</strong>
                          </p>
                          <p className="mb-3">
                            Discover B12Veda: Your Daily Dose of Vitality.
                          </p>
                          <p className="mb-3">
                            Introducing B12Veda Vitamin B12 Powder, your trusted
                            companion on the path to enhanced energy, focus, and
                            overall well-being. Harnessing the ancient wisdom of
                            Ayurveda and the modern science of vitamin B12
                            supplementation, B12Veda is your natural source of
                            vitality in a convenient powder form.
                          </p>
                          <p>
                            <strong>Unlock Your Energy Potential:</strong>
                          </p>
                          <p className="mb-3">
                            Experience a renewed sense of vigor and vitality
                            with B12Veda. Vitamin B12 plays a crucial role in
                            energy production, cognitive function, and the
                            maintenance of a healthy nervous system. Each
                            serving of B12Veda delivers a potent dose of this
                            essential nutrient, empowering you to seize the day
                            with confidence and clarity.
                          </p>
                          <p>
                            <strong>Support Your Wellness Journey:</strong>
                          </p>
                          <p className="mb-3">
                            Nourish your body from the inside out with B12Veda.
                            Our carefully crafted formula is designed to support
                            optimal health and vitality, whether you're leading
                            a busy lifestyle or simply seeking to enhance your
                            overall well-being. From combating fatigue to
                            promoting mental sharpness, B12Veda is your daily
                            ally in the pursuit of wellness.
                          </p>
                          <p>
                            <strong>Directions of Use:</strong>
                          </p>
                          <p className="mb-3">
                            For best results, mix one scoop of B12Veda Vitamin
                            B12 Powder with a glass of water twice daily.
                            Incorporate into your morning and evening routines
                            to maximize absorption and benefits.
                          </p>
                          <p>
                            <strong>
                              Vitamin B12 Powder's Health Benefits:
                            </strong>
                          </p>
                          <p className="mb-2">
                            - <b>Enhanced Energy:</b> B12Veda provides a natural
                            boost of energy, helping you stay alert and focused
                            throughout the day.
                          </p>
                          <p className="mb-2">
                            - <b>Supports Nervous System:</b> Vitamin B12 is
                            essential for maintaining a healthy nervous system,
                            promoting optimal brain function and cognitive
                            health.
                          </p>
                          <p className="mb-2">
                            - <b>Reduces Fatigue:</b> Combat fatigue and
                            sluggishness with B12Veda, which supports healthy
                            metabolism and energy production.
                          </p>
                          <p className="mb-2">
                            - <b>Promotes Cell Health:</b> B12Veda aids in the
                            production of red blood cells, supporting overall
                            cellular health and vitality.
                          </p>
                          <p className="mb-2">
                            - <b>Mood Enhancement:</b> Maintain a positive mood
                            and emotional well-being with B12Veda, which plays a
                            role in neurotransmitter synthesis.
                          </p>
                          <p className="mb-2">
                            - <b>Heart Health:</b> B12Veda supports
                            cardiovascular health by helping to regulate
                            homocysteine levels, which can impact heart health.
                          </p>
                          <p className="mb-3">
                            - <b>Vegan-Friendly:</b> B12Veda is a vegan-friendly
                            supplement, providing essential vitamin B12 for
                            those following plant-based diets.
                          </p>
                          <p className="mb-3">
                            Elevate your wellness journey with B12Veda Vitamin
                            B12 Powder. Rediscover your zest for life, enhance
                            your vitality, and embrace a brighter, more
                            energized future with every scoop. Unlock the power
                            of Ayurveda and vitamin B12-because true vitality
                            starts from within.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="66e807f379c30ad8b5e16525" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionB12Veda;
