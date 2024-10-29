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

function GomziNutritionWheyProteinConcentrate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("1kg-Mawa Kulfi");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("1kg");
  const [activeFlavor, setActiveFlavor] = useState("Mawa Kulfi");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "1kg-Chocolate": [
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-4-1kg.webp",
    ],
    "2kg-Chocolate": [
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-4-2kg.webp",
    ],
    "500g-Chocolate": [
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-2-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-3-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-chocolate-4-500g.webp",
    ],
    "1kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-4-1kg.webp",
    ],
    "2kg-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-concentrate-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-4-2kg.webp",
    ],
    "500g-Mawa Kulfi": [
      "/assets/images/nutrition/whey-protein-concentrate-1-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-2-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-3-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-4-500g.webp",
    ],
    "1kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-4-1kg.webp",
    ],
    "2kg-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-4-2kg.webp",
    ],
    "500g-Mocha Coffee": [
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-2-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-3-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-4-500g.webp",
    ],
    "1kg-Mango": [
      "/assets/images/nutrition/whey-protein-concentrate-mango-1-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-2-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-3-1kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-4-1kg.webp",
    ],
    "2kg-Mango": [
      "/assets/images/nutrition/whey-protein-concentrate-mango-1-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-2-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-3-2kg.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-4-2kg.webp",
    ],
    "500g-Mango": [
      "/assets/images/nutrition/whey-protein-concentrate-mango-1-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-2-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-3-500g.webp",
      "/assets/images/nutrition/whey-protein-concentrate-mango-4-500g.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "66b0c8b48db3bcc2c0cbb8f6",
        img: "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-1kg.webp",
        name: "Whey Protein Concentrate Chocolate",
        price: "3500",
        discount: "2970",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "66b0c8d58db3bcc2c0cbb8f9",
        img: "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-2kg.webp",
        name: "Whey Protein Concentrate Chocolate",
        price: "6300",
        discount: "5350",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Chocolate",
      data: {
        id: "66bf33e68db3bcc2c0cd4b98",
        img: "/assets/images/nutrition/whey-protein-concentrate-chocolate-1-500g.webp",
        name: "Whey Protein Concentrate Chocolate",
        price: "1749",
        discount: "1490",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "660e4addd8ff4f8d9f2a51b6",
        img: "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp",
        name: "Whey Protein Concentrate Mawa Kulfi",
        price: "3500",
        discount: "2970",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "660e4a78d8ff4f8d9f2a51ad",
        img: "/assets/images/nutrition/whey-protein-concentrate-1-2kg.webp",
        name: "Whey Protein Concentrate Mawa Kulfi",
        price: "6300",
        discount: "5350",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mawa Kulfi",
      data: {
        id: "660e4b0ad8ff4f8d9f2a51b9",
        img: "/assets/images/nutrition/whey-protein-concentrate-1-500g.webp",
        name: "Whey Protein Concentrate Mawa Kulfi",
        price: "1749",
        discount: "1490",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "66b0c90c8db3bcc2c0cbb91c",
        img: "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-1kg.webp",
        name: "Whey Protein Concentrate Mocha Coffee",
        price: "3500",
        discount: "2970",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "66b0c8f48db3bcc2c0cbb915",
        img: "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-2kg.webp",
        name: "Whey Protein Concentrate Mocha Coffee",
        price: "6300",
        discount: "5350",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mocha Coffee",
      data: {
        id: "66bf34338db3bcc2c0cd4ba1",
        img: "/assets/images/nutrition/whey-protein-concentrate-mocha-coffee-1-500g.webp",
        name: "Whey Protein Concentrate Mocha Coffee",
        price: "1749",
        discount: "1490",
        size: "500g",
        dis_point: "15%",
      },
    },
    {
      key: "1kg-Mango",
      data: {
        id: "66b0c9478db3bcc2c0cbb922",
        img: "/assets/images/nutrition/whey-protein-concentrate-mango-1-1kg.webp",
        name: "Whey Protein Concentrate Mango",
        price: "3500",
        discount: "2970",
        size: "1 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "2kg-Mango",
      data: {
        id: "66b0c92d8db3bcc2c0cbb91f",
        img: "/assets/images/nutrition/whey-protein-concentrate-mango-1-2kg.webp",
        name: "Whey Protein Concentrate Mango",
        price: "6300",
        discount: "5350",
        size: "2 Kg",
        dis_point: "15%",
      },
    },
    {
      key: "500g-Mango",
      data: {
        id: "66bf345d8db3bcc2c0cd4ba4",
        img: "/assets/images/nutrition/whey-protein-concentrate-mango-1-500g.webp",
        name: "Whey Protein Concentrate Mango",
        price: "1749",
        discount: "1490",
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

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const currentProductData =
    products.find((product) => product.key === currentProduct)?.data || {};

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

  return (
    <>
      <PageMeta
        title="Buy Gomzi Nutrition Whey Protein Concentrate - Boost Muscle Growth &
          Recovery"
        description="Shop Gomzi Nutrition Whey Protein Concentrate for enhanced muscle growth and quick post-workout recovery. Packed with 24g protein per serving, ideal for fitness enthusiasts."
        keywords="Whey Protein Concentrate, muscle growth, post-workout recovery, high-protein supplement, buy whey protein, fitness nutrition, protein for athletes"
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
          "Hello, I wanted to know more about Gomzi Nutrition's pure whey protein concentrate. "
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
                    <div className="col-3 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">154</p>
                      <p className="nutrition-content-2 text-bold">Energy</p>
                    </div>
                    <div className="col-3 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">24</p>
                      <p className="nutrition-content-2 text-bold">Protein</p>
                    </div>
                    <div className="col-3 content-border-right p-0">
                      <p className="nutrition-content-1 text-bold">2.5</p>
                      <p className="nutrition-content-2 text-bold">
                        Carbohydrate
                      </p>
                    </div>
                    <div className="col-3 p-0">
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
                        <p>
                          MRP:-&nbsp;
                          <span className="price--line-through">
                            ₹ {currentProductData.price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-4 text-left text-md-right">
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-CONCENTRATE/dp/B0DCZ54B3S/ref=sr_1_5?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi+Life+Science+LLP&qid=1725430766&sr=8-5">
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
                                <b>Our USP:</b> Fusion With Glutamine Amino acid
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
                            <strong>
                              Gomzi Nutrition Whey Protein Concentrate
                            </strong>
                          </p>
                          <p className="mb-3">
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
                            <strong>BENEFITS:</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein Concentrate is a Pure
                            rich source of Protein, which helps to build lean
                            muscle, enhances recovery, supports healthy
                            metabolism and reduces muscle loss. A premium
                            protein source with a high biological value that
                            allows retaining muscle gains throughout the day.
                          </p>
                          <p>
                            <strong>Muscle growth and performance:</strong>
                          </p>
                          <p className="mb-3">
                            The building blocks to support rapid recovery. With
                            BCAAS as your foundation, you will be able to
                            support better strength gains. You deserve protein
                            supplements that help you to reach your full
                            potential, and you should have peace of mind knowing
                            they are safe to preserve.
                          </p>
                          <p>
                            <strong>
                              When should you drink whey protein?:
                            </strong>
                          </p>
                          <p className="mb-3">
                            Just after waking up in the morning. The pre-workout
                            should take place 30 minutes prior to the gym
                            session. Right after workout: right after exercise.
                            The last thing you need to do before going to bed is
                            to read.
                          </p>
                          <p>
                            <strong>HOW TO CONSUME?:</strong>
                          </p>
                          <p className="mb-3">
                            Add 180ml - 200ml of water or skimmed milk first to
                            the shaker and then add one heaping scoop (30g) Of
                            powder, mix immediately for 30 seconds for a thick
                            and creamy shake.
                          </p>
                          <p>
                            <strong>SAFE TO CONSUME:</strong>
                          </p>
                          <p className="mb-3">
                            Gomzi Nutrition Whey Protein Concentrate is Clean
                            Protein Supplement for your body: Many proteins get
                            that delicious flavor by adding in a ton of sugar.
                            We've accomplished that without any added sugar to
                            keep you healthy and safe. Also, Gomzi Nutrition
                            Whey Protein Concentrate are high in protein, Gluten
                            Free, No Artificial colors, Non-GMO, No Banned
                            Substances and No Amino spiking.
                          </p>
                          <p>
                            <strong>YOUR IDEAL WORKOUT PARTNER:</strong>
                          </p>
                          <p className="mb-3">
                            The quality standards of Gomzi Nutrition have always
                            been high. Each shake mixes up effortlessly using
                            just a glass and spoon and tastes consistently good,
                            shake after shake.
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
            <NutritionReviewSection product_id="660e4addd8ff4f8d9f2a51b6" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionWheyProteinConcentrate;
