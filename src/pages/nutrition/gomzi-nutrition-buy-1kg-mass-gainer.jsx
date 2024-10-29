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
import HowToUse from "../../components/nutrition/howToUse.jsx";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import { axiosInstance } from "../../assets/js/config/api.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageMeta from "../../components/PageMeta.jsx";

function GomziNutritionBuy1MassGainer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
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
    id: "66a22fa31e55f03e92d535df",
    img: "/assets/images/nutrition/gomzi-nutrition-buy-1kg-mass-gainer-1.webp",
    name: "Mass Gainer Powder-1kg + ATP Creatine Monohydrate",
    price: "2499",
    discount: "3698",
    size: "Combo",
    dis_point: "27.40%",
  };

  const product = [
    "/assets/images/nutrition/gomzi-nutrition-buy-1kg-mass-gainer-1.webp",
    "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp",
    "/assets/images/nutrition/atp-creatine-1.webp",
    "/assets/images/nutrition/gomzi-nutrition-shaker.webp",
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const addToCart = localStorage.getItem("addtocart");
    if (addToCart === "true") {
      setTimeout(() => {
        setProductData(addtocartdata);
        setMenuOpen(true);
        localStorage.removeItem("addtocart");
      }, 2000);
    }
  }, []);

  return (
    <>
      <PageMeta
        title="Muscle Matrix Mass Gainer with Free Creatine & Shaker | Pre-Gym
          Nutrition"
        description="Boost your workout with Muscle Mass Gainer packed with collagen and pre-gym supplements. Free 250g creatine and shaker included. Your nutrition game!"
        keywords="optimum nutrition, nutrition, pre-gym supplements, supplements weight gainer, Weight Gainer For Men, protein for mass gainer, Whey Protein Powder, best Indian whey  protein, fat burner, pre-workout supplements"
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
          "Hello, I wanted to know more about Muscle Matrix Mass Gainer with Free Creatine & Shaker. "
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
                    {/* <div className="col-12 mt-3 d-block d-lg-none">
                                            <p className="f-rob-bol f-18">Size</p>
                                            <ul className="list-unstyled mb-0">
                                                <li className="mr-3 mb-3 d-inline-block">
                                                    <div className="avail-in-other-size-main">
                                                        <div className="d-block avail-in-other-size active">
                                                            <span
                                                                className="d-block product-type avail-other-size cp active"
                                                            ><p className="d-block m-0">Combo - 1</p></span
                                                            >
                                                            <div className="d-block product-type avail-other-price cp">
                                                                <p className="d-block m-0">₹1,799 + ₹749 = ₹2,499</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div> */}
                    <div className="col-12">
                      <h1 className="f-rob-bol f-22 text-bold">
                        Buy 1kg Mass Gainer And Get Free Creatine + Shaker
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          ₹3,698
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹2,499 /-
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹225/-</span>
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
                    <div className="col-12 mt-4">
                      <p className="f-rob-bol f-22">Combo</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/atp-creatine-1.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/gomzi-nutrition-shaker.webp"
                              }
                              className="product-intro-images-small"
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                      </ul>
                      <div>
                        <p className="ql-align-justify f-20 mb-1">
                          Total price:{" "}
                          <b className="multi-product-price">₹2,499</b>
                          {/* &nbsp;&nbsp;<del>₹3,698</del> */}
                        </p>
                      </div>
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
                          <p className="mb-5">
                            <b>Between Meals:</b> Use as a convenient and
                            nutritious snack between meals to increase calorie
                            intake and promote weight gain efficiently.
                          </p>
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
            src2="step-2.mp4"
            src3="step-3.mp4"
            src4="step-4.mp4"
            step1="Add 300 ml of water/milk"
            step2="Mix 1 scoop of Protein"
          />
          <HappyClientReview />
          <div className="rating-review-section mt-3 bg-secondaryyyy px-3 px-md-5 w-100">
            <NutritionReviewSection product_id="66a22fa31e55f03e92d535df" />
          </div>
          <CertifiedProduct />
          <MoreProducts />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionBuy1MassGainer;
