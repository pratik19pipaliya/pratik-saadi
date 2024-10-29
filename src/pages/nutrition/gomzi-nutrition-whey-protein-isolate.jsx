import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
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
import ProductButtonsContainer from "../../components/nutrition/products/ProductButtonsContainer";
import SelectableList from "../../components/nutrition/products/SelectableList";
import ProductPhotoSection1 from "../../components/nutrition/ProductPhotoSection1";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import HowToUse from "../../components/nutrition/howToUse.jsx";
import ProteinComparison from "../../components/nutrition/proteinComparison.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function GomziNutritionWheyProteinIsolate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("1kg-Choco Brownie");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("1kg");
  const [activeFlavor, setActiveFlavor] = useState("Choco Brownie");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "1kg-Choco Brownie": [
      "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-4-1kg.webp",
    ],
    "2kg-Choco Brownie": [
      "/assets/images/nutrition/whey-protein-isolate-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-4-2kg.webp",
    ],
    "500g-Choco Brownie": [
      "/assets/images/nutrition/whey-protein-isolate-1-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-2-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-3-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-4-500g.webp",
    ],
    "1kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-4-1kg.webp",
    ],
    "2kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-4-2kg.webp",
    ],
    "500g-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-2-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-3-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-4-500g.webp",
    ],
    "1kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-4-1kg.webp",
    ],
    "2kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-4-2kg.webp",
    ],
    "500g-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-2-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-3-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-4-500g.webp",
    ],
    "1kg-Mango": [
      "/assets/images/nutrition/whey-protein-isolate-mango-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-4-1kg.webp",
    ],
    "2kg-Mango": [
      "/assets/images/nutrition/whey-protein-isolate-mango-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-4-2kg.webp",
    ],
    "500g-Mango": [
      "/assets/images/nutrition/whey-protein-isolate-mango-1-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-2-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-3-500g.webp",
      "/assets/images/nutrition/whey-protein-isolate-mango-4-500g.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Choco Brownie",
      data: {
        id: "660e4c37d8ff4f8d9f2a51c5",
        img: "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp",
        name: "Whey Protein Isolate Choco Brownie",
        price: "4500",
        discount: "3830",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Choco Brownie",
      data: {
        id: "660e4c11d8ff4f8d9f2a51c2",
        img: "/assets/images/nutrition/whey-protein-isolate-1-2kg.webp",
        name: "Whey Protein Isolate Choco Brownie",
        price: "9099",
        discount: "7730",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Choco Brownie",
      data: {
        id: "660e4c61d8ff4f8d9f2a51c8",
        img: "/assets/images/nutrition/whey-protein-isolate-1-500g.webp",
        name: "Whey Protein Isolate Choco Brownie",
        price: "2250",
        discount: "1920",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "66b0cc468db3bcc2c0cbb94b",
        img: "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-1kg.webp",
        name: "Whey Protein Isolate Mawa Kulfi",
        price: "4500",
        discount: "3830",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "66b0ccaa8db3bcc2c0cbb975",
        img: "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-2kg.webp",
        name: "Whey Protein Isolate Mawa Kulfi",
        price: "9099",
        discount: "7730",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mawa Kulfi",
      data: {
        id: "66bf2dbd8db3bcc2c0cd4b61",
        img: "/assets/images/nutrition/whey-protein-isolate-mawa-kulfi-1-500g.webp",
        name: "Whey Protein Isolate Mawa Kulfi",
        price: "2250",
        discount: "1920",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "66b0ccc68db3bcc2c0cbb978",
        img: "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-1kg.webp",
        name: "Whey Protein Isolate Mocha Coffee",
        price: "4500",
        discount: "3830",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "66b0ccd88db3bcc2c0cbb97d",
        img: "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-2kg.webp",
        name: "Whey Protein Isolate Mocha Coffee",
        price: "9099",
        discount: "7730",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mocha Coffee",
      data: {
        id: "66bf2de58db3bcc2c0cd4b64",
        img: "/assets/images/nutrition/whey-protein-isolate-mocha-coffee-1-500g.webp",
        name: "Whey Protein Isolate Mocha Coffee",
        price: "2250",
        discount: "1920",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mango",
      data: {
        id: "66b0cbf98db3bcc2c0cbb945",
        img: "/assets/images/nutrition/whey-protein-isolate-mango-1-1kg.webp",
        name: "Whey Protein Isolate Mango",
        price: "4500",
        discount: "3830",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mango",
      data: {
        id: "66b0cc108db3bcc2c0cbb948",
        img: "/assets/images/nutrition/whey-protein-isolate-mango-1-2kg.webp",
        name: "Whey Protein Isolate Mango",
        price: "9099",
        discount: "7730",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mango",
      data: {
        id: "66bf2e068db3bcc2c0cd4b67",
        img: "/assets/images/nutrition/whey-protein-isolate-mango-1-500g.webp",
        name: "Whey Protein Isolate Mango",
        price: "2250",
        discount: "1920",
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

  const flavorOptions = [
    { id: "Choco Brownie", label: "Choco Brownie" },
    { id: "Mawa Kulfi", label: "Mawa Kulfi" },
    { id: "Mocha Coffee", label: "Mocha Coffee" },
    { id: "Mango", label: "Mango" },
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
      <Helmet>
        <title>
          Gomzi Nutrition Whey Protein Isolate - Premium Protein for Lean Muscle
          Mass
        </title>
        <meta
          name="description"
          content="Get Gomzi Nutrition Whey Protein Isolate for rapid absorption and lean muscle building. Low in carbs and fat, with 27g protein per serving for clean nutrition."
        />
        <meta
          name="keywords"
          content="Whey Protein Isolate, lean muscle, low-carb protein, fast absorption protein, premium whey protein, high-protein isolate, buy protein powder"
        />
        <script>
          {`
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
        </script>
        <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1" />`}</noscript>

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38"
        ></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J50WNKGW38');
          `}
        </script>
      </Helmet>
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
          "Hello, I wanted to know more about Gomzi Nutrition's premium whey protein isolate. "
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
                      <p className="nutrition-content-1 text-bold">148</p>
                      <p className="nutrition-content-2 text-bold">Energy</p>
                    </div>
                    <div className="col-4 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">26</p>
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-protein/dp/B0DCP4VZ5H/ref=sr_1_1?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi+Life+Science+LLP&qid=1725430766&sr=8-1">
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
                                <b>Our USP:</b> Fusion With Fat Burning
                                Ingredients
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
                            <strong>100% PURE, ZERO AMINO SPIKED:</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein Isolate is a 100%
                            vegetarian, pure protein that boasts a single
                            ingredient profile offering exactly what's on its
                            label. The supplement is made in a GMP-compliant
                            facility, is free from amino spiking, and undergoes
                            3rd party lab-testing to ensure excellence in purity
                            and quality.
                          </p>
                          <p>
                            <strong>SUITABLE FOR LACTOSE INTOLERANT:</strong>
                          </p>
                          <p className="mb-3">
                            Whey Isolate is processed to remove a significant
                            portion of the fats and carbs, resulting in higher
                            protein content per serving and making it suitable
                            for those who are lactose-intolerant. The Dope-free,
                            gluten-free, soy-free, unflavored, unsweetened,
                            unadulterated Whey Protein Isolate provides an
                            isolated dose of protein 26.0 gm , BCAAs 5.97 gm and
                            EAAs 10.45 gm per serving.
                          </p>
                          <p>
                            <strong>
                              LOW CARB, FAST ABSORBING HIGH PROTEIN:
                            </strong>
                          </p>
                          <p className="mb-3">
                            The fast absorption rate of Whey Protein Isolate and
                            efficient utilization of amino acids ensures the
                            muscles receive the fuel they need quickly,
                            supporting post-workout recovery. Owing to its high
                            leucine content, and high EAAs, Whey Protein Isolate
                            is the best protein supplement to be consumed
                            post-workout.
                          </p>
                          <p>
                            <strong>HELPS PREVENT MUSCLE LOSS:</strong>
                          </p>
                          <p className="mb-3">
                            During periods of weight loss, adequate protein
                            intake, especially from high-quality protein sources
                            like Whey Isolate, can help counteract the muscle
                            loss by providing amino acids for sparing muscle
                            tissues. Unflavoured Whey is compatible with various
                            diet plans, including low-carb or ketogenic diets.
                          </p>
                          <p>
                            <strong>IMPROVES ATHLETIC PERFORMANCE:</strong>
                          </p>
                          <p className="mb-3">
                            The fast-digesting, complete protein quickly reduces
                            muscle soreness, repairs muscle damage, promotes
                            efficient recovery, and speeds up muscle growth
                            ultimately leading to improved athletic performance
                            and strength.
                          </p>
                          <p>
                            <strong>FLAVOUR FLEXIBLE, CONVENIENT:</strong>
                          </p>
                          <p className="mb-3">
                            The flavoured Whey Isolate allows you to personalize
                            the flavor of your shake by adding ingredients like
                            fruits, and nut butter, tailoring it to your
                            preferences without the influence of pre-added
                            flavours.
                          </p>
                          <p>
                            <strong>HOW TO USE WHEY PROTEIN ISOLATE:</strong>
                          </p>
                          <p className="mb-3">
                            Add 1 Scoop of Whey Protein Isolate Powder (30gm) in
                            180 to 200 ml of water or milk or your favorite
                            beverage.
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
          <ProteinComparison />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="660e4c37d8ff4f8d9f2a51c5" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionWheyProteinIsolate;
