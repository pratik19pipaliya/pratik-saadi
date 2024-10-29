import React, { Suspense, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import { Form } from "react-bootstrap";
import { sendInquiry } from "../../assets/js/utils/contact-us.js";
import Swal from "sweetalert2";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import PageMeta from "../../components/PageMeta.jsx";
import { Oval } from "react-loader-spinner";
import Testimonials from "../../components/nutrition/testimonials.jsx";
import MainVideoSection from "../../components/nutrition/mainVideoSection.jsx";
import ProductDesignByGautam from "../../components/nutrition/productDesignByGautam.jsx";
import FactoryPhotoSection from "../../components/factoryPhotoSection.jsx";
import NutritionStoreImages from "../../components/nutrition/nutritionStoreImages.jsx";
import StoreLocation from "../../components/storeLocation.jsx";
import CertifiedProduct from "../../components/nutrition/certified.jsx";

function BulkInquiryNutrition() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [houseno, setHouseNo] = useState("");
  const [roadname, setRoadName] = useState("");
  const [pincode, setPincode] = useState("");
  const [gst, setGst] = useState("");
  const [income, setIncome] = useState("");
  const canonicalUrl = window.location.href;

  const handleApplyForInquiry = async (e) => {
    e.preventDefault();
    try {
      let modifiedMessage = `\n\nHouseNo: ${houseno}\n\nRoadName: ${roadname}\n\nPincode: ${pincode}\n\nGst: ${gst}\n\nIncome: ${income}`;
      await sendInquiry(
        name,
        email,
        phoneNumber,
        city,
        "Bulk Inquiry Nutrition",
        modifiedMessage,
        window.location.href,
        null,
        null,
        null
      );
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
      setHouseNo("");
      setRoadName("");
      setPincode("");
      setGst("");
      setIncome("");
      Swal.fire({
        icon: "success",
        title: "",
        text: "Thank You for Connecting us. We will Contact You Soon.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <PageMeta
        title="Bulk Nutrition Supplements - Gomzi Nutrition Wholesale & Bulk Orders"
        description="Order nutrition supplements in bulk from Gomzi Nutrition. Ideal for retailers and gyms, we offer wholesale pricing on premium supplements and powders."
        keywords="bulk nutrition supplements, wholesale supplements, buy in bulk, nutrition powder wholesale, bulk protein orders, gyms and retailers"
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
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about Bulk Inquiry Partner with Gomzi Nutrition. "
        }
        options={{ pageRef: true }}
      />
      <NutritionHeader />
      <section className="margintop-nutrition">
        <div className="container-fluid p-0 m-0">
          <div className="item active">
            <img
              className="d-none d-md-block w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/bulk-inquiry-nutrition-banner-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
            <img
              className="d-block d-md-none w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/bulk-inquiry-nutrition-banner-mobile-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </section>
      <div className="main-content py-5">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-80 checkout-padding">
            <div className="row no-gutters active-tab-shadow p-4">
              <div className="col-12 mx-0 px-0">
                <div className="row  w-100 flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-lg-6 px-0 px-md-3 mb-2 mt-2 mt-md-0">
                    <div className="item mb-3">
                      <img
                        alt="Whey Protein Isolate"
                        className="img-fluid border-radius-20 overflow-hidden mx-auto product-img"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/nutrition/for-whey-protein.webp"
                        }
                        width="100%"
                        height="auto"
                      />
                    </div>
                    <div className="product-detail-right">
                      <div className="row">
                        <div className="col-12">
                          <h1 className="f-rob-bol f-22">
                            Offer For Whey Protein
                          </h1>
                        </div>
                        <div className="col-12 return-policy-main">
                          <div className="editor-text">
                            <ul className="list-unstyled">
                              <li className="d-block mb-3">
                                <div className="mb-2 ql-editor descriptionShow text-secondary">
                                  {/* <p className="ql-align-justify mb-2">
                                                                        - For bulk Enquiry, Distributor have to Given minimum order quantity of 200 Kg
                                                                    </p> */}
                                  <p className="ql-align-justify mb-3 mt-3">
                                    - Distributor will get 30% discount on the
                                    purchase order.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - minimum order quantity of 200 Kg
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="item mb-3">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid border-radius-20 overflow-hidden mx-auto product-img"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/for-lgnite-fat-burner.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h1 className="f-rob-bol f-22">
                            Offer For Ignite Fat Burner
                          </h1>
                        </div>
                        <div className="col-12 return-policy-main">
                          <div className="editor-text">
                            <ul className="list-unstyled">
                              <li className="d-block mb-3">
                                <div className="mb-2 ql-editor descriptionShow text-secondary">
                                  {/* <p className="ql-align-justify mb-2">
                                                                        - For bulk Enquiry, Distributor have to Given minimum order quantity of 200 Kg
                                                                    </p> */}
                                  <p className="ql-align-justify mb-3 mt-3">
                                    - Distributor will get 30% discount on the
                                    purchase order.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - minimum order quantity of 100 Kg
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="item mb-3">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid border-radius-20 overflow-hidden mx-auto product-img"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/for-spark-eaa.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h1 className="f-rob-bol f-22">
                            Offer For Spark EAA
                          </h1>
                        </div>
                        <div className="col-12 return-policy-main">
                          <div className="editor-text">
                            <ul className="list-unstyled">
                              <li className="d-block mb-3">
                                <div className="mb-2 ql-editor descriptionShow text-secondary">
                                  {/* <p className="ql-align-justify mb-2">
                                                                        - For bulk Enquiry, Distributor have to Given minimum order quantity of 200 Kg
                                                                    </p> */}
                                  <p className="ql-align-justify mb-3 mt-3">
                                    - Distributor will get 30% discount on the
                                    purchase order.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - minimum order quantity of 100 Kg
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="item mb-3">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid border-radius-20 overflow-hidden mx-auto product-img"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/for-atp-creatine.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h1 className="f-rob-bol f-22">
                            Offer For ATP Creatine
                          </h1>
                        </div>
                        <div className="col-12 return-policy-main">
                          <div className="editor-text">
                            <ul className="list-unstyled">
                              <li className="d-block mb-3">
                                <div className="mb-2 ql-editor descriptionShow text-secondary">
                                  {/* <p className="ql-align-justify mb-2">
                                                                        - For bulk Enquiry, Distributor have to Given minimum order quantity of 200 Kg
                                                                    </p> */}
                                  <p className="ql-align-justify mb-3 mt-3">
                                    - Distributor will get 30% discount on the
                                    purchase order.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - minimum order quantity of 100 Kg
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-0 bulk-inquiry-left">
                    <div className="col-12">
                      <h2 className="f-rob-bol f-30 text-black text-uppercase">
                        For Distributor, Retailer, Reseller
                      </h2>
                    </div>
                    <div className="checkout-left">
                      <div className="card br-15 mb-3">
                        <div className="collapse show">
                          <div className="card-body">
                            <Form onSubmit={handleApplyForInquiry}>
                              <div className="row">
                                <div className="col-12 mb-4 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="Full Name"
                                        name="name"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="100"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mb-4 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="number"
                                        placeholder="Phone Number"
                                        name="state"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="100"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                          setPhoneNumber(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mb-4 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-6 mb-3 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="House No/Building Name/Office Name"
                                        name="officeName"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="150"
                                        value={houseno}
                                        onChange={(e) =>
                                          setHouseNo(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-6 mb-3 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="Road Name/Area/Colony"
                                        name="roadName"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="150"
                                        value={roadname}
                                        onChange={(e) =>
                                          setRoadName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-6 mb-3 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="150"
                                        value={city}
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-6 mb-3 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="Postal / Zip Code"
                                        name="state"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="100"
                                        value={pincode}
                                        onChange={(e) =>
                                          setPincode(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mb-4 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="GST Number"
                                        name="state"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="100"
                                        value={gst}
                                        onChange={(e) => setGst(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mb-4 p-0 px-1">
                                  <div>
                                    <div className="input-with-label d-flex align-items-center">
                                      <select
                                        type="text"
                                        placeholder="Training at which Gym"
                                        name="income"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        maxlength="100"
                                        value={income}
                                        onChange={(e) =>
                                          setIncome(e.target.value)
                                        }
                                      >
                                        <option>-Select-</option>
                                        <option>₹ 30,000</option>
                                        <option>₹ 30,000 - ₹ 1 Lakh </option>
                                        <option>₹ 1 Lakh - ₹ 3 Lakh</option>
                                        <option>₹ 3 Lakh - ₹ 10 Lakh</option>
                                        <option>₹ 10 Lakh & Above</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="common-button">
                                    <button
                                      type="submit"
                                      className="bg-yellow my-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                    >
                                      SAVE &amp; CONTINUE
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <ProductDesignByGautam />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <CertifiedProduct />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <MainVideoSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <Testimonials />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <FactoryPhotoSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <NutritionStoreImages />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <StoreLocation />
        </Suspense>
      </div>
      <NutritionFooter />
    </>
  );
}

export default BulkInquiryNutrition;
