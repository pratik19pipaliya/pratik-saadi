import React, { useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import { Link } from "react-router-dom";
import DownloadPdf from "../../pdf/white-labelling.pdf";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import PageMeta from "../../components/PageMeta";
import CertifiedProduct from "../../components/nutrition/certified";
import FactoryPhotoSection from "../../components/factoryPhotoSection";

function WhiteLabelling() {
  const canonicalUrl = window.location.href;
  const [selectedProduct, setSelectedProduct] = useState("concentrate");
  const [selectedPowerProduct, setSelectedPowerProduct] = useState("fatBurner");
  const [fade, setFade] = useState(true);

  const handleClick = (product) => {
    if (product !== selectedProduct) {
      setFade(false);
      setTimeout(() => {
        setSelectedProduct(product);
        setFade(true);
      }, 300);
    }
  };

  const handlePowerClick = (powerProduct) => {
    if (powerProduct !== selectedPowerProduct) {
      setFade(false);
      setTimeout(() => {
        setSelectedPowerProduct(powerProduct);
        setFade(true);
      }, 300);
    }
  };

  return (
    <>
      <PageMeta
        title="White Label Nutrition Products - Gomzi Nutrition Custom Solutions"
        description="Partner with Gomzi Nutrition for custom white-label nutrition products. Create your own brand with high-quality supplements and personalized packaging."
        keywords="white labelling nutrition, custom supplements, private label nutrition, build your brand, white label solutions, custom product packaging"
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
      <NutritionHeader />
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about White labelling products. "
        }
        options={{ pageRef: true }}
      />
      <section className="margintop-nutrition">
        <div className="container-fluid p-0 m-0">
          <div className="item active">
            <img
              className="d-none d-md-block w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/white-labelling-banner-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
            <img
              className="d-block d-md-none w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/white-labelling-banner-mobile-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </section>
      <div className="my-auto">
        <section className="header-main">
          <div className="px-1 py-2 bg-yellow text-center">
            <div className="item active">
              <Link to="/nutrition/bulk-inquiry-nutrition">
                <p className="text-white m-0 f-rob-reg f-14 lp-2">
                  Bulk Inquiry Now
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className="main-content mt-4">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-80 checkout-padding">
            <div className="col-12 px-0 mb-5 text-center">
              <h1 className="f-rob-bol f-35">Make Your Own Product</h1>
              <p>(Third Party Manufacturing)</p>
            </div>
            <div className="row no-gutters active-tab-shadow mb-5 p-4">
              <div className="col-12 mx-0 px-0">
                <div className="row w-100 flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-lg-6 px-0 px-md-3 mb-2 mt-2 mt-md-0 bulk-inquiry-left order-1">
                    <div className="item mb-3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/nutrition/supplements.webp"
                        }
                        alt="FG Group"
                        className="w-100"
                        width="100%"
                        height="auto"
                      />
                      <div className="d-flex justify-content-center">
                        <div className="d-flex">
                          <span
                            className={`select-button${
                              selectedProduct === "concentrate" ? "active" : ""
                            }`}
                            onClick={() => handleClick("concentrate")}
                          >
                            <p>Whey Concentrate</p>
                          </span>
                          <span
                            className={`select-button${
                              selectedProduct === "isolate" ? "active" : ""
                            }`}
                            onClick={() => handleClick("isolate")}
                          >
                            <p>Whey Isolate</p>
                          </span>
                          <span
                            className={`select-button${
                              selectedProduct === "whey" ? "active" : ""
                            }`}
                            onClick={() => handleClick("whey")}
                          >
                            <p>Whey 100%</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-0">
                    <div
                      className={`content-container ${
                        fade ? "fade-in" : "fade-out"
                      }`}
                    >
                      {selectedProduct === "concentrate" && (
                        <div className="row" id="concentrate">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">
                              Whey Protein Concentrate:
                            </h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  In the terms of performance,Whey Protein
                                  Concentrate is an excellent protein supplement
                                  for bodybuilders and fitness champions. As a
                                  result of the formula, proteins are absorbed
                                  by the body in the most bio-available way
                                  possible.
                                </p>
                                <p className="mb-2 text-left">
                                  Essentially,whey protein concentration
                                  contains 24.1g of Protein and 5.9g of BCAA.
                                  Each combination of whey provides different
                                  amounts and combinations of amino acids,
                                  resulting in different effects on the body.
                                  Since it is premium whey protein, the quality
                                  of each whey protein is quite high. With the
                                  addition of amino acids, the whey protein
                                  blend functions like regular protein. It
                                  should be noted that proteins are generally
                                  helpful in aiding Post-workout and Pre-workout
                                  recovery after an intense physical workout,
                                  resulting in greater protein synthesis rates.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the Whey Protein Concentrate product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Whey Isolate Details */}
                      {selectedProduct === "isolate" && (
                        <div className="row" id="isolate">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">
                              Whey Protein Isolate:
                            </h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  It is a 100% vegetarian, pure protein that
                                  boasts a single ingredient profile offering
                                  exactly what's on its label. The supplement is
                                  made in a GMP-compliant facility, is free from
                                  amino spiking, and undergoes 3rd party
                                  lab-testing to ensure excellence in purity and
                                  quality.
                                </p>
                                <p className="mb-2 text-left">
                                  Whey protein Isolate is processed to remove a
                                  significant portion of the fats and carbs,
                                  resulting in higher protein content per
                                  serving and making it suitable for those who
                                  are lactose-intolerant. The Dope-free,
                                  gluten-free, soy-free, unflavoured,
                                  unsweetened, unadulterated Whey Protein
                                  Isolate provides a concentrated dose of 26.05g
                                  protein, 5.97g BCAA, and 4.5g glutamine per
                                  serving.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the Whey Protein Isolate product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Whey Isolate Details */}
                      {selectedProduct === "whey" && (
                        <div className="row" id="whey">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">
                              Whey Protein 100%:
                            </h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  It is a Blend of Whey Isolate and Whey
                                  Concentrate with added DIGESTIVE ENZYMES for
                                  better absorption. It is packed with 24g of
                                  100% High Quality whey protein per serving
                                  (30g scoop). The benchmark and premium source
                                  of protein powders. Each serving delivers an
                                  excellent course of naturally occurring
                                  essential amino acids and Branch Chain Amino
                                  Acids (BCAA's). The protein found in
                                  Performance Whey 100% help support the growth
                                  and maintenance of lean muscle mass, ideal for
                                  everyone.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the Whey Protein 100% product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters active-tab-shadow mb-5 p-4">
              <div className="col-12 mx-0 px-0">
                <div className="row w-100 flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-lg-6 px-0 px-md-3 mb-2 mt-2 mt-md-0 bulk-inquiry-left order-1">
                    <div className="item mb-3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/nutrition/pre-workout-whitelabel.webp"
                        }
                        alt="FG Group"
                        className="w-100"
                        width="100%"
                        height="auto"
                      />
                      <div className="d-flex justify-content-center">
                        <div className="d-flex">
                          <span
                            className={`select-button${
                              selectedPowerProduct === "fatBurner"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handlePowerClick("fatBurner")}
                          >
                            <p>Fat Burner Pre Workout</p>
                          </span>
                          <span
                            className={`select-button${
                              selectedPowerProduct === "eaa" ? "active" : ""
                            }`}
                            onClick={() => handlePowerClick("eaa")}
                          >
                            <p>EAA Powder</p>
                          </span>
                          <span
                            className={`select-button${
                              selectedPowerProduct === "creatine"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handlePowerClick("creatine")}
                          >
                            <p>Creatine</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-0">
                    <div
                      className={`content-container ${
                        fade ? "fade-in" : "fade-out"
                      }`}
                    >
                      {selectedPowerProduct === "fatBurner" && (
                        <div className="row">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">
                              Fat Burner Pre Workout Powder:
                            </h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  It will suppress your appetite and provide you
                                  with a higher energy level in order to keep
                                  the adrenaline levels up. It will also boost
                                  your metabolism and burn calories for you. For
                                  permanent weight loss, it is recommended to
                                  use a fat burner which helps to reduce fat
                                  faster.Ignite The Fat Burner Pre-Workout is a
                                  sophisticated and comprehensive pre-workout
                                  fat burner supplement.
                                </p>
                                <p className="mb-2 text-left">
                                  Delivering intense energy, supercharged
                                  strength, and power, heightened focus,
                                  vein-popping pump and endurance, and superior
                                  workouts with enhanced thermogenic and
                                  fat-burning properties are just a few of the
                                  benefits of its uniquely developed formula.
                                  For athletes of all levels, Ignite The Fat
                                  Burner Pre-Workout is a highly stimulating and
                                  effective pre-workout fat-burning supplement
                                  that can assist maximize workout performance,
                                  burning fat more quickly, and pushing your
                                  body beyond previous boundaries.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the Fat Burner Pre Workout Powder product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedPowerProduct === "eaa" && (
                        <div className="row">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">EAA Powder:</h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  EAA is an advanced science-based solution that
                                  contains 13 Ultra amino acids as well as
                                  hydration and a vitamin booster combination.
                                  EAAs aid in muscle growth and regeneration
                                  while also lowering fatigue and soreness. This
                                  formula contains taurine, which aids in muscle
                                  re-energizing and mending, as well as
                                  citrulline, which aids in the oxygenation and
                                  elimination of toxins from muscles.
                                </p>
                                <p className="mb-2 text-left">
                                  This drink has a smooth and creamy texture
                                  thanks to Ultra Granulation Technology. 13
                                  Ultra Amino acids help in muscle recovery
                                  Muscle Hydrating Electrolytes help Hydrate
                                  Muscle Fibres for Proper Muscle & Nerve
                                  Function Added Vitamin booster blend that aids
                                  Muscle Growth and Health, Enhances Metabolism
                                  EAA that is Vegetarian, caffeine and banned
                                  substance free with no added sugar.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the EAA Powder product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedPowerProduct === "creatine" && (
                        <div className="row">
                          <div className="col-12">
                            <h2 className="f-rob-bol f-35">Creatine Powder:</h2>
                          </div>
                          <br />
                          <div className="col-12 return-policy-main">
                            <div className="mt-3 editor-text">
                              <div className="card-body tabata p-0">
                                <blockquote className="blockquote mb-0">
                                  <div className="schedule">
                                    <table className="table table-hover">
                                      <tbody>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Manufacturer
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Gomzi Lifescience LLP
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Size
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Customized (500 Gm,1 Kg, 2kg)
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Packaging Type
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Jar
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Composition
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            As Per Requirement
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Form
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Powder
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Flavour
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Different Type Of Flavours Are
                                            Available
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Shelf Life
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            18 Months
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Delivery Time
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            15-20 Days
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            MOQ
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            200Kg
                                          </td>
                                        </tr>
                                        <tr className="table-light">
                                          <td className="bg-light border border-gray text-dark f-14">
                                            Discount On Order
                                          </td>
                                          <td className="bg-light border border-gray text-dark f-14">
                                            70%
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </blockquote>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <p className="mb-3 text-left">
                                  Creatine monohydrate works by increasing the
                                  body's stores of phosphocreatine, a molecule
                                  that helps regenerate adenosine triphosphate
                                  (ATP), the primary energy source for muscle
                                  contractions during high-intensity activities
                                  like weightlifting and sprinting.
                                </p>
                                <p className="mb-2 text-left">
                                  By replenishing ATP stores more rapidly,
                                  creatine supplementation can lead to improved
                                  performance in short-duration, high-intensity
                                  exercises, allowing athletes and fitness
                                  enthusiasts to push harder and achieve greater
                                  results in their training sessions.
                                </p>
                              </div>
                              <div className="pb-2 ql-editor descriptionShow text-secondary">
                                <Link
                                  to="https://api.whatsapp.com/send?phone=6354051487&amp;text= Hello, I have an inquiry about third-party manufacturing for the Creatine Powder product."
                                  type="button"
                                  className="btn-interested mx-2 mt-3"
                                >
                                  Yes, I am interested!
                                </Link>
                                <a
                                  href={DownloadPdf}
                                  download
                                  className="btn-download-brochure mx-2 mt-3"
                                >
                                  Download Brochure
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="product-detail-main bg-white">
          <div className="container-fluid w-80">
            <div className="row justify-content-center w-100 mx-auto">
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
                        <div className="descriptionShow text-secondary whitelable-decription">
                          <p className="f-20">
                            <strong>Key Features:</strong>
                          </p>
                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b> High-Quality Whey Protein:</b> Our supplement
                            contains only the finest whey protein, providing a
                            rich source of essential amino acids for muscle
                            development and repair.
                          </p>

                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b> Muscle Growth:</b> The amino acids in whey
                            protein are essential for building lean muscle mass,
                            making this supplement ideal for those seeking
                            muscle growth and definition.
                          </p>
                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b>Great Taste:</b> We understand that palatability
                            is crucial. Our whey protein supplement offers a
                            delicious, easily mixable solution that will have
                            your customers looking forward to their daily
                            protein intake.
                          </p>
                          <p className="mt-2">
                            <strong>
                              Why Choose Our Premium Whey Protein Supplement:
                            </strong>
                          </p>
                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b>Customization:</b>Tailor the product to reflect
                            your brand identity. We offer various flavor options
                            and packaging choices to create a unique product for
                            your customers.
                          </p>

                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b>Quality Assurance: </b> Our supplement meets or
                            exceeds industry quality standards. We prioritize
                            rigorous quality control processes and maintain
                            state-of-the-art manufacturing facilities.
                          </p>
                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b>Innovation :</b> Stay at the forefront of the
                            protein supplement sector with our innovative
                            formulations.
                          </p>
                          <p className="mb-3 mt-3">
                            <i className="fas fa-caret-right f-14"></i>{" "}
                            <b>Customer-Centric Approach :</b> We provide
                            personalized support, collaborating closely with you
                            to ensure your brand's success in the protein
                            supplement market.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CertifiedProduct />
          <FactoryPhotoSection />
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default WhiteLabelling;
