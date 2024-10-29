import React, { useEffect, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "../../assets/css/nutrition.css";
import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import { axiosInstance } from "../../assets/js/config/api.js";
import dayjs from "dayjs";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import { useLocation } from "react-router";
import PageMeta from "../../components/PageMeta.jsx";

function TermsConditionCustomer() {
  const [orderData, setOrderData] = useState([]);
  const [showOrderSection, setShowOrderSection] = useState(false);
  const location = useLocation();
  const canonicalUrl = window.location.href;

  useEffect(() => {
    if (location.pathname === "/nutrition/terms-condition-customer") {
      setShowOrderSection(false);
    } else if (location.pathname === "/user/order") {
      setShowOrderSection(true);
      getOrderDetail();
    }
  }, [location.pathname]);

  const getOrderDetail = () => {
    axiosInstance
      .get(`/meals/get-product-tracking`)
      .then((response) => {
        if (response.data.data && response.data.data.length > 0) {
          setOrderData(response.data.data.reverse());
        }
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  const convertDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <PageMeta
        title="Gomzi Nutrition Terms & Conditions - Understand Our Policies"
        description="Review the terms and conditions of purchasing from Gomzi Nutrition. Learn about our shipping, returns, and customer service policies for a seamless experience."
        keywords="terms and conditions, Gomzi Nutrition policies, shipping policies, returns and exchanges, customer service, purchasing terms, supplement terms"
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
          "Hello, I wanted to know more about Terms & Conditions for Gomzi Nutrition Details. "
        }
        options={{ pageRef: true }}
      />
      {showOrderSection && (
        <>
          <section className="margintop-nutrition">
            <div className="container-fluid">
              <div className="container">
                <div className="Info">
                  <h2>Product Details</h2>
                </div>
                {orderData.map((order, index) => (
                  <div key={index} className="row border pb-4 rounded mt-5">
                    <div className="calc col-12 mt-1">
                      <p>
                        Ordered on {convertDate(order?.createdAt)} | Receipt ID:{" "}
                        {order?.receipt_id}
                      </p>
                    </div>
                    {order?.user_meal_product?.tracking.some(
                      (trackingElem) =>
                        trackingElem.shipment_status === "DELIVERED"
                    ) && (
                      <div className="col-12 meal">
                        <p className="mt-2 text-success f-20">
                          Delivered {convertDate(order?.updatedAt)}
                        </p>
                      </div>
                    )}
                    <div className="col-md-8 mt-2 meal">
                      <div className="Grocery2 float-left mt-3 w-100">
                        <div className="relet text-center">
                          <img
                            src={`https://files.fggroup.in/${order?.product?.display_image}`}
                            width="100px"
                            height="auto"
                            alt={order?.product?.name}
                          />
                        </div>
                        <div className="relet1">
                          <span className="min text-left">
                            <b>{order?.product?.name}</b>
                          </span>
                        </div>
                        <div className="price1">
                          {/* <p className="my-3">
                            ₹
                            {order?.product?.price /
                              order?.user_meal_product?.quantity}
                            /-
                          </p> */}
                          <span className="q1">
                            Quantity : {order?.user_meal_product?.quantity}{" "}
                          </span>
                          <p className="text-dark ml-3 mt-3">
                            {" "}
                            Total : ₹{order?.product?.price}/-
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 row">
                      <div className="col-md-4 meal">
                        <p className="mt-2 f-20">Delivery Address -</p>
                        <span>
                          {order?.notes?.address_line_1 +
                            (order?.notes?.address_line_2
                              ? ", " + order?.notes?.address_line_2
                              : "")}
                          ,
                        </span>
                        <span>
                          {order?.notes?.city}, {order?.notes?.pin_code}
                        </span>
                      </div>
                    </div>
                    {order?.user_meal_product?.tracking &&
                      order?.user_meal_product?.tracking.length > 0 && (
                        <div className="col-12 mt-3">
                          <div className="meal">
                            <h2 className="mt-2 f-20">Order Tracking :-</h2>
                          </div>
                          <div className="row meal">
                            <div
                              className={`order-tracking ${
                                order?.user_meal_product?.tracking.find(
                                  (trackingElem) =>
                                    trackingElem.shipment_status === "PLACED"
                                )
                                  ? "completed"
                                  : ""
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>
                                PLACED
                                <br />
                                <span>
                                  {convertDate(
                                    order?.user_meal_product?.tracking.find(
                                      (trackingElem) =>
                                        trackingElem.shipment_status ===
                                        "PLACED"
                                    )?.updatedAt
                                  )}
                                </span>
                              </p>
                            </div>
                            <div
                              className={`order-tracking ${
                                order?.user_meal_product?.tracking.find(
                                  (trackingElem) =>
                                    trackingElem.shipment_status ===
                                    "DISPATCHED"
                                )
                                  ? "completed"
                                  : ""
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>
                                DISPATCHED
                                <br />
                                <span>
                                  {order?.user_meal_product?.tracking.find(
                                    (trackingElem) =>
                                      trackingElem.shipment_status ===
                                      "DISPATCHED"
                                  )
                                    ? convertDate(
                                        order?.user_meal_product?.tracking.find(
                                          (trackingElem) =>
                                            trackingElem.shipment_status ===
                                            "DISPATCHED"
                                        )?.updatedAt
                                      )
                                    : ""}
                                </span>
                              </p>
                            </div>
                            <div
                              className={`order-tracking ${
                                order?.user_meal_product?.tracking.find(
                                  (trackingElem) =>
                                    trackingElem.shipment_status === "DELIVERED"
                                )
                                  ? "completed"
                                  : ""
                              }`}
                            >
                              <span className="is-complete"></span>
                              <p>
                                DELIVERED
                                <br />
                                <span>
                                  {order?.user_meal_product?.tracking.find(
                                    (trackingElem) =>
                                      trackingElem.shipment_status ===
                                      "DELIVERED"
                                  )
                                    ? convertDate(
                                        order?.user_meal_product?.tracking.find(
                                          (trackingElem) =>
                                            trackingElem.shipment_status ===
                                            "DELIVERED"
                                        )?.updatedAt
                                      )
                                    : ""}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      <div className="main-content margintop-nutrition">
        <section className="blog-main pb-5">
          <div>
            <div className="container-fluid w-80">
              <div className="row">
                <div className="col-12 pt-4 text-left">
                  <h1 className="f-rob-bol f-30 mb-2 text-black text-uppercase">
                    <b>Term and Condition For Customer</b>
                  </h1>
                </div>
                <div className="col-12 text-center mb-4 px-4">
                  <div className="ql-editor text-left mt-3">
                    <p className="mb-2">
                      Welcome to the <strong>Gomzi Nutrition family,</strong>{" "}
                      your ultimate destination for health and wellness. At
                      Gomzi Nutrition, we are committed to providing you with
                      top-notch products and services to support your journey
                      towards a healthier lifestyle. Before embarking on this
                      journey with us, please take a moment to familiarize
                      yourself with our Terms and Conditions.
                    </p>
                    <p className="mb-2">
                      Agreement Acceptance: By engaging with our Website,
                      participating in our Rewards or Reviews Program, or
                      sharing personal information, you signify your
                      understanding and acceptance of this Agreement. We're
                      excited to have you on board, but if you don't agree with
                      these terms, we kindly ask you to refrain from using our
                      services.
                    </p>
                    <p className="mb-2">
                      By accessing or utilizing the Service, you are consenting
                      to adhere to these Terms. If you disagree with any portion
                      of the terms, you are not permitted to access the Service.
                    </p>
                    <p className="mb-2">
                      By engaging with the Site, enrolling in the Rewards or
                      Reviews Program, or divulging any personal details to us:
                    </p>
                    <p className="mb-2">
                      (i) you acknowledge that you have perused and comprehended
                      the stipulations of this Agreement,
                    </p>
                    <p className="mb-2">
                      (ii) you agree to and accept being bound by the terms
                      outlined in this Agreement,
                    </p>
                    <p className="mb-2">
                      (iii) you consent to and undertake to comply with all
                      relevant laws and regulations concerning the subject
                      matter of this Agreement.
                    </p>
                    <p>
                      <br />
                    </p>
                    <p className="mb-2">
                      If you do not consent to the terms of this agreement,
                      refrain from accessing or utilizing the site,
                      participating in the rewards program or reviews program,
                      or disclosing any personal information to us.
                    </p>
                    <p className="mb-2">
                      All details provided to us by you, including sensitive
                      personal data, are voluntary.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Voluntary Participation:</strong>
                    </h4>
                    <p className="mb-2">
                      Your involvement in our Rewards and Reviews Programs is
                      entirely voluntary and is effective until either party
                      decides to terminate it. You have the freedom to opt-in or
                      opt-out at any time, with or without cause.
                    </p>
                    <h4>
                      <strong>Ownership of Rights:</strong>
                    </h4>
                    <p className="mb-2">
                      We take great pride in the content we provide on our
                      Website, and we want to ensure it's protected. Any
                      unauthorized use, modification, or distribution of our
                      content without explicit permission is strictly
                      prohibited.
                    </p>
                    <h4>
                      <strong>Accounts:</strong>
                    </h4>
                    <p className="mb-2">
                      When creating an account with us, please ensure that the
                      information you provide is accurate and up to date. Your
                      account security is important to us, so be sure to keep
                      your password confidential and notify us immediately of
                      any suspicious activity.
                    </p>
                    <h4>
                      <strong>Links to Other Websites:</strong>
                    </h4>
                    <p className="mb-2">
                      While we strive to provide valuable resources, we
                      acknowledge that there are other great sources of
                      information out there. However, we cannot take
                      responsibility for the content or policies of third-party
                      websites, so we encourage you to review their terms and
                      conditions before engaging with them.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Pricing Information:</strong>
                    </h4>
                    <p className="mb-2">
                      We do our best to ensure that our product and pricing
                      information is accurate, but occasionally errors may
                      occur. Rest assured, we reserve the right to correct any
                      mistakes and update information as needed. Our promotional
                      offers and discounts are subject to change, so keep an eye
                      out for the latest deals!
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>General Terms of Use:</strong>
                    </h4>
                    <p className="mb-2">
                      Gomzi Nutrition strives to offer the best prices possible
                      for products and services on our website. However, we
                      cannot guarantee that our prices will always be the lowest
                      in the city, region, or geography. Prices and availability
                      are subject to change without prior notice, and Gomzi
                      Nutrition bears no consequential liability.
                    </p>
                    <p className="mb-2">
                      Promotional prices displayed for items are valid only
                      during the specified promotion period and are not
                      applicable before or after the promotion dates.
                    </p>
                    <p className="mb-2">
                      All product offers are for limited stocks and limited
                      periods. Gomzi Nutrition reserves the right to modify,
                      extend, update, or withdraw offers on products without
                      prior notice. Any changes will be reflected on the website
                      accordingly.
                    </p>
                    <p className="mb-2">
                      Once a promo code is used, it cannot be refunded in the
                      event of an order cancellation by the customer.
                    </p>
                    <p className="mb-2">
                      We assure you that all products sold on Gomzi Nutrition
                      are genuine. Our suppliers are contractually obligated to
                      provide only authentic products. While we guarantee the
                      condition of the items you purchase, this guarantee does
                      not cover manufacturing defects.
                    </p>
                    <p className="mb-2">
                      Gomzi Nutrition reserves the right to cancel orders placed
                      by users at any time due to various reasons, such as
                      technical errors or unavailability of stocks. Our decision
                      to cancel an order is final, and we are not liable for
                      such cancellations.
                    </p>
                    <p className="mb-2">
                      Please note that the expected delivery time mentioned on
                      the website may vary from the usual delivery time.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Quantity Restrictions:</strong>
                    </h4>
                    <p className="mb-2">
                      To ensure fairness and prevent abuse, we may limit the
                      quantity of items purchased per person, household, or
                      order. If any restrictions apply to your order, we'll be
                      sure to notify you.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Accuracy of Content:</strong>
                    </h4>
                    <p className="mb-2">
                      We strive for accuracy in all aspects of our content, but
                      we're only human, and errors may happen. If you come
                      across any inaccuracies, please let us know, and we'll do
                      our best to rectify them promptly.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>No Healthcare Advice:</strong>
                    </h4>
                    <p className="mb-2">
                      The information and claims presented about products on our
                      site have not been reviewed by the Food Safety & Security
                      Authority of India or the United States Food and Drug
                      Administration. They are not authorized to diagnose,
                      treat, cure, or prevent any diseases.
                    </p>
                    <p className="mb-2">
                      Our website is not meant to offer medical advice,
                      diagnosis, or treatment. All content provided, including
                      information from third-party sites, is for informational
                      purposes only. It's essential to consult with a healthcare
                      professional for any medical or health-related concerns.
                    </p>
                    <p className="mb-2">
                      Information on medical conditions, treatments, and
                      products may be provided in summarized form. Content on
                      our site, including product labels or packaging, should
                      not replace advice from a healthcare provider. We
                      discourage self-management of health issues and advise
                      contacting a healthcare professional promptly for any
                      questions.
                    </p>
                    <p className="mb-2">
                      Links to third-party websites do not constitute an
                      endorsement of their content or services. Users visit such
                      sites at their own risk. Our site should not be used for
                      diagnosing or treating health issues, or prescribing
                      medications or treatments. It's crucial to consult with a
                      healthcare professional and review product information and
                      labels before using any medication, supplement, or
                      starting any exercise or diet program.
                    </p>
                    <p className="mb-2">
                      Individuals may react differently to products, and
                      interactions with medications should be discussed with a
                      physician. Comments and product ratings on our site
                      represent personal views and should not substitute for
                      medical care or advice from healthcare professionals.
                    </p>
                    <p className="mb-2">
                      Always refer to product labels or packaging before use,
                      and contact the manufacturer for clarification on labeling
                      details and recommended usage. We are not liable for
                      information provided on our site regarding supplement
                      recommendations or product claims. Dietary products are
                      not intended to cure, prevent, or treat diseases. Consult
                      a healthcare professional before starting any diet,
                      supplement, or exercise program. We do not guarantee or
                      warranty any products or services sold, and we are not
                      responsible for damages resulting from information or
                      services provided, even if we were informed of potential
                      damages.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Cancellation by Gomzi Nutrition:</strong>
                    </h4>
                    <p className="mb-2">
                      There might be occasions when Gomzi Nutrition is unable to
                      accept certain orders and must cancel them. Gomzi
                      Nutrition reserves the right, at its sole discretion, to
                      refuse or cancel any order for any reason whatsoever.
                      Users acknowledge and agree that such actions are
                      acceptable, and they will not dispute or raise any
                      objections. Reasons for order cancellation may include,
                      but are not limited to, product unavailability,
                      inaccuracies in pricing information, or issues identified
                      by Gomzi Nutrition's credit and fraud prevention
                      department.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Termination:</strong>
                    </h4>
                    <p className="mb-2">
                      We hope your journey with us is a long and fulfilling one,
                      but if for any reason you wish to terminate your account
                      or discontinue using our services, you're free to do so at
                      any time. Just know that we'll be sad to see you go!
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Governing Law:</strong>
                    </h4>
                    <p className="mb-2">
                      These Terms shall be governed by the laws of Delhi, India.
                      We believe in transparency and fairness, and we strive to
                      uphold these values in all aspects of our business.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Changes:</strong>
                    </h4>
                    <p className="mb-2">
                      As we continue to grow and evolve, we may need to make
                      updates to these Terms from time to time. We'll do our
                      best to notify you of any changes, but it's always a good
                      idea to check back periodically for updates.
                    </p>
                    <p>
                      <br />
                    </p>
                    <h4>
                      <strong>Contact Us:</strong>
                    </h4>
                    <p className="mb-2">
                      If you have any questions about this Privacy Policy, the
                      practices of this site, or your dealings with this site,
                      please contact us.
                    </p>
                    <p className="mb-2">
                      Thank you for taking the time to review our Terms and
                      Conditions. We're thrilled to have you as part of the
                      Gomzi Nutrition family, and we look forward to supporting
                      you on your journey to better health and wellness! If you
                      have any questions or concerns, please don't hesitate to
                      reach out to us.
                    </p>
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

export default TermsConditionCustomer;
