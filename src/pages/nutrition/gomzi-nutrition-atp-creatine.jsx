import React, { useRef, useState, useEffect } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import LoginModal from "../../assets/js/popup/login.jsx";
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import CertifiedProduct from "../../components/nutrition/certified";
import ModalVideo from "react-modal-video";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MoreProducts from "../../components/nutrition/moreProducts";
import HappyClientReview from "../../components/nutrition/happyClient";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import ProductPhotoSection1 from "../../components/nutrition/ProductPhotoSection1.jsx";
import SelectableList from "../../components/nutrition/products/SelectableList.jsx";
import ProductButtonsContainer from "../../components/nutrition/products/ProductButtonsContainer.jsx";
import HowToUse from "../../components/nutrition/howToUse.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../assets/js/config/api.js";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionATPCreatine() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductFlavor = searchParams.get("flavor");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("250g-Lemon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Lemon");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const canonicalUrl = window.location.href;

  const productImages = {
    "250g-Lemon": [
      "/assets/images/nutrition/atp-creatine-1.webp",
      "/assets/images/nutrition/atp-creatine-2.webp",
      "/assets/images/nutrition/atp-creatine-3.webp",
      "/assets/images/nutrition/atp-creatine-4.webp",
    ],
    "250g-Cola": [
      "/assets/images/nutrition/atp-creatine-cola-1.webp",
      "/assets/images/nutrition/atp-creatine-cola-2.webp",
      "/assets/images/nutrition/atp-creatine-cola-3.webp",
      "/assets/images/nutrition/atp-creatine-cola-4.webp",
    ],
  };

  const products = [
    {
      key: "250g-Lemon",
      data: {
        id: "660e4e81d8ff4f8d9f2a51da",
        img: "/assets/images/nutrition/atp-creatine-1.webp",
        name: "ATP Creatine Monohydrate",
        price: "1499",
        discount: "1270",
        size: "250g",
        dis_point: "15%",
      },
    },
    {
      key: "250g-Cola",
      data: {
        id: "66bdcc918db3bcc2c0cd2607",
        img: "/assets/images/nutrition/atp-creatine-cola-1.webp",
        name: "ATP Creatine Monohydrate",
        price: "1499",
        discount: "1270",
        size: "250g",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Lemon", label: "Lemon" },
    { id: "Cola", label: "Cola" },
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
        title="Gomzi Nutrition ATP Creatine - Enhance Strength & Muscle Performance"
        description="Maximize your strength and muscle gains with Gomzi Nutrition ATP Creatine. Proven to boost athletic performance, power, and muscle growth during workouts."
        keywords="ATP Creatine, creatine supplement, boost strength, muscle performance, creatine for athletes, power gains, buy creatine powder"
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
          "Hello, I wanted to know more about Gomzi Nutrition's ATP Creatine Monohydrate. "
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
                      <p className="nutrition-content-1 text-bold">4.5g</p>
                      <p className="nutrition-content-2 text-bold">
                        Monohydrate
                      </p>
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
                        <div className="col cp">
                          <span className="d-flex text-secondary cp"></span>
                          <div className="d-inline-block">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating text-secondary">
                                <LazyLoadImage
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/nutrition/star.0ed05b90.svg"
                                  }
                                  className="img-fluid mr-1"
                                  alt="star"
                                  effect="blur"
                                  width="100%"
                                  height="auto"
                                />
                                <span>4.5</span>
                              </span>
                            </div>
                          </div>
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
                                <Link to="https://www.amazon.in/Gomzi-Life-Science-LLP-CREATINE/dp/B0DCVDN6ZL/ref=sr_1_3?dib=eyJ2IjoiMSJ9.EKgs5TA2pAiBoRIGsq8mINJX7Ayrm7lSHkBJlJ8aCHH8R5dpnoG6ZGeAbkfk6GhY1ZfEb6jFBpBI-PwvPdPYjWqRxjS_8c3AKftqwKeqVAaMAMtmIuT_ygQDnC-MwOHySdrClcvssxheffcy7o91ww.McIjU6fs32mVq1RJoAPygEPCKaTzyvT3Qyvpwyv6JnY&dib_tag=se&keywords=Gomzi+Life+Science+LLP&qid=1725430766&sr=8-3">
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
                                <b>Our USP:</b> Micronized Form For Better Water
                                Absorbance
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
                              Gomzi Nutrition ATP Creatine Monohydrate
                            </strong>
                          </p>
                          <p className="mb-3">
                            Creatine monohydrate works by increasing the body's
                            stores of phosphocreatine, a molecule that helps
                            regenerate adenosine triphosphate (ATP), the primary
                            energy source for muscle contractions during
                            high-intensity activities like weightlifting and
                            sprinting.
                          </p>
                          {/* <p>
                            <strong>Weight Loss:</strong>
                          </p>
                          <p className="mb-3">
                            Creatine supplements can help people lose weight by
                            making their metabolism work better. These are
                            critical for the construction of muscles and their
                            capacity to incorporate proteins. Practice and other
                            ordinary assignments that require energy utilisation
                            raise digestion and interest in energy age.
                            Therefore, fat stores are utilised, which might help
                            with weight reduction.
                          </p> */}
                          <p>
                            <strong>
                              When To Consume Creatine Monohydrate?
                            </strong>
                          </p>
                          <p className="mb-3">
                            Creatine is a compelling intra and post-exercise
                            supplements. This implies that you ought to be
                            consuming these during your exercise center meeting
                            or following. This is because they are viable in
                            assisting with building and fixing muscle harms from
                            serious meetings. These impact the top around 30 to
                            an hour post utilization. In turn, you should drink
                            your supplements during that window to help build
                            muscle and improve muscle recovery. This will assist
                            with muscle irritation post-exercise.
                          </p>
                          <p>
                            <strong>
                              Precautions To Take When Consuming Creatine
                              Powder:
                            </strong>
                          </p>
                          <p className="mb-2">
                            - Following precautions must be taken when using
                            creatine supplements either as pre-workout or
                            post-workout.
                          </p>
                          <p className="mb-2">
                            - Creatine supplements might obstruct blood glucose
                            levels during and after medical procedures. You may
                            likewise be at expanded risk if you have persistent
                            liquor addiction or fanned-chain ketoaciduria.
                          </p>
                          <p className="mb-2">
                            - Also, if you're pregnant or breastfeeding, don't
                            indulge in creatine intake. These ought to be
                            utilised warily previously or during exercises that
                            require engine coordination, like driving.
                          </p>
                          <p className="mb-2">
                            - Creatine powder could likewise cause stomach
                            issues, including sickness, loose bowels, and
                            swelling.
                          </p>
                          <p className="mb-2">
                            - You should likewise peruse the mark of the item
                            cautiously to guarantee that you defeat results and
                            face no difficulties in the later stages.
                          </p>
                          <p className="mb-3">
                            - It is important to consult a doctor before you
                            begin with any kind of intake as he can guide you on
                            your dosage and intake frequency based on your
                            medical conditions.
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
            src2="atp-step-2.mp4"
            src3="step-3.mp4"
            src4="atp-step-4.mp4"
            step1="Add 300 ml of water"
            step2="Mix 1 scoop of ATP Creatine"
          />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="660e4e81d8ff4f8d9f2a51da" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionATPCreatine;
