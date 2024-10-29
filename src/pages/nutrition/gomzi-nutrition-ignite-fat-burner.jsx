import React, { useEffect, useRef, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import LoginModal from "../../assets/js/popup/login.jsx";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import CertifiedProduct from "../../components/nutrition/certified";
import ModalVideo from "react-modal-video";
import MoreProducts from "../../components/nutrition/moreProducts";
import HappyClientReview from "../../components/nutrition/happyClient";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import SelectableList from "../../components/nutrition/products/SelectableList.jsx";
import ProductPhotoSection1 from "../../components/nutrition/ProductPhotoSection1.jsx";
import ProductButtonsContainer from "../../components/nutrition/products/ProductButtonsContainer.jsx";
import HowToUse from "../../components/nutrition/howToUse.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionIgniteFatBurner() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductFlavor = searchParams.get("flavor");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("250g-Fruit Punch");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Fruit Punch");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "250g-Fruit Punch": [
      "/assets/images/nutrition/ignite-fat-burner-1.webp",
      "/assets/images/nutrition/ignite-fat-burner-2.webp",
      "/assets/images/nutrition/ignite-fat-burner-3.webp",
      "/assets/images/nutrition/ignite-fat-burner-4.webp",
    ],
    "250g-Green Apple": [
      "/assets/images/nutrition/ignite-fat-burner-green-apple-1.webp",
      "/assets/images/nutrition/ignite-fat-burner-green-apple-2.webp",
      "/assets/images/nutrition/ignite-fat-burner-green-apple-3.webp",
      "/assets/images/nutrition/ignite-fat-burner-green-apple-4.webp",
    ],
  };

  const products = [
    {
      key: "250g-Fruit Punch",
      data: {
        id: "660e4e38d8ff4f8d9f2a51d4",
        img: "/assets/images/nutrition/ignite-fat-burner-1.webp",
        name: "Ignite Fat Burner",
        price: "2500",
        discount: "2120",
        size: "250 gms",
        dis_point: "15%",
      },
    },
    {
      key: "250g-Green Apple",
      data: {
        id: "66bdcf9c8db3bcc2c0cd2686",
        img: "/assets/images/nutrition/ignite-fat-burner-green-apple-1.webp",
        name: "Ignite Fat Burner",
        price: "2500",
        discount: "2120",
        size: "250 gms",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Fruit Punch", label: "Fruit Punch" },
    { id: "Green Apple", label: "Green Apple" },
  ];

  const handleSelectSize = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      setActiveSize(id);
      setCurrentProduct(`${id}-${activeFlavor}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

  const handleSelectFlavor = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      console.log("id :- ", id);

      setActiveFlavor(id);
      setCurrentProduct(`${activeSize}-${id}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

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

    if (ProductFlavor) {
      setActiveFlavor(ProductFlavor);
      setCurrentProduct(`${activeSize}-${ProductFlavor}`);
    }
  }, []);

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const currentProductData =
    products.find((product) => product.key === currentProduct)?.data || {};

  return (
    <>
      <PageMeta
        title="Gomzi Nutrition Ignite Fat Burner - Boost Metabolism & Burn Fat Fast"
        description="Accelerate fat loss with Gomzi Nutrition Ignite Fat Burner. A powerful thermogenic formula that supports weight management, increases energy, and boosts metabolism."
        keywords="Ignite Fat Burner, fat burner supplement, thermogenic fat burner, weight loss pills, boost metabolism, burn fat fast, fat loss support"
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
          "Hello, I wanted to know more about Gomzi Nutrition Ignite Fat Burner. "
        }
        options={{ pageRef: true }}
      />
      <div className="main-content margintop-nutrition">
        <section className="product-detail-main bg-white">
          <div className="container-fluid w-80 mb-4">
            <div className="row justify-content-center w-100 mx-auto">
              <div className="col-12 p-0 px-md-3 px-xl-4 py-3 py-md-3 h-100 mt-5">
                <div className="col-12 p-0 col-lg-7 h-100 mb-lg-0 px-0 px-md-3 product-detail-left">
                  <div
                    className="product-image-container"
                    ref={imageRef}
                    style={{
                      opacity: opacity,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    <ProductPhotoSection1
                      images={productImages[currentProduct]}
                      activeImageIndex={activeImageIndex}
                      setActiveImageIndex={setActiveImageIndex}
                    />
                  </div>
                  <div className="d-flex mt-4">
                    <div className="col-6 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">2.26g</p>
                      <p className="nutrition-content-2 text-bold">
                        L-Citrulline
                      </p>
                    </div>
                    <div className="col-6 p-0">
                      <p className="nutrition-content-1 text-bold">180mg</p>
                      <p className="nutrition-content-2 text-bold">Caffeine</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 p-0 col-lg-5 mb-3 mt-3 mb-lg-0 product-detail-right">
                  <div className="row">
                    <div className="col-12 mt-3 d-block d-lg-none">
                      <SelectableList
                        items={sizeOptions}
                        activeItem={activeSize}
                        onItemClick={handleSelectSize}
                        title="Size"
                      />
                    </div>
                    <div className="col-12 mt-3 d-block d-lg-none">
                      <SelectableList
                        items={flavorOptions}
                        activeItem={activeFlavor}
                        onItemClick={handleSelectFlavor}
                        title="Flavor"
                      />
                    </div>
                    <div className="col-12">
                      <h1 className="f-rob-bol f-22 text-bold">
                        {currentProductData.name}
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          {currentProductData.dis_point}
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹{currentProductData.discount} /- GST included
                        </span>
                        <p className="f-20">
                          MRP:-&nbsp;
                          <span className="price--line-through">
                            ₹ {currentProductData.price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.4
                          </span>
                        </div>
                      </div>
                    </div>
                    <RawMaterial />
                    <div className="col-12 mt-3 d-none d-lg-block">
                      <SelectableList
                        items={sizeOptions}
                        activeItem={activeSize}
                        onItemClick={handleSelectSize}
                        title="Size"
                      />
                    </div>
                    <div className="col-12 mt-3 d-none d-lg-block">
                      <SelectableList
                        items={flavorOptions}
                        activeItem={activeFlavor}
                        onItemClick={handleSelectFlavor}
                        title="Flavor"
                      />
                    </div>
                    <div className="col-12 p-0">
                      <div className="m-0 w-100 py-4 px-0 px-md-3">
                        <div className="common-button mx-2">
                          <ProductButtonsContainer
                            products={products}
                            toggleMenu={toggleMenu}
                            currentProduct={currentProduct}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            productData={productData}
                          />
                          <div className="col-12 p-0">
                            <div className="m-0 w-100 px-md-3">
                              <div className="common-button-amazon mx-2">
                                <Link to="https://www.amazon.in/dp/B0DFWBLYRW">
                                  <button className="bg-dark-section text-uppercase px-3 px-lg-5 py-3 text-white f-16 f-rob-bol">
                                    <i className="fa-brands fa-amazon ml-4 mr-2 mt-1"></i>{" "}
                                    Also Buy On Amazon
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
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
                              <p className="ql-align-justify">
                                <b>Our USP:</b> Fusion Of Amino acid with Fat
                                burner Ingredients
                              </p>
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
                            <strong>Gomzi Nutrition Ignite Fat Burner</strong>
                          </p>
                          <p className="mb-3">
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
                            <strong>BENEFITS:</strong>
                          </p>
                          <p className="mb-2">
                            - Experience real results & better performance with
                            fat burning ingredients.
                          </p>
                          <p className="mb-2">
                            - Clinically proven & versatile supplement solution.
                          </p>
                          <p className="mb-3">- Controls Appetite & Hunger.</p>
                          <p>
                            <strong>Caution:</strong>
                          </p>
                          <p className="mb-2">
                            - Not for use by persons under the age of 18 years.
                          </p>
                          <p className="mb-2">
                            - Consult your doctor in case you are taking any
                            medication.
                          </p>
                          <p className="mb-2">
                            - This product is not intended to diagnose, treat,
                            cure or prevent any disease.
                          </p>
                          <p className="mb-2">
                            - Do not exceed recommended serving size.
                          </p>
                          <p className="mb-2">
                            - Store in a cool and dry place.
                          </p>
                          <p className="mb-2">
                            - Keep out of reach of children.
                          </p>
                          <p className="mb-3">
                            - This product is not to be used as a substitute for
                            a varied diet. Not recommended for children,
                            pregnant or lactating women. and people sensitive to
                            caffeine.
                          </p>
                          <p>
                            <strong>Direction For Use?</strong>
                          </p>
                          <p className="mb-2">
                            - Take 5g (scoop for beginners) once a day with 200
                            - 220 ml chilled water for an adult or as per
                            Healthcare Expert.
                          </p>
                          <p className="mb-3">
                            - Take 10g (scoop for professionals) once a day with
                            380 - 400 ml for an adult or as per Healthcare
                            Expert.
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
            src2="ignite-step-2.mp4"
            src3="step-3.mp4"
            src4="ignite-step-4.mp4"
            step1="Add 300 ml of water"
            step2="Mix 1 scoop of Ignite Fat Burner"
          />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="660e4e38d8ff4f8d9f2a51d4" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionIgniteFatBurner;
