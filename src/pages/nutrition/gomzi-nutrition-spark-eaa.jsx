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

function GomziNutritionSparkEAA() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductFlavor = searchParams.get("flavor");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("250g-Watermelon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Watermelon");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "250g-Watermelon": [
      "/assets/images/nutrition/spark-eaa-1.webp",
      "/assets/images/nutrition/spark-eaa-2.webp",
      "/assets/images/nutrition/spark-eaa-3.webp",
      "/assets/images/nutrition/spark-eaa-4.webp",
    ],
    "250g-Orange": [
      "/assets/images/nutrition/spark-eaa-orange-1.webp",
      "/assets/images/nutrition/spark-eaa-orange-2.webp",
      "/assets/images/nutrition/spark-eaa-orange-3.webp",
      "/assets/images/nutrition/spark-eaa-orange-4.webp",
    ],
  };

  const products = [
    {
      key: "250g-Watermelon",
      data: {
        id: "660e4e61d8ff4f8d9f2a51d7",
        img: "/assets/images/nutrition/spark-eaa-1.webp",
        name: "Spark EAA",
        price: "2099",
        discount: "1790",
        size: "250 gms",
        dis_point: "15%",
      },
    },
    {
      key: "250g-Orange",
      data: {
        id: "66bdd27c8db3bcc2c0cd2696",
        img: "/assets/images/nutrition/spark-eaa-orange-1.webp",
        name: "Spark EAA",
        price: "2099",
        discount: "1790",
        size: "250 gms",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Watermelon", label: "Watermelon" },
    { id: "Orange", label: "Orange" },
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
        title="Buy Gomzi Nutrition Spark EAA - Essential Amino Acids for Muscle
          Recovery"
        description="Fuel your muscles with Gomzi Nutrition Spark EAA, a blend of essential amino acids for enhanced muscle recovery and endurance. Perfect for athletes and fitness enthusiasts."
        keywords="Spark EAA, essential amino acids, muscle recovery, amino acid supplement, boost endurance, post-workout recovery, buy EAA powder"
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
          "Hello, I wanted to know more about Gomzi Nutrition's Spark EAA supplement. "
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
                    <div className="col-12 p-0">
                      <p className="nutrition-content-1 text-bold">7.8g</p>
                      <p className="nutrition-content-2 text-bold">EAA</p>
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
                            4.3
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-POWDER/dp/B0DCVFGZSS/ref=sr_1_4?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi+Life+Science+LLP&qid=1725430766&sr=8-4">
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
                            <strong>Gomzi Nutrition Whey Spark EAA</strong>
                          </p>
                          <p className="mb-3">
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
                          <p>
                            <strong>
                              What Are The Benefits Of Consuming Intra-Training
                              Drinks?
                            </strong>
                          </p>
                          <p className="mb-3">
                            Intra-training supplements are those energy drinks
                            that are consumed during training/workouts. They
                            contain ingredients that are readily absorbed by the
                            body to offer immediate effect with the aim to
                            provide delay intra-workout fatigue, hydration,
                            optimize muscle recovery and enhance performance.
                          </p>
                          <p>
                            <strong>How EAA Benefits?</strong>
                          </p>
                          <p className="mb-3">
                            Amino acids are organic substances that include
                            nitrogen, carbon, hydrogen, and oxygen, as well as a
                            variable side chain group. To develop and operate
                            properly, our bodies require 20 distinct amino
                            acids, out of which 9 are essential. Our bodies
                            cannot produce these 9 amino acids; thus, they must
                            be supplied through diet or supplementation, hence
                            are considered essential amino acids. The best EAA
                            supplement in India helps in increasing energy and
                            endurance, provides better muscle recovery, boosts
                            exercise and athletic performance, and better
                            hydration to the muscles.
                          </p>
                          <p>
                            <strong>How Does SPARK EAA Help?</strong>
                          </p>
                          <p className="mb-3">
                            Spark EAA is an advanced science-based formula
                            designed with a complete spectrum of 9 essential
                            amino acids with added hydration and a vitamin
                            booster blend. EAAs help in muscle development and
                            repair, as well as reducing muscle fatigue and
                            soreness. This formula contains taurine, which aids
                            in re-energizing and muscle healing, as well as
                            citrulline, which helps oxygenate and eliminate
                            toxins from muscles. The electrolytes combination
                            will aid in the hydration of muscle fibers as well
                            as healthy nerve and muscle function. The Vitamin
                            Booster combination promotes muscular growth and
                            metabolism. Designed with Ultra Granulation
                            Technology this drink has a smooth and creamy
                            texture, is banned substance free, and is available
                            in delicious flavor.
                          </p>
                          <p>
                            <strong>Who Can Opt For SPARK EAA?</strong>
                          </p>
                          <p className="mb-3">
                            Spark EAA can be consumed during intra-training/
                            workout by anyone who participates in sports, is
                            body-building, fitness enthusiast looking to improve
                            performance and recovery.
                          </p>
                          <p>
                            <strong>How To Use:</strong>
                          </p>
                          <p className="mb-3">
                            Add 1 scoop ( 10 gm ) of spark EAA in 400 - 420 ml
                            of water or your favorite drink. Mix well. Drink!
                          </p>
                          <p>
                            <strong>When To Use:</strong>
                          </p>
                          <p className="mb-3">During workouts or training.</p>
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
            src2="eaa-step-2.mp4"
            src3="step-3.mp4"
            src4="eaa-step-4.mp4"
            step1="Add 300 ml of water"
            step2="Mix 1 scoop of Spark EAA"
          />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="660e4e61d8ff4f8d9f2a51d7" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionSparkEAA;
