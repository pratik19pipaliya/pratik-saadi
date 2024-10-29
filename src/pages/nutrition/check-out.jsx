import React, { useEffect, useState } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "../../assets/css/nutrition.css";
import {
  axiosInstance,
  publicAxiosInstance,
} from "../../assets/js/config/api.js";
import { createPaymentProduct } from "../../assets/js/utils/product.js";
import Swal from "sweetalert2";
import CheckOutLoginSignup from "../../components/nutrition/CheckOutLoginSignup.jsx";
import UserAddressForm from "../../components/nutrition/UserAddressForm.jsx";
import PageMeta from "../../components/PageMeta.jsx";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

function CheckOut() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const item_id = searchParams.get("item_id");
  const [totalPrice, setTotalPrice] = useState();
  const [totalMRPPrice, setTotalMRPPrice] = useState();
  const [productDatas, setProductDatas] = useState([[]]);
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const productData = localStorage.getItem("productsData");
  const [isOpen, setIsOpen] = useState(false);
  const [mainPrice, setMainPrice] = useState();
  const [manualCouponCode, setManualCouponCode] = useState("");
  const [couponAvailable, setCouponAvailable] = useState(false);
  const [manualCouponCodeData, setManualCouponCodeData] = useState("");
  const [storeCouponData, setStoreCouponData] = useState({});
  const canonicalUrl = window.location.href;
  const [prepaidCouponCode, setPrepaidCouponCode] = useState({});
  const [appliedCodes, setAppliedCodes] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
  });

  const handlePaymentModeChange = (e) => {
    const selectedMode = e.target.value;
    setPaymentMode(selectedMode);

    if (selectedMode === "ONLINE") {
      setPrepaidCouponCode({ discount: 0 });
    } else if (selectedMode === "Cash On Delivery") {
      setPrepaidCouponCode({ discount: 0 });
      setMainPrice(totalPrice);
      removePromoCode("GOMZI5", "COD");
    }
  };

  const UpdatedData = (productData) => {
    const data = JSON.parse(productData);
    setMainPrice(data.totalAmount);
    setProductDatas(data.products);
    setTotalPrice(data.totalAmount);
    setTotalMRPPrice(data.totalMRP);
  };

  useEffect(() => {
    if (productData) {
      getUserData();
      UpdatedData(productData);
    }
  }, [productData]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const compareUserData = (updatedUserData) => {
    return (
      updatedUserData.pin_code === userData.pin_code &&
      updatedUserData.address_line_1 === userData.address_line_1 &&
      updatedUserData.address_line_2 === userData.address_line_2 &&
      updatedUserData.city === userData.city &&
      updatedUserData.email === userData.email
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        pin_code: e.target.postalCode.value,
        address_line_1: e.target.officeName.value,
        address_line_2: e.target.roadName.value,
        city: e.target.city.value,
        state: e.target.state.value,
        country: e.target.country.value,
        email: e.target.email.value,
      };
      const payment_mode = paymentMode;
      if (!userData.username) {
        await updateUserData(updatedUserData);
      } else if (!compareUserData(updatedUserData)) {
        await updateUserData(updatedUserData);
      }
      try {
        const coupon_ids = [
          storeCouponData._id,
          prepaidCouponCode._id,
          manualCouponCodeData._id,
        ].filter(Boolean);
        await createPaymentProduct(
          item_id
            ? [{ product_id: "670a5a7b9a7dbcdce616398d", quantity: 1 }]
            : productDatas,
          updatedUserData,
          coupon_ids,
          payment_mode
        );
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
  };

  const updateUserData = async (data) => {
    try {
      await axiosInstance.post("/account/update-profile", data);
      getUserData();
    } catch (error) {
      console.error("Error in updateUserData:", error);
    }
  };

  const applyPromoCode = async (code) => {
    if (!appliedCodes.includes(code)) {
      setAppliedCodes((prevCodes) => [...prevCodes, code]);
      if (code === "GOMZI5") {
        handleApplyPrepaidClick(code);
      } else {
        handleApplyClick(code);
      }
    }
  };

  const removePromoCode = (code, action) => {
    setAppliedCodes((prevCodes) => prevCodes.filter((item) => item !== code));
    setManualCouponCode("");
    if (action === "COD") {
      calculateDiscountedPrice({ discount: 0 }, "COD");
    } else {
      calculateDiscountedPrice({ discount: 0 }, "remove");
    }
    if (code !== "GOMZI5") {
      window.location.reload();
    }
  };

  const handleApplyPrepaidClick = async (coupon_code) => {
    try {
      const code = coupon_code;
      const payload = { coupon_code: code };
      const response = await publicAxiosInstance.post(
        "/check-coupon-code",
        payload
      );

      const couponData = response.data.data;

      setPrepaidCouponCode(couponData);
      toast.success("Apply coupon code successfully");
      calculateDiscountedPrice(couponData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error applying coupon code!",
      });
    }
  };

  const handleApplyClick = async (coupon_code) => {
    try {
      if (manualCouponCodeData && couponAvailable) {
        setManualCouponCodeData("");
        setManualCouponCode("");
        setCouponAvailable(false);
        setAppliedCodes("");
        return;
      } else if (couponAvailable && storeCouponData) {
        setAppliedCodes("");
        setStoreCouponData("");
        setCouponAvailable(false);
        return;
      }

      const code = coupon_code || manualCouponCode;
      const payload = { coupon_code: code };
      const response = await publicAxiosInstance.post(
        "/check-coupon-code",
        payload
      );

      const couponData = response.data.data;

      if (coupon_code === "GOMZI5") {
        setPrepaidCouponCode(couponData);
      } else if (manualCouponCode) {
        setCouponAvailable(true);
        setManualCouponCodeData(couponData);
      } else {
        setCouponAvailable(true);
        setStoreCouponData(couponData);
      }
      toast.success("Apply coupon code successfully");
      calculateDiscountedPrice(couponData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error applying coupon code!",
      });
    }
  };

  const calculateDiscountedPrice = (couponData, action) => {
    let discountAmount = 0;
    const storeDiscount = storeCouponData.discount || 0;
    let prepaidDiscount;
    if (action === "COD") {
      prepaidDiscount = 0;
    } else {
      prepaidDiscount = prepaidCouponCode.discount || 0;
    }

    const latestDiscount = couponData.discount || 0;
    const totalDiscount = storeDiscount + prepaidDiscount + latestDiscount;
    discountAmount += (totalPrice * totalDiscount) / 100;

    const discountedPrice = totalPrice - discountAmount;
    setMainPrice(discountedPrice > 0 ? discountedPrice : totalPrice);
    setTotalDiscount(totalDiscount);
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      const userData = response.data.data;
      if (userData) {
        setUserData({
          pin_code: userData.user?.address?.pin_code || "",
          address_line_1: userData.user?.address?.address_line_1 || "",
          address_line_2: userData.user?.address?.address_line_2 || "",
          city: userData.user?.address?.city || "",
          email: userData.user?.email || "",
        });
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  return (
    <>
      <PageMeta
        title="Checkout at Gomzi Nutrition - Secure & Fast Payment Options"
        description="Complete your purchase at Gomzi Nutrition with secure and fast checkout options. Hassle-free payment process for all your nutrition and supplement needs."
        keywords="checkout, secure payment, fast checkout, complete purchase, nutrition checkout, buy supplements, Gomzi Nutrition checkout"
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
      {/* <div className="container-fluid checkout-page-main enjoy p-0">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/nutrition/enjoy.gif"}
          width="100%"
          alt="fggroup"
        />
      </div> */}
      <div className="main-content margintop-nutrition py-5 checkout-page-main">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-80 checkout-padding">
            <div className="row no-gutters">
              <div className="col-12 mb-3">
                <h2 className="f-rob-bol f-30 text-black text-uppercase">
                  Check Out
                </h2>
              </div>
              <div className="col-12 mx-0 px-0">
                <div className="row d-flex w-100 flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-12 col-md-7 col-lg-8 px-0 px-md-3">
                    <div className="checkout-left" id="accordion">
                      <CheckOutLoginSignup />
                      <div className="card br-15 mb-3 active-tab-shadow">
                        <div className="card-header bg-white" id="headingTwo">
                          <div data-toggle="" data-target="#collapseTwo">
                            <span className="f-rob-bol f-16 text-uppercase text-secondary">
                              <i className="fas fa-check-circle mr-2"></i>
                              ADD ADDRESS
                            </span>
                          </div>
                        </div>
                        <div id="collapseTwo" className="collapse show">
                          <UserAddressForm
                            userData={userData}
                            handleFormSubmit={handleFormSubmit}
                          />
                        </div>
                      </div>
                      <div className="card br-15 mb-3 active-tab-shadow">
                        <div className="card-header bg-white" id="headingTwo">
                          <div data-toggle="" data-target="#collapseTwo">
                            <span className="f-rob-bol f-16 text-uppercase text-secondary">
                              <i className="fas fa-check-circle mr-2"></i>
                              SELECT PAYMENT MODE
                            </span>
                          </div>
                        </div>
                        <div id="collapseTwo" className="collapse show">
                          <div className="card-body px-4 px-xl-5">
                            <div className="row">
                              <div className="col-12">
                                <div className="checkbox-wrapper-16">
                                  <label className="checkbox-wrapper mx-2">
                                    <input
                                      type="radio"
                                      className="checkbox-input"
                                      name="paymentMode"
                                      value="Cash On Delivery"
                                      onChange={handlePaymentModeChange}
                                    />
                                    <span className="checkbox-tile">
                                      <span className="checkbox-icon">
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/assets/images/icon/loan.png"
                                          }
                                          className="border-radius-20"
                                          width="32px"
                                          alt="fggroup"
                                        />
                                      </span>
                                      <span className="checkbox-label">
                                        COD
                                      </span>
                                    </span>
                                  </label>
                                  <label className="checkbox-wrapper mx-2">
                                    <input
                                      type="radio"
                                      checked
                                      className="checkbox-input"
                                      name="paymentMode"
                                      value="ONLINE"
                                      onChange={handlePaymentModeChange}
                                    />
                                    <span className="checkbox-tile">
                                      <span className="checkbox-icon">
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/assets/images/nutrition/cashless-payment.webp"
                                          }
                                          className="border-radius-20"
                                          width="32px"
                                          alt="fggroup"
                                        />
                                      </span>
                                      <span className="checkbox-label">
                                        Online
                                      </span>
                                      <p className="offer-label">
                                        Free Consultation
                                      </p>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-12">
                                <div className="common-button">
                                  <button
                                    type="button"
                                    className="bg-yellow my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                    onClick={() => {
                                      if (paymentMode) {
                                        document
                                          .querySelector("form")
                                          .requestSubmit();
                                      } else {
                                        Swal.fire({
                                          icon: "error",
                                          title: "Error!",
                                          text: "Please select a payment method.",
                                        });
                                      }
                                    }}
                                  >
                                    SAVE &amp; CONTINUE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 col-lg-4 px-0 px-md-3 promo-code-sticky mb-2 mt-2 mt-md-0">
                    {/* <div className="d-block">
                      <div className="mb-3">
                        <form>
                          <div
                            className="d-block"
                            tabIndex="-1"
                            role="dialog"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog m-0 w-100 modal-dialog-centered">
                              <div className="modal-content br-15 p-3">
                                <div className="d-flex bg-transparent">
                                  <div className="col-12 px-0">
                                    <h3 className="f-pop-sembol f-18">
                                      Apply Promo Code
                                    </h3>
                                  </div>
                                </div>
                                <div className="d-flex my-3 align-items-center justify-content-between border p-3 br-15">
                                  <input
                                    id="coupon_code"
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    name="coupon_code"
                                    className="form-control mr-2"
                                    value={manualCouponCode}
                                    onChange={handleOnChange}
                                    maxLength="100"
                                  />
                                  <div className="d-inline-block">
                                    <button
                                      id="apply_main_btn"
                                      type="button"
                                      onClick={() => handleApplyClick()}
                                      className="btn btn-success"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                                <div className="col-12 apply-promo-modal">
                                  <div className="mb-3 p-3 border br-15">
                                    <label className="radio-main m-0 d-block">
                                      <span className="promo-code py-1 px-3 f-rob-bol f-14">
                                        GOMZI15
                                      </span>
                                      {appliedCodes.includes("GOMZI15") ? (
                                        <span
                                          className="remove-btn px-3 text-red f-rob-bol f-14 d-inline-block float-right"
                                          onClick={() =>
                                            removePromoCode("GOMZI15")
                                          }
                                        >
                                          Remove
                                        </span>
                                      ) : (
                                        <span
                                          className="apply-btn px-3 text-green f-rob-bol f-14 d-inline-block float-right"
                                          onClick={() =>
                                            applyPromoCode("GOMZI15")
                                          }
                                        >
                                          Apply
                                        </span>
                                      )}
                                      <p className="f-rob-med f-16 mt-2 mb-1">
                                        Use Code "GOMZI15". For 15% Off
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> */}
                    <div className="col-12 mb-3 border bg-white p-3 br-15 d-block d-md-none price-mb">
                      <div
                        className={`ReactCollapse--collapse ${
                          isOpen ? "open" : ""
                        }`}
                        aria-hidden={!isOpen}
                        style={{
                          height: isOpen ? "auto" : "0px",
                          overflow: "hidden",
                        }}
                        id="opendata"
                      >
                        <div className="ReactCollapse--content">
                          <div className="col-12 mb-3 bg-white py-2 px-3 d-block d-md-none border-bottom">
                            <div className="col-12 p-0">
                              <ul className="list-unstyled mb-0 amount-payee-list">
                                {/* <li className="d-block mb-3">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-inline-block p-0 text-left">
                                      <p className="m-0 f-rob-reg f-16 text-secondary">
                                        MRP
                                      </p>
                                    </div>
                                    <div className="d-inline-block p-0 text-right">
                                      <p className="m-0 f-rob-med f-16">
                                        ₹{totalMRPPrice}
                                      </p>
                                    </div>
                                  </div>
                                </li> */}
                                <li className="d-block mb-3">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-inline-block p-0 text-left">
                                      <p className="m-0 f-rob-reg f-16 text-secondary">
                                        Order Total
                                      </p>
                                    </div>
                                    <div className="d-inline-block p-0 text-right">
                                      <p className="m-0 f-rob-med f-16">
                                        ₹{Math.round(mainPrice).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                                {totalDiscount !== 0 && (
                                  <li className="d-block mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-inline-block p-0 text-left">
                                        <p className="m-0 f-rob-reg f-16 text-secondary">
                                          Discount
                                        </p>
                                      </div>
                                      <div className="d-inline-block p-0 text-danger text-right">
                                        <p className="m-0 f-rob-med f-16">
                                          -{" "}
                                          {totalDiscount !== undefined &&
                                          totalDiscount !== null
                                            ? totalDiscount
                                            : 0}
                                          %
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                )}

                                <li className="d-block mb-3">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-inline-block p-0 text-left">
                                      <p className="m-0 f-rob-reg f-16 text-secondary">
                                        Delivery Charges
                                      </p>
                                    </div>
                                    <div className="d-inline-block p-0 text-right">
                                      <p className="m-0 f-rob-med f-16">
                                        <span className="f-rob-med f-16 text-green text-uppercase ml-1">
                                          ₹{mainPrice <= 499 ? 85 : "FREE"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 p-0 d-flex justify-content-between align-items-center"
                        id="clickonthis"
                        onClick={toggleCollapse}
                      >
                        <p className="m-0 f-rob-med f-16">Amount Payable</p>
                        <p className="m-0 f-rob-med f-16">
                          ₹
                          {mainPrice <= 499
                            ? mainPrice + 85
                            : Math.round(mainPrice)}
                          <i
                            className={`cp fa fa-chevron-${
                              isOpen ? "down" : "up"
                            } f-18 text-yellow ml-2`}
                            aria-hidden="true"
                          ></i>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 mb-3 border bg-white p-3 br-15 d-none d-md-block">
                      <div className="col-12 p-0">
                        <p className="f-pop-sembol f-16 mb-0">Price Details</p>
                      </div>
                      <div className="col-12 p-0 mt-2">
                        <ul className="list-unstyled border-bottom">
                          {/* <li className="d-block mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-inline-block p-0 text-left">
                                <p className="m-0 f-rob-reg f-16 text-secondary">
                                  MRP
                                </p>
                              </div>
                              <div className="d-inline-block p-0 text-right">
                                <p className="m-0 f-rob-med f-16">
                                  ₹{totalMRPPrice}
                                </p>
                              </div>
                            </div>
                          </li> */}
                          <li className="d-block mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-inline-block p-0 text-left">
                                <p className="m-0 f-rob-reg f-16 text-secondary">
                                  Order Total
                                </p>
                              </div>
                              <div className="d-inline-block p-0 text-right">
                                <p className="m-0 f-rob-med f-16">
                                  ₹{totalPrice}
                                </p>
                              </div>
                            </div>
                          </li>
                          {totalDiscount !== 0 && (
                            <li className="d-block mb-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-inline-block p-0 text-left">
                                  <p className="m-0 f-rob-reg f-16 text-secondary">
                                    Discount
                                  </p>
                                </div>
                                <div className="d-inline-block p-0 text-right">
                                  <p className="m-0 f-rob-med f-16 text-red">
                                    - {totalDiscount ? totalDiscount : 0}%
                                  </p>
                                </div>
                              </div>
                            </li>
                          )}
                          <li className="d-block mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-inline-block p-0 text-left">
                                <p className="m-0 f-rob-reg f-16 text-secondary">
                                  Delivery Charges
                                </p>
                              </div>
                              <div className="d-inline-block p-0 text-right">
                                <p className="m-0 f-rob-med f-16">
                                  <span className="f-rob-med f-16 text-green text-uppercase ml-1">
                                    ₹{mainPrice <= 499 ? 85 : "FREE"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 p-0">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-inline-block">
                            <p className="m-0 f-rob-med f-16">Amount Payable</p>
                          </div>
                          <div className="d-inline-block">
                            <p className="m-0 f-rob-med f-16">
                              ₹
                              {mainPrice <= 499
                                ? mainPrice + 85
                                : Math.round(mainPrice)}
                            </p>
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
    </>
  );
}

export default CheckOut;
