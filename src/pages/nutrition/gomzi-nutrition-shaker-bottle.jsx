import React, { useEffect, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import AddtoCartOffCanvas from "../../components/addtocartcanvas";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import SingleProductPhotoSection from "../../components/nutrition/SingleProductPhotoSection";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import Authentic from "../../components/nutrition/authentic";
import CompanyDetails from "../../components/nutrition/company-details";
import RawMaterial from "../../components/nutrition/raw-material";
import MoreProducts from "../../components/nutrition/moreProducts";
import { axiosInstance } from "../../assets/js/config/api";
import ModalVideo from "react-modal-video";
import LoginModal from "../../assets/js/popup/login";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta";

function GomziNutritionShakerBottle() {
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
    id: "66a32e961e55f03e92d5d364",
    img: "/assets/images/nutrition/gomzi-nutrition-shaker.webp",
    name: "Gomzi Nutrition Shaker Bottle",
    price: "299",
    discount: "199",
    size: "500 ml",
    dis_point: "33.44%",
  };
  const product = [
    "/assets/images/nutrition/gomzi-nutrition-shaker.webp",
    "/assets/images/nutrition/gomzi-nutrition-shaker-bottle-2.webp",
    "/assets/images/nutrition/gomzi-nutrition-shaker-bottle-3.webp",
    "/assets/images/nutrition/gomzi-nutrition-shaker-bottle-4.webp",
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
        title="Buy Gomzi Nutrition Shaker Bottle - Perfect for Protein Shakes &
          Supplements"
        description="Mix your protein shakes effortlessly with the Gomzi Nutrition Shaker Bottle. Leak-proof, durable, and easy to carry for fitness enthusiasts on the go."
        keywords="Shaker Bottle, protein shaker, durable shaker, gym accessories, mix supplements, fitness bottle, buy shaker bottle"
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
      {showModal && <LoginModal onClose={closeModal} />}
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
      <NutritionHeader />
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about Gomzi Nutrition Shaker Bottle. "
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
                        Gomzi Nutrition Shaker Bottle 500 ml
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          33.44%
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹199 /-
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹299/-</span>
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
                    <div className="col-12 mt-3 d-none d-lg-block">
                      <p className="f-rob-bol f-18">Size</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mr-3 mb-3 d-inline-block">
                          <div className="avail-in-other-size-main">
                            <div className="d-block avail-in-other-size active">
                              <span className="d-block product-type avail-other-size cp active">
                                <p className="d-block m-0">500 ml</p>
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
                              Gomzi Nutrition Shaker: Your Perfect Workout
                              Companion
                            </strong>
                          </p>
                          <p className="mb-3">
                            Elevate your fitness game with the Gomzi Nutrition
                            Shaker. Designed to be the ultimate companion for
                            your active lifestyle, this shaker bottle is
                            engineered for performance and convenience.
                          </p>
                          <p>
                            <strong>Key Features:</strong>
                          </p>
                          <p className="mb-2">
                            <b>Leak-Proof Design:</b> Say goodbye to spills and
                            messes with our advanced leak-proof lid.
                          </p>
                          <p className="mb-2">
                            <b>Mix Perfectly:</b> The built-in mixer ball
                            ensures a smooth and lump-free blend every time.
                          </p>
                          <p className="mb-2">
                            <b>Wide Mouth:</b> Effortlessly add scoops, ice, or
                            fruits for a personalized shake.
                          </p>
                          <p className="mb-2">
                            <b>Durable and BPA-Free:</b> Crafted from
                            high-quality materials for long-lasting use and
                            safety.
                          </p>
                          <p className="mb-3">
                            <b>Stylish and Ergonomic:</b> The sleek design fits
                            comfortably in your hand and gym bag. Experience the
                            Gomzi difference with a shaker bottle that's as
                            committed to your fitness goals as you are.
                          </p>
                          <p>
                            <strong>Product Highlights:</strong>
                          </p>
                          <p className="mb-3">
                            Ideal for mixing protein shakes, pre-workout
                            supplements, and other powdered drinks. Easy to
                            clean and dishwasher safe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rating-review-section bg-secondaryyyy px-3 px-md-5 w-100">
                <NutritionReviewSection product_id="66a32e961e55f03e92d5d364" />
              </div>
            </div>
          </div>
          <MoreProducts />
          <div className="row">
            <div
              className="d-none"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="col-12 bg-transparent my-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-inline-block">
                        <span className="f-rob-med mb-0 f-16 text-uppercase">
                          Review Images
                        </span>
                      </div>
                      <div className="d-inline-block">
                        <button
                          type="button"
                          className="close text-right"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <LazyLoadImage
                            src="https://www.nutristar.in/static/media/close.d599db87.svg"
                            className="img-fluid cp"
                            alt="close "
                            effect="blur"
                            width="100%"
                            height="auto"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-center review-image-main mt-4">
                    <div className="row"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionShakerBottle;
