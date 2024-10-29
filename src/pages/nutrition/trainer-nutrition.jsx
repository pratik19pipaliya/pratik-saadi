import React, { useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import Swal from "sweetalert2";
import { sendInquiry } from "../../assets/js/utils/contact-us.js";
import { Form } from "react-bootstrap";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import PageMeta from "../../components/PageMeta.jsx";

function TrainerNutrition() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [houseno, setHouseNo] = useState("");
  const [roadname, setRoadName] = useState("");
  const [pincode, setPincode] = useState("");
  const [traininggym, setTrainingGym] = useState("");
  const canonicalUrl = window.location.href;

  const handleApplyForInquiry = async (e) => {
    e.preventDefault();
    try {
      let modifiedMessage = `\n\nHouseNo: ${houseno}\n\nRoadName: ${roadname}\n\nPincode: ${pincode}\n\nTraining_Gym: ${traininggym}`;
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
      setTrainingGym("");
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

  // Owl Carousel options
  const carouselOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <>
      <PageMeta
        title="Gomzi Nutrition Trainer Packs - Supplements for Fitness Trainers &
          Athletes"
        description="Get customized nutrition packs for trainers with Gomzi Nutrition. Tailored supplements to support athletic performance and achieve fitness goals. Ideal for personal trainers and athletes."
        keywords="Trainer nutrition, athlete supplements, fitness trainer pack, customized supplements, athletic performance, buy trainer nutrition pack"
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
        message={"Hello, I wanted to know more about Bulk order for trainers. "}
        options={{ pageRef: true }}
      />
      <section className="margintop-nutrition">
        <div className="container-fluid p-0 m-0">
          <div className="item active">
            <img
              className="d-none d-md-block w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/trainer-nutrition-banner-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
            <img
              className="d-block d-md-none w-100"
              src={
                process.env.PUBLIC_URL +
                "/assets/images/nutrition/trainer-nutrition-banner-mobile-1.webp"
              }
              alt="trainer-nutrition-banner"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </section>
      <div className="main-content mt-5">
        <section
          className="checkout-main
                checkout-page-detail p-lg-4"
        >
          <div className="container-fluid w-80 checkout-padding">
            <div className="row no-gutters active-tab-shadow p-4">
              <div className="col-12 mx-0 px-0">
                <div className="row d-flex w-100 flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-lg-6 px-0">
                    <div className="col-12">
                      <h2 className="f-rob-bol f-30 text-black text-uppercase">
                        For Trainer & Dietician
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
                                        placeholder="Training at which Gym"
                                        name="state"
                                        className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        required=""
                                        value={traininggym}
                                        onChange={(e) =>
                                          setTrainingGym(e.target.value)
                                        }
                                      />
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
                  <div className="col-lg-6 px-0 px-md-3 mb-2 mt-2 mt-md-0">
                    <OwlCarousel
                      id="fwg-owl"
                      className="owl-theme mb-4"
                      {...carouselOptions}
                    >
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-1.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-2.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-3.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-4.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-5.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-6.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-7.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                      <div className="item">
                        <img
                          alt="Whey Protein Isolate"
                          className="img-fluid mx-auto product-img how-to-make-stap-video"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/store-8.webp"
                          }
                          width="100%"
                          height="auto"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="product-detail-right">
                      <div className="row">
                        <div className="col-12">
                          <h1 className="f-rob-bol f-22">
                            Offer For Trainer & Dietician
                          </h1>
                        </div>
                        <div className="col-12 return-policy-main">
                          <div className="editor-text">
                            <ul className="list-unstyled">
                              <li className="d-block mb-3">
                                <div className="mb-2 ql-editor descriptionShow text-secondary">
                                  <p className="ql-align-justify mb-2">
                                    - On selling of 15 Bottle of whey protein
                                    powder 1 combo of our product will be given
                                    to trainer and dietician.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - On sales of 1 Lakh per Month 10% Commision
                                    (10,000 Rs) will be Given to trainer And
                                    Dietician.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - On sales of 3 Lakh per Month 15% Commision
                                    (45,000 Rs) will be Given to trainer And
                                    Dietician.
                                  </p>
                                  <p className="ql-align-justify mb-2">
                                    - On sales of 6 Lakh per Month 20% (1,20,000
                                    Rs) Commision will be Given to trainer And
                                    Dietician.
                                  </p>
                                </div>
                              </li>
                            </ul>
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
      </div>
      <NutritionFooter />
    </>
  );
}

export default TrainerNutrition;
