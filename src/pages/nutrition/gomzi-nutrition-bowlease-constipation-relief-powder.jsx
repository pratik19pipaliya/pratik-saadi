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

function GomziNutritionBowleaseConstipationReliefPowder() {
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
    id: "66e809d379c30ad8b5e16598",
    img: "/assets/images/nutrition/bowlease-constipation-relief-powder-1.webp",
    name: "Bowlease Constipation Relief Powder",
    price: "1049",
    discount: "649",
    size: "500 gms",
    dis_point: "38.12%",
  };

  const product = [
    "/assets/images/nutrition/bowlease-constipation-relief-powder-1.webp",
    "/assets/images/nutrition/bowlease-constipation-relief-powder-2.webp",
    "/assets/images/nutrition/bowlease-constipation-relief-powder-3.webp",
    "/assets/images/nutrition/bowlease-constipation-relief-powder-4.webp",
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
        title="Gomzi Nutrition Bowlease - Effective Constipation Relief Powder"
        description="Relieve constipation naturally with Gomzi Nutrition Bowlease Powder. A gentle, effective formula for digestive health, promoting regular bowel movements."
        keywords="Bowlease Constipation Relief, constipation powder, digestive health, natural constipation relief, regular bowel movements, buy constipation powder"
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
          "Hello, I wanted to know more about Gomzi Nutrition Bowlease Constipation Relief Powder. "
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
                      <h1 className="f-rob-bol f-22 text-bold">
                        Bowlease Constipation Relief Powder
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          38.12%
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹649 /-
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹1,049/-</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.1
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
                            <strong>
                              Gomzi Nutrition Bowlease Constipation Relief
                              Powder
                            </strong>
                          </p>
                          <p className="mb-3">
                            Introducing "Bowlease Constipation Relief Powder" -
                            an Ayurvedic solution crafted to alleviate
                            constipation discomfort and promote digestive health
                            naturally. This unique blend of herbs is formulated
                            to gently regulate bowel movements and restore
                            digestive balance.
                          </p>
                          <p>
                            <strong>Directions of Use:</strong>
                          </p>
                          <p className="mb-2">
                            Mix one teaspoon of Bowlease Constipation Relief
                            Powder with a glass of warm water or milk.
                          </p>
                          <p className="mb-2">
                            Stir well until fully dissolved.
                          </p>
                          <p className="mb-3">
                            Consume preferably before bedtime for optimal
                            overnight relief, or as directed by your healthcare
                            provider.
                          </p>
                          <p>
                            <strong>
                              Bowlease Constipation Relief Powder's Health
                              Benefits:
                            </strong>
                          </p>
                          <p className="mb-2">
                            - <b>Gentle relief from constipation:</b> Bowlease
                            Constipation Relief Powder contains natural laxative
                            herbs that aid in softening stools and promoting
                            regular bowel movements without causing dependency.
                          </p>
                          <p className="mb-2">
                            - <b>Soothes digestive discomfort:</b> The herbal
                            blend helps alleviate bloating, gas, and discomfort
                            associated with constipation, promoting overall
                            digestive wellness.
                          </p>
                          <p className="mb-2">
                            - <b>Nourishes intestinal health:</b> Certain
                            ingredients in the powder support intestinal mucosal
                            health and enhance digestive enzyme secretion,
                            aiding in the efficient breakdown and absorption of
                            nutrients.
                          </p>
                          <p className="mb-2">
                            - <b>Restores bowel regularity:</b> Regular use of
                            this Ayurvedic powder helps restore the natural
                            rhythm of bowel movements, preventing occasional
                            constipation and promoting gastrointestinal harmony.
                          </p>
                          <p className="mb-3">
                            - <b>Promotes overall well-being:</b> By addressing
                            constipation effectively, Bowlease Constipation
                            Relief Powder contributes to improved energy levels,
                            enhanced detoxification, and a sense of lightness
                            and well-being.
                          </p>
                          <p className="mb-3">
                            Experience the gentle and effective relief of
                            Bowlease Constipation Relief Powder, and rediscover
                            digestive comfort the natural way.
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
            <NutritionReviewSection product_id="66e809d379c30ad8b5e16598" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionBowleaseConstipationReliefPowder;
