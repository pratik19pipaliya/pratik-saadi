import React, { useEffect, useRef, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import LoginModal from "../../assets/js/popup/login.jsx";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import CertifiedProduct from "../../components/nutrition/certified";
import ModalVideo from "react-modal-video";
import HappyClientReview from "../../components/nutrition/happyClient";
import MoreProducts from "../../components/nutrition/moreProducts";
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
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionWheyProtein() {
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
      "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-4-1kg.webp",
    ],
    "2kg-Chocolate": [
      "/assets/images/nutrition/whey-protein-chocolate-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-chocolate-4-2kg.webp",
    ],
    "500g-Chocolate": [
      "/assets/images/nutrition/whey-protein-chocolate-1-500g.webp",
      "/assets/images/nutrition/whey-protein-chocolate-2-500g.webp",
      "/assets/images/nutrition/whey-protein-chocolate-3-500g.webp",
      "/assets/images/nutrition/whey-protein-chocolate-4-500g.webp",
    ],
    "1kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-mawa-kulfi-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-4-1kg.webp",
    ],
    "2kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-mawa-kulfi-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-4-2kg.webp",
    ],
    "500g-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-mawa-kulfi-1-500g.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-2-500g.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-3-500g.webp",
      "/assets/images/nutrition/whey-protein-mawa-kulfi-4-500g.webp",
    ],
    "1kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-mocha-coffee-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-4-1kg.webp",
    ],
    "2kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-mocha-coffee-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-4-2kg.webp",
    ],
    "500g-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-mocha-coffee-1-500g.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-2-500g.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-3-500g.webp",
      "/assets/images/nutrition/whey-protein-mocha-coffee-4-500g.webp",
    ],
    "1kg-Mango": [
      "/assets/images/nutrition/whey-protein-mango-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-mango-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-mango-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-mango-4-1kg.webp",
    ],
    "2kg-Mango": [
      "/assets/images/nutrition/whey-protein-mango-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-mango-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-mango-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-mango-4-2kg.webp",
    ],
    "500g-Mango": [
      "/assets/images/nutrition/whey-protein-mango-1-500g.webp",
      "/assets/images/nutrition/whey-protein-mango-2-500g.webp",
      "/assets/images/nutrition/whey-protein-mango-3-500g.webp",
      "/assets/images/nutrition/whey-protein-mango-4-500g.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "660e4b68d8ff4f8d9f2a51bc",
        img: "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp",
        name: "Whey Protein Chocolate",
        price: "3000",
        discount: "2550",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "66053d1979c49bf39f9728b0",
        img: "/assets/images/nutrition/whey-protein-chocolate-1-2kg.webp",
        name: "Whey Protein Chocolate",
        price: "5000",
        discount: "4250",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Chocolate",
      data: {
        id: "660e4baed8ff4f8d9f2a51bf",
        img: "/assets/images/nutrition/whey-protein-chocolate-1-500g.webp",
        name: "Whey Protein Chocolate",
        price: "1250",
        discount: "1060",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "66ab74a022fd9c2970834b42",
        img: "/assets/images/nutrition/whey-protein-mawa-kulfi-1-1kg.webp",
        name: "Whey Protein Mawa Kulfi",
        price: "3000",
        discount: "2550",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "66ab74e322fd9c2970834b46",
        img: "/assets/images/nutrition/whey-protein-mawa-kulfi-1-2kg.webp",
        name: "Whey Protein Mawa Kulfi",
        price: "5000",
        discount: "4250",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mawa Kulfi",
      data: {
        id: "66bf27cc8db3bcc2c0cd492c",
        img: "/assets/images/nutrition/whey-protein-mawa-kulfi-1-500g.webp",
        name: "Whey Protein Mawa Kulfi",
        price: "1250",
        discount: "1060",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "66ab754a22fd9c2970834b4a",
        img: "/assets/images/nutrition/whey-protein-mocha-coffee-1-1kg.webp",
        name: "Whey Protein Mocha Coffee",
        price: "3000",
        discount: "2550",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "66ab752c22fd9c2970834b48",
        img: "/assets/images/nutrition/whey-protein-mocha-coffee-1-2kg.webp",
        name: "Whey Protein Mocha Coffee",
        price: "5000",
        discount: "4250",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mocha Coffee",
      data: {
        id: "66bf27f88db3bcc2c0cd492f",
        img: "/assets/images/nutrition/whey-protein-mocha-coffee-1-500g.webp",
        name: "Whey Protein Mocha Coffee",
        price: "1250",
        discount: "1060",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mango",
      data: {
        id: "66ab758122fd9c2970834b4c",
        img: "/assets/images/nutrition/whey-protein-mango-1-1kg.webp",
        name: "Whey Protein Mango",
        price: "3000",
        discount: "2550",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mango",
      data: {
        id: "66ab75b522fd9c2970834b4e",
        img: "/assets/images/nutrition/whey-protein-mango-1-2kg.webp",
        name: "Whey Protein Mango",
        price: "5000",
        discount: "4250",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mango",
      data: {
        id: "66bf28278db3bcc2c0cd4932",
        img: "/assets/images/nutrition/whey-protein-mango-1-500g.webp",
        name: "Whey Protein Mango",
        price: "1250",
        discount: "1060",
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
    { id: "Chocolate", label: "Chocolate" },
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
    // setShowModal(false);
  };

  const currentProductData =
    products.find((product) => product.key === currentProduct)?.data || {};

  return (
    <>
      <PageMeta
        title="Buy Gomzi Nutrition Whey Protein Chocolate - Delicious & Nutrient-Rich
          Protein"
        description="Indulge in the rich taste of Gomzi Nutrition Whey Protein Chocolate, delivering 24g protein per serving. Perfect for muscle recovery and a delicious post-workout treat."
        keywords="Whey Protein Chocolate, chocolate protein powder, muscle recovery, post-workout protein, tasty whey protein, buy chocolate whey"
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
          "Hello, I wanted to know more about Gomzi Nutrition Whey Protein Blend. "
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
                      <p className="nutrition-content-1 text-bold">113</p>
                      <p className="nutrition-content-2 text-bold">Energy</p>
                    </div>
                    <div className="col-4 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">22</p>
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
                            4.8
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-PROTEIN/dp/B0DCZKDLM3/ref=sr_1_2?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi%2BLife%2BScience%2BLLP&qid=1725430766&sr=8-2&th=1">
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
                    <div className="col-12 p-0">
                      <div className="m-0 w-100 py-4 px-0 px-md-3">
                        <div className="common-button mx-2"></div>
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
                                <b>Our USP:</b> Fusion With creatine
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
                            <strong>Whey Protein</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein is a Mixture of Whey
                            Isolate, Whey Concentrate, Skimmed Milk powder, Soy
                            protein isolate and plant protein. It is packed with
                            24g of 100% High Quality whey protein per serving
                            (30g scoop). The benchmark and premium source of
                            protein powders. Each serving delivers an excellent
                            course of naturally occurring essential amino acids
                            and Branch Chain Amino Acids (BCAA's). The protein
                            found in Performance Whey Blend help support the
                            growth and maintenance of lean muscle mass, ideal
                            for everyone.
                          </p>
                          <p className="mb-3">
                            <strong>BETTER INGREDIENTS = BETTER RESULTS</strong>
                          </p>

                          <p>
                            <strong>NO COLORS:</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein does not contain any
                            COLOR or PRESERVATIVES.
                          </p>
                          <p>
                            <strong>NO ADDED SUGAR :</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein does not Contain any
                            Added SUGAR.
                          </p>
                          <p>
                            <strong>CONTAINS SUCRALOSE:</strong>
                          </p>
                          <p className="mb-3">
                            It also contains SUCRALOSE as a sweetening agent and
                            may taste bitter due to its natural properties.
                          </p>
                          <p>
                            <strong>TRUSTIFIED CERTIFIED:</strong>
                          </p>
                          <p className="mb-3">
                            Blind Testing for Protein & Macro Accuracy, Tested
                            for Amino Spiking & Heavy Metals.
                          </p>
                          <p>
                            <strong>DIRECTIONS:</strong>
                          </p>
                          <p className="mb-3">
                            Add one rounded scoop (30 gm) of Whey Protein to 180
                            - 200 ml of your favorite liquid such as water, skim
                            milk or almond milk. Stir with a spoon or shake in a
                            shaker for 20-25 seconds until protein powder fully
                            dissolves.
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
            <NutritionReviewSection product_id="660e4b68d8ff4f8d9f2a51bc" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionWheyProtein;
