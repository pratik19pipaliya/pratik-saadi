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
import HowToUse from "../../components/nutrition/howToUse.jsx";
import ProductButtonsContainer from "../../components/nutrition/products/ProductButtonsContainer.jsx";
import SelectableList from "../../components/nutrition/products/SelectableList.jsx";
import ProductPhotoSection1 from "../../components/nutrition/ProductPhotoSection1.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionMassGainerPowder() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("1kg-Chocolate");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("1kg");
  const [activeFlavor, setActiveFlavor] = useState("Chocolate");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "1kg-Chocolate": [
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-2-1kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-3-1kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-4-1kg.webp",
    ],
    "2kg-Chocolate": [
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-2kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-2-2kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-3-2kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-4-2kg.webp",
    ],
    "500g-Chocolate": [
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-500g.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-2-500g.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-3-2kg.webp",
      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-4-500g.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "6611338447003e22aea89fb5",
        img: "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp",
        name: "Mass Gainer Powder-1kg",
        price: "1500",
        discount: "1280",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "6611336747003e22aea89fb2",
        img: "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-2kg.webp",
        name: "Mass Gainer Powder-2kg",
        price: "2500",
        discount: "2120",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Chocolate",
      data: {
        id: "6611339f47003e22aea89fb8",
        img: "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-500g.webp",
        name: "Mass Gainer Powder",
        price: "750",
        discount: "640",
        size: "500g",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [
    { id: "1kg", label: "1kg" },
    { id: "2kg", label: "2kg" },
    { id: "500g", label: "500g" },
  ];

  const flavorOptions = [{ id: "Chocolate", label: "Chocolate" }];

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
        title="Gomzi Nutrition Mass Gainer Powder - Build Mass & Strength Fast"
        description="Gain weight and build muscle with Gomzi Nutrition Mass Gainer Powder, delivering a high-calorie blend of protein, carbs, and essential nutrients for rapid mass gains."
        keywords="Mass Gainer Powder, weight gainer, muscle building, mass gain supplement, high-calorie protein, build strength, buy mass gainer"
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
          "Hello, I wanted to know more about Gomzi Nutrition Mass Gainer Powder. "
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
                    <div className="col-4 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">262</p>
                      <p className="nutrition-content-2 text-bold">Energy</p>
                    </div>
                    <div className="col-4 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">17.5</p>
                      <p className="nutrition-content-2 text-bold">Protein</p>
                    </div>
                    <div className="col-4 p-0">
                      <p className="nutrition-content-1 text-bold">0</p>
                      <p className="nutrition-content-2 text-bold">Sugar</p>
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
                            4.7
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-GAINER/dp/B0DCVNM9MM/ref=sr_1_6?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi+Life+Science+LLP&qid=1725430766&sr=8-6">
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
                                <b>Our USP:</b> Fusion with BCAA Blend
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
                            <strong>Gomzi Nutrition Mass Gainer Powder</strong>
                          </p>
                          <p className="mb-3">
                            Achieve Your Bulking Goals with Gomzi Nutrition Mass
                            Gainer Powder. Our specially formulated blend is
                            designed to support muscle growth, weight gain, and
                            overall performance for bodybuilders and fitness
                            enthusiasts seeking to pack on size and strength
                            effectively.
                          </p>
                          <p>
                            <strong>Performance-Enhancing Formula:</strong>
                          </p>
                          <p className="mb-3">
                            Our meticulously crafted blend provides an optimal
                            combination of nutrients for maximum results. Each
                            serving delivers a powerful 17.5 grams of premium
                            protein, including a blend of fast and
                            slow-digesting proteins, ensuring sustained amino
                            acid delivery for muscle recovery and growth. The
                            strategic mix of carbohydrates and healthy fats
                            provides the necessary energy for intense workouts
                            and promotes weight gain effectively.
                          </p>
                          <p>
                            <strong>Key Benefits:</strong>
                          </p>
                          <p className="mb-2">
                            <b>Muscle Growth:</b> Our mass gainer is a rich
                            source of high-quality protein, essential for
                            promoting lean muscle mass development.
                          </p>
                          <p className="mb-2">
                            <b>Healthy Metabolism:</b> Fortified with essential
                            vitamins and minerals, our mass gainer supports
                            overall health and metabolism, ensuring optimal
                            function during intense training.
                          </p>
                          <p className="mb-3">
                            <b>Reduced Muscle Loss:</b> By providing a steady
                            supply of nutrients, our formula helps minimize
                            muscle breakdown, preserving hard-earned gains and
                            promoting muscle retention effectively.
                          </p>
                          <p>
                            <strong>Ideal Usage:</strong>
                          </p>
                          <p className="mb-2">
                            <b>Pre-Workout:</b> Consume a serving approximately
                            30 minutes before your workout to prime your body
                            with essential nutrients for optimal performance.
                          </p>
                          <p className="mb-2">
                            <b>Post-Workout:</b> Replenish your muscles
                            immediately after your workout to kickstart the
                            recovery process and support muscle repair and
                            growth effectively.
                          </p>
                          <p className="mb-3">
                            <b>Between Meals:</b> Use as a convenient and
                            nutritious snack between meals to increase calorie
                            intake and promote weight gain efficiently.
                          </p>
                          <p>
                            <strong>How to Consume:</strong>
                          </p>
                          <p className="mb-3">
                            Simply mix that can1 heaping scoop (approximately 80
                            grams) with 180-200ml of water or milk in a shaker
                            bottle or blender until smooth and creamy. Enjoy the
                            delicious and nutritious shake as part of your daily
                            routine to fuel your gains effectively.
                          </p>
                          <p>
                            <strong>Safe and Trusted:</strong>
                          </p>
                          <p className="mb-3">
                            Our commitment to delivering clean and safe
                            supplements means our formula is free from
                            artificial colors, GMOs, banned substances, and
                            amino spiking, ensuring only the highest quality
                            ingredients for your fitness goals.
                          </p>
                          <p>
                            <strong>Your Ultimate Workout Partner:</strong>
                          </p>
                          <p className="mb-3">
                            Trust Gomzi Nutrition Mass Gainer Powder to fuel
                            your gains and elevate your performance to the next
                            level. With our uncompromising commitment to quality
                            and taste, each shake mixes effortlessly and tastes
                            consistently delicious, providing you with the
                            perfect workout companion every time. By
                            highlighting these points in a more engaging and
                            effective manner, potential customers are more
                            likely to understand the benefits of Gomzi Nutrition
                            Mass Gainer Powder and feel motivated to incorporate
                            it into their fitness routine.
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
            <NutritionReviewSection product_id="6611338447003e22aea89fb5" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionMassGainerPowder;
