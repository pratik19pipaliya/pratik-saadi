import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/nutrition.css";
import "../assets/css/fg_group.css";
import "../assets/css/media.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NutritionFooter from "../components/partials/Footer/nutritionfooter";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { axiosInstance } from "../assets/js/config/api";
import { Form } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function AddToCart(productData) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDataGet, setProductDataGet] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [serverDataID, setServerDataID] = React.useState("");
  const [totalMRP, setTotalMRP] = React.useState(0);
  const [previousProductData, setPreviousProductData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=FG_MEAL_PRODUCT&is_purchase=true"
      );
      const serverData = response.data.data[0];
      setServerDataID(serverData._id);
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || { products: [] };

      const priceMap = existingData.products.reduce((map, product) => {
        map[product.product_id] = product.mrpPrice;
        return map;
      }, {});

      const itemDataForGetQty = serverData?.items || [];
      const itemDataForGetImgName = serverData?.items_details || [];

      // if (!itemDataForGetQty.length || !itemDataForGetImgName.length) {
      //   console.error("No items or item details found in the response.");
      //   return;
      // }

      const combinedData = itemDataForGetQty.map((item) => {
        const itemDetails = itemDataForGetImgName.find(
          (details) => details._id === item.item_id
        );
        if (!itemDetails) {
          console.warn(`No details found for item with id: ${item.item_id}`);
          return item;
        }

        return {
          ...item,
          ...itemDetails,
          items_id: item._id,
        };
      });

      const updatedServerData = combinedData.map((product) => {
        return {
          ...product,
          mrpPrice: priceMap[product.item_id] || product.mrpPrice,
        };
      });
      setPreviousProductData(updatedServerData);
      totalMRPCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
      totalAmountCalculation(updatedServerData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    setLoading(false);
  };

  const totalMRPCalculation = (data) => {
    const totalMrp = data.map((product) => {
      const mrp = product.mrpPrice * product.quantity;
      return mrp;
    });
    const amount = totalMrp.reduce((sum, product) => sum + product, 0);
    setTotalMRP(amount || 0);
    return amount;
  };

  const totalAmountCalculation = (data) => {
    const amount = data.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalAmount(amount || 0);
  };

  const handleRemoveProduct = async (cart_id, product_id) => {
    try {
      await axiosInstance.delete(
        `/order-cart/remove-item?item_id=${product_id}&cart_id=${serverDataID}`
      );
      setProductDataGet((prevData) =>
        prevData.filter((product) => product._id !== cart_id)
      );
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || { products: [] };
      existingData.products = existingData.products.filter(
        (product) => product.product_id !== product_id
      );
      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      fetchProductData();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    if (productData) {
      fetchProductData();
    }
  }, [productData]);

  const toggleMenu = async (data) => {
    try {
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

      console.log("data :- ", data);

      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: data.id,
        quantity: data?.quantity || 1,
        item_type: "FG_MEAL_PRODUCT",
      });
      if (response.data.response === "OK") {
        fetchProductData();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const minusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      );
      const changedProducts = updatedData.filter((product) => {
        const originalProduct = prevData.find((p) => p._id === product._id);
        return originalProduct && originalProduct.quantity !== product.quantity;
      });
      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);
      setTimeout(async () => {
        handleUpdateCart(changedProducts);
      }, 1000);
      return updatedData;
    });
  };

  const plusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      const changedProducts = updatedData.filter((product) => {
        const originalProduct = prevData.find((p) => p._id === product._id);
        return originalProduct && originalProduct.quantity !== product.quantity;
      });

      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);

      setTimeout(() => {
        handleUpdateCart(changedProducts);
      }, 1000);

      return updatedData;
    });
  };

  const handleUpdateCart = async (updatedData) => {
    try {
      await axiosInstance.post("/order-cart/add-item", updatedData[0]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToCart = async () => {
    try {
      const changedProducts = productDataGet.filter((currentProduct) => {
        const previousProduct = previousProductData.find(
          (p) => p._id === currentProduct._id
        );
        return (
          previousProduct &&
          previousProduct.quantity !== currentProduct.quantity
        );
      });

      if (changedProducts.length > 0) {
        const products = productDataGet.map((product) => ({
          product_id: product._id,
          quantity: product.quantity,
        }));

        const response = await axiosInstance.post(
          "/order-cart/add-item",
          changedProducts[0]
        );

        if (response.data.status === 200) {
          setPreviousProductData(productDataGet);
          localStorage.setItem(
            "productsData",
            JSON.stringify({
              products,
              totalAmount,
              totalMRP,
            })
          );

          window.location.href = `/nutrition/check-out`;
        }
      } else {
        const products = productDataGet.map((product) => ({
          product_id: product._id,
          quantity: product.quantity,
        }));

        localStorage.setItem(
          "productsData",
          JSON.stringify({
            products,
            totalAmount,
            totalMRP,
          })
        );

        window.location.href = `/nutrition/check-out`;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const carouselOptions = {
    loop: true,
    autoplay: false,
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
      500: {
        items: 1,
      },
      1000: {
        items: 5,
      },
    },
  };
  return (
    <>
      <Helmet>
        <title>
          Gomzi Nutrition | Best Whey Protein in India | Premium Supplements
        </title>
        <meta
          name="description"
          content="Discover Gomzi Nutrition, your go-to destination for the best whey protein and premium nutrition supplements in India. Boost your fitness journey with our high-quality products tailored for muscle growth, weight loss, and overall health."
        />
        <meta
          name="keywords"
          content="Gomzi Nutrition, whey protein, best whey protein in India, premium supplements, fitness nutrition, muscle growth, weight loss, health supplements, gomzi lifescience"
        />

        {/* Preconnect to Facebook CDN */}
        <link rel="preconnect" href="https://connect.facebook.net" />

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
        <noscript>
          {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1" />`}
        </noscript>

        <link
          rel="preload"
          href={`${process.env.PUBLIC_URL}/assets/images/nutrition/nutrition-banner-inner-14.webp`}
          as="image"
        />

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
      {/* <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about all Gomzi Nutrition Products. "
        }
        options={{ pageRef: true }}
      /> */}
      <NutritionHeader />
      <div className="my-auto">
        <section
          className="product-tabination bg-secondaryyyy"
          style={{ marginTop: "100px" }}
        >
          <div className="container-fluid w-80">
            <div className="row py-4">
              {loading ? (
                <div className="d-flex col-12 justify-content-center align-items-center mb-4 my-7 loader-h">
                  <div class="loader"></div>
                </div>
              ) : (
                productDataGet.length > 0 && (
                  <>
                    <div className="col-12">
                      <h2 className="f-rob-bol f-30 text-black text-uppercase">
                        Cart Item
                      </h2>
                    </div>
                    <div className="col-md-8  sidebar-content">
                      <div className="pt-4">
                        <section>
                          <div>
                            <div className="row">
                              <div>
                                {productDataGet.map((product) => {
                                  const totalPrice =
                                    product.price * product.quantity;
                                  return (
                                    <>
                                      <div className="col-12 nutri-product mb-3">
                                        <div className="d-flex bg-white br-15 p-2 border">
                                          <div className="col-2 p-0">
                                            <div className="whey-product-img">
                                              <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                                <LazyLoadImage
                                                  src={`https://files.fggroup.in/${product.display_image}`}
                                                  alt="sdfvdvr"
                                                  className="img-fluid mx-auto product-img"
                                                  effect="blur"
                                                  loading="lazy"
                                                  width="100%"
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-8 p-0 ml-3">
                                            <div>
                                              <span className="d-inline-block text-black f-rob-bol f-20">
                                                <b>{product.name}</b>
                                              </span>
                                            </div>
                                            <div className="cart-add align-items-center mt-3">
                                              <div className="d-flex align-items-center mx-2">
                                                <i
                                                  className="fas fa-minus text-dark mr-2"
                                                  onClick={() =>
                                                    minusQuantity(product._id)
                                                  }
                                                ></i>
                                                <Form.Group className="text-center">
                                                  <Form.Control
                                                    type="number"
                                                    id="txt_quantity"
                                                    value={product.quantity}
                                                    min="1"
                                                    className="mb-0"
                                                    readOnly
                                                    style={{
                                                      borderRadius: "5px",
                                                      width: "45px",
                                                      height: "30px",
                                                    }}
                                                  />
                                                </Form.Group>
                                                <i
                                                  className="fas fa-plus text-dark ml-2"
                                                  onClick={() =>
                                                    plusQuantity(product._id)
                                                  }
                                                ></i>
                                              </div>
                                            </div>
                                            <div>
                                              <span className="d-inline-block f-rob-med f-13 mr-2">
                                                Inclusive of all taxes
                                              </span>
                                            </div>
                                            <span className="d-inline-block text-black f-rob-bol f-20">
                                              {totalPrice.toFixed(2)}
                                            </span>
                                          </div>
                                          <div className="col-2">
                                            <div className="right">
                                              <div className="remove text-right">
                                                <button
                                                  type="button"
                                                  className="closess mr-3 closse-mobile p-0"
                                                  style={{
                                                    backgroundColor:
                                                      "transparent",
                                                    border: "none",
                                                  }}
                                                  onClick={() =>
                                                    handleRemoveProduct(
                                                      product._id,
                                                      product.items_id
                                                    )
                                                  }
                                                  aria-label="Remove"
                                                >
                                                  <span
                                                    aria-hidden="true"
                                                    className="p-0"
                                                  >
                                                    <i className="fa-solid fa-trash-can text-black"></i>
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                                <div className="common-button">
                                  <button
                                    onClick={handleAddToCart}
                                    className="bg-yellow d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn"
                                  >
                                    Check OUT
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <div ref={loadMoreRef} style={{ height: "1px" }}></div> */}
                          </div>
                        </section>
                      </div>
                    </div>
                    <div className="col-4 px-0 px-md-3 promo-code-sticky mb-2 mt-4">
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
                                  <li className="d-block mb-3 p-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-inline-block p-0 text-left">
                                        <p className="m-0 f-rob-reg f-16 text-secondary">
                                          Order Total
                                        </p>
                                      </div>
                                      <div className="d-inline-block p-0 text-right">
                                        <p className="m-0 f-rob-med f-16">
                                          ₹{totalAmount.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-block mb-3 p-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-inline-block p-0 text-left">
                                        <p className="m-0 f-rob-reg f-16 text-secondary">
                                          Delivery Charges
                                        </p>
                                      </div>
                                      <div className="d-inline-block p-0 text-right">
                                        <p className="m-0 f-rob-med f-16">
                                          <span className="f-rob-med f-16 text-green text-uppercase ml-1">
                                            ₹{totalAmount <= 499 ? 85 : "FREE"}
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
                            ₹{totalAmount.toFixed(2)}
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
                          <p className="f-pop-sembol f-16 mb-0">
                            Price Details
                          </p>
                        </div>
                        <div className="col-12 p-0 mt-2">
                          <ul className="list-unstyled border-bottom">
                            <li className="d-block mb-3 p-0">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-inline-block p-0 text-left">
                                  <p className="m-0 f-rob-reg f-16 text-secondary">
                                    Order Total
                                  </p>
                                </div>
                                <div className="d-inline-block p-0 text-right">
                                  <p className="m-0 f-rob-med f-16">
                                    ₹{totalAmount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li className="d-block mb-3 p-0">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-inline-block p-0 text-left">
                                  <p className="m-0 f-rob-reg f-16 text-secondary">
                                    Delivery Charges
                                  </p>
                                </div>
                                <div className="d-inline-block p-0 text-right">
                                  <p className="m-0 f-rob-med f-16">
                                    <span className="f-rob-med f-16 text-green text-uppercase ml-1">
                                      ₹{totalAmount <= 499 ? 85 : "FREE"}
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
                              <p className="m-0 f-rob-med f-16">
                                Amount Payable
                              </p>
                            </div>
                            <div className="d-inline-block">
                              <p className="m-0 f-rob-med f-16">
                                ₹{totalAmount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
              {productDataGet.length === 0 && !loading && (
                <div className="d-flex align-items-center">
                  <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                      <img
                        alt="Coming Soon"
                        className="img-fluid"
                        src={`${process.env.PUBLIC_URL} /assets/images/nutrition/empty.webp`}
                        width="100%"
                        height="auto"
                      />
                      <p className="m-0 f-rob-bol f-20 mt-4 text-center">
                        <b>Your Cart Is Empty</b>
                      </p>
                      <div className="common-button mx-2">
                        <Link to="/">
                          <button className="bg-dark-section text-uppercase px-2 mt-3 px-lg-5 py-2 text-white f-16 f-rob-bol">
                            Go Home
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-12">
                <h2 className="f-rob-bol f-30 mb-3 text-black text-uppercase">
                  Recommended for You
                </h2>
                <OwlCarousel
                  id="fwg-owl"
                  className="owl-theme"
                  {...carouselOptions}
                >
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp"
                                    }
                                    alt="Whey Protein"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-whey-protein-chocolate"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Whey Protein 100%</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.8
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹3,000/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹2,550/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4b68d8ff4f8d9f2a51bc" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-whey-protein-concentrate">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp"
                                    }
                                    alt="Whey Protein Concentrate"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-whey-protein-concentrate"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Whey Protein Concentrate</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.4
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹3,500/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹2,970/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4addd8ff4f8d9f2a51b6" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-whey-protein-isolate">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp"
                                    }
                                    alt="Whey Protein Isolate"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-whey-protein-isolate"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Whey Protein Isolate</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.7
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹4,500/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹3,830/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4c37d8ff4f8d9f2a51c5" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-mass-gainer-powder">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp"
                                    }
                                    alt="Whey Protein"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-mass-gainer-powder"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Mass Gainer Powder</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.7
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹1,500/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹1,280/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "6611338447003e22aea89fb5" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/ignite-fat-burner-1.webp"
                                    }
                                    alt="Ignite Fat Burner"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-ignite-fat-burner"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Ignite Fat Burner</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.4
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹2,500/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹2,120/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4e38d8ff4f8d9f2a51d4" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-spark-eaa">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/spark-eaa-1.webp"
                                    }
                                    alt="Spark EAA"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-spark-eaa"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>Spark EAA</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.3
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹2,099/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹1,790/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4e61d8ff4f8d9f2a51d7" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="d-inline-block"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="col-12 nutri-product mb-3">
                        <div className="pb-3 border text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center cart-more-product">
                          <div className="col-12 p-0">
                            <Link to="/nutrition/gomzi-nutrition-atp-creatine">
                              <div className="whey-product-img">
                                <span className="lazy-load-image-background blur lazy-load-image-loaded">
                                  <LazyLoadImage
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/atp-creatine-1.webp"
                                    }
                                    alt="ATP Creatine Monohydrate"
                                    className="img-fluid mx-auto product-img"
                                    effect="blur"
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 p-0">
                            <Link
                              to="/nutrition/gomzi-nutrition-atp-creatine"
                              className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
                            >
                              <b>ATP Creatine Monohydrate</b>
                            </Link>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <span className="d-flex product-rating f-14 text-secondary">
                                <i
                                  className="fas fa-star mr-2"
                                  style={{
                                    color: "#fcae2a",
                                    lineHeight: "1.5",
                                  }}
                                ></i>
                                4.5
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-block align-self-end pb-3">
                            <span className="d-inline-block text-red mr-2 f-rob-bol f-18">
                              <del>₹1,499/-</del>
                            </span>
                            <span className="d-inline-block text-black f-rob-bol f-20">
                              ₹1,270/-
                            </span>
                          </div>
                          <div className="common-button-amazon mt-2">
                            <button
                              className="bg-dark-section text-uppercase px-4 text-white f-16 f-rob-bol"
                              onClick={() =>
                                toggleMenu({ id: "660e4e81d8ff4f8d9f2a51da" })
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default AddToCart;
