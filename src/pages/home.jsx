import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/nutrition.css";
import "../assets/css/fg_group.css";
import "../assets/css/media.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NutritionFooter from "../components/partials/Footer/nutritionfooter";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import WhatsappHeaderApp from "../components/NutritionWhatsappHeaderBtn";
import { Suspense } from "react";
import { Oval } from "react-loader-spinner";
import MobileViewMainPhotoSection from "../components/nutrition/products/mobileViewMainPhotoSection";

const ProductBlogs = React.lazy(() => import("../components/nutrition/blogs"));
const ProductFAQS = React.lazy(() => import("../components/nutrition/faqs"));
const MainVideoSection = React.lazy(() =>
  import("../components/nutrition/mainVideoSection")
);
const HomePageMoreProduct = React.lazy(() =>
  import("../components/nutrition/homePageMoreProduct")
);
const ProductCard = React.lazy(() => import("../components/productCard"));
const Testimonials = React.lazy(() =>
  import("../components/nutrition/testimonials")
);
const ProductDesignByGautam = React.lazy(() =>
  import("../components/nutrition/productDesignByGautam")
);
const CertifiedProduct = React.lazy(() =>
  import("../components/nutrition/certified")
);

function Home() {
  const [activeSection, setActiveSection] = useState("#whey");
  const [proteinProducts, setProteinProducts] = useState([]);
  const [powerProducts, setPowerProducts] = useState([]);
  const [shakeProducts, setShakeProducts] = useState([]);
  const [energyProducts, setEnergyProducts] = useState([]);
  const [ayurvedaProducts, setAyurvedaProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);
  const productsPerPage = 8;

  useEffect(() => {
    const loadInitialProducts = () => {
      const proteinProducts = gomzinutrition[0].protein.slice(
        0,
        productsPerPage
      );
      const powerProducts = gomzinutrition[0].power.slice(0, productsPerPage);
      const ayurvedaProducts = gomzinutrition[0].ayurveda.slice(
        0,
        productsPerPage
      );
      const shakeProducts = gomzinutrition[0].shake.slice(0, productsPerPage);
      const energyProducts = gomzinutrition[0].energy.slice(0, productsPerPage);
      setProteinProducts(proteinProducts);
      setPowerProducts(powerProducts);
      setShakeProducts(shakeProducts);
      setEnergyProducts(energyProducts);
      setAyurvedaProducts(ayurvedaProducts);
    };

    loadInitialProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, page]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.6, // Adjust threshold for when to consider section in view
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const loadMoreProducts = () => {
    const start = page * productsPerPage;
    const end = start + productsPerPage;
    const nextProducts = gomzinutrition.slice(start, end);

    setProteinProducts((prevProducts) => [...prevProducts, ...nextProducts]);

    if (end >= gomzinutrition.length) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const hash = window.location.hash || "#whey"; // Default to #whey if no hash
    setActiveSection(hash);

    const handleScrollToSection = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Scroll to the target element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active section
      setActiveSection(targetId);
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScrollToSection);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScrollToSection);
      });
    };
  }, []);

  const gomzinutrition = [
    {
      protein: [
        {
          id: 1,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp",
          productLink: "/nutrition/gomzi-nutrition-whey-protein-concentrate",
          productName: "Whey Protein Concentrate",
          rating: "4.4",
          originalPrice: "₹3,500",
          discountedPrice: "₹2,970 /-",
          type: "protein",
        },
        {
          id: 2,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp",
          productLink: "/nutrition/gomzi-nutrition-whey-protein-isolate",
          productName: "Whey Protein Isolate",
          rating: "4.7",
          originalPrice: "₹4,500",
          discountedPrice: "₹3,830 /-",
          type: "protein",
        },
        {
          id: 3,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp",
          productLink: "/nutrition/gomzi-nutrition-whey-protein-chocolate",
          productName: "Gomzi Whey Protein",
          rating: "4.8",
          originalPrice: "₹3,000",
          discountedPrice: "₹2,550 /-",
          type: "protein",
        },
        {
          id: 4,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp",
          productLink: "/nutrition/gomzi-nutrition-mass-gainer-powder",
          productName: "Mass Gainer Powder",
          rating: "4.7",
          originalPrice: "₹1,500",
          discountedPrice: "₹1,280 /-",
          type: "protein",
        },
        {
          id: 5,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/refuel-concentrate-mawa-kulfi.webp",
          productLink: "/refuel-series",
          productName: "Whey Protein Concentrate 2.0",
          rating: "4.4",
          originalPrice: "",
          discountedPrice: "For Dealers Only",
          type: "protein",
        },
        {
          id: 6,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/refuel-isolate-chocobrownie.webp",
          productLink: "/refuel-series",
          productName: "Whey Protein Isolate 2.0",
          rating: "4.7",
          originalPrice: "",
          discountedPrice: "For Dealers Only",
          type: "protein",
        },
        {
          id: 7,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/refuel-protein-chocolate.webp",
          productLink: "/refuel-series",
          productName: "Whey Protein 100% 2.0",
          rating: "4.3",
          originalPrice: "",
          discountedPrice: "For Dealers Only",
          type: "protein",
        },
        {
          id: 8,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/refuel-muscle-matrix.webp",
          productLink: "/refuel-series",
          productName: "Mass Gainer Powder 2.0",
          rating: "4.6",
          originalPrice: "",
          discountedPrice: "For Dealers Only",
          type: "protein",
        },
      ],
      power: [
        {
          id: 1,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/ignite-fat-burner-1.webp",
          productLink: "/nutrition/gomzi-nutrition-ignite-fat-burner",
          productName: "Ignite Fat Burner Fruit Punch - 250g",
          rating: "4.4",
          originalPrice: "₹2,499",
          discountedPrice: "₹2,120 /-",
          type: "power",
          flavor: "Fruit Punch",
        },
        {
          id: 2,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/spark-eaa-1.webp",
          productLink: "/nutrition/gomzi-nutrition-spark-eaa",
          productName: "Spark EAA Watermelon - 250g",
          rating: "4.3",
          originalPrice: "₹2,099",
          discountedPrice: "₹1,790 /-",
          type: "power",
          flavor: "Watermelon",
        },
        {
          id: 3,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/atp-creatine-1.webp",
          productLink: "/nutrition/gomzi-nutrition-atp-creatine",
          productName: "ATP Creatine Lemon - 250g",
          rating: "4.5",
          originalPrice: "₹1,499",
          discountedPrice: "₹1,270 /-",
          type: "power",
          flavor: "Lemon",
        },
        {
          id: 4,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/ignite-fat-burner-green-apple-1.webp",
          productLink: "/nutrition/gomzi-nutrition-ignite-fat-burner",
          productName: "Ignite Fat Burner Green Apple - 250g",
          rating: "4.4",
          originalPrice: "₹2,499",
          discountedPrice: "₹2,120 /-",
          type: "power",
          flavor: "Green Apple",
        },
        {
          id: 5,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/spark-eaa-orange-1.webp",
          productLink: "/nutrition/gomzi-nutrition-spark-eaa",
          productName: "Spark EAA Orange - 250g",
          rating: "4.3",
          originalPrice: "₹2,099",
          discountedPrice: "₹1,790 /-",
          type: "power",
          flavor: "Orange",
        },
        {
          id: 6,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/atp-creatine-cola-1.webp",
          productLink: "/nutrition/gomzi-nutrition-atp-creatine",
          productName: "ATP Creatine Cola - 250g",
          rating: "4.5",
          originalPrice: "₹1,499",
          discountedPrice: "₹1,270 /-",
          type: "power",
          flavor: "Cola",
        },
      ],
      shake: [
        {
          id: 1,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/protein-smoothie-1.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Mango protein smoothie",
          rating: "4.6",
          originalPrice: "₹269",
          discountedPrice: "₹99 /-",
          type: "smoothie",
        },
        {
          id: 2,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/protein-smoothie-2.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Mava kulfi protein smoothie",
          rating: "4.9",
          originalPrice: "₹269",
          discountedPrice: "₹99 /-",
          type: "smoothie",
        },
        {
          id: 3,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/protein-smoothie-3.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Mocha coffee protein smoothie",
          rating: "4.5",
          originalPrice: "₹269",
          discountedPrice: "₹99 /-",
          type: "smoothie",
        },
        {
          id: 4,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/protein-smoothie-4.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Chocolate protein smoothie",
          rating: "4.7",
          originalPrice: "₹269",
          discountedPrice: "₹99 /-",
          type: "smoothie",
        },
      ],
      energy: [
        {
          id: 1,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-1.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Pre workout with Fruit punch flavour",
          rating: "4.9",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
        {
          id: 2,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-2.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "EAA with Guava flavour",
          rating: "4.4",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
        {
          id: 3,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-3.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Pre workout with Green apple flavour",
          rating: "4.5",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
        {
          id: 4,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-4.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "EAA with Watermelon flavour",
          rating: "4.7",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
        {
          id: 5,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-5.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Creatine with Lemon flavour",
          rating: "4.2",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
        {
          id: 6,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/gomzi-nutrition-energy-drink-6.webp",
          productLink: "https://www.swiggy.com/menu/970248?source=sharing",
          productName: "Creatine with Cola flavour",
          rating: "4.3",
          originalPrice: "₹269",
          discountedPrice: "₹99/-",
          type: "energy",
        },
      ],
      ayurveda: [
        // {
        //   id: 12,
        //   imageSrc:
        //     process.env.PUBLIC_URL +
        //     "/assets/images/nutrition/gomzi-nutrition-shaker.webp",
        //   productLink: "/nutrition/gomzi-nutrition-shaker-bottle",
        //   productName: "Gomzi Nutrition Shaker",
        //   rating: "4.8",
        //   originalPrice: "₹299",
        //   discountedPrice: "₹199",
        //   type: "shaker",
        // },
        {
          id: 1,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/bowlease-constipation-relief-powder-1.webp",
          productLink:
            "/nutrition/gomzi-nutrition-bowlease-constipation-relief-powder",
          productName: "Bowlease Powder",
          rating: "4.1",
          originalPrice: "₹1,049",
          discountedPrice: "₹649 /-",
          type: "ayurvedic",
        },
        {
          id: 2,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/sugarguard-diabetes-care-powder-1.webp",
          productLink:
            "/nutrition/gomzi-nutrition-sugarguard-diabetes-care-powder",
          productName: "Sugarguard Powder",
          rating: "4.7",
          originalPrice: "₹899",
          discountedPrice: "₹599 /-",
          type: "ayurvedic",
        },
        {
          id: 3,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/ayurease-gastric-relief-powder-1.webp",
          productLink:
            "/nutrition/gomzi-nutrition-ayurease-gastric-relief-powder",
          productName: "Ayurease Gastric Powder",
          rating: "4.0",
          originalPrice: "₹1,099",
          discountedPrice: "₹689 /-",
          type: "ayurvedic",
        },
        {
          id: 4,
          imageSrc:
            process.env.PUBLIC_URL + "/assets/images/nutrition/b12-veda-1.webp",
          productLink: "/nutrition/gomzi-nutrition-b12-veda",
          productName: "Vitamin B12 Powder",
          rating: "4.6",
          originalPrice: "₹1,649",
          discountedPrice: "₹999 /-",
          type: "ayurvedic",
        },
        {
          id: 5,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/slimayur-fat-loss-powder-1.webp",
          productLink: "/nutrition/gomzi-nutrition-slimayur-fat-loss-powder",
          productName: "SlimAyur Fat Loss Powder",
          rating: "4.4",
          originalPrice: "₹1,349",
          discountedPrice: "₹899 /-",
          type: "ayurvedic",
        },
        {
          id: 6,
          imageSrc:
            process.env.PUBLIC_URL +
            "/assets/images/nutrition/ayurstrength-powder-1.webp",
          productLink: "/nutrition/gomzi-nutrition-ayurstrength-powder",
          productName: "Ayurstrength Powder",
          rating: "4.6",
          originalPrice: "₹1,499",
          discountedPrice: "₹949 /-",
          type: "ayurvedic",
        },
      ],
    },
  ];

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
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about all Gomzi Nutrition Products. "
        }
        options={{ pageRef: true }}
      />
      <NutritionHeader />
      <div className="my-auto">
        <section className="banner-main bg-white margintop-nutrition">
          <div className="container-fluid w-80">
            <div className="row py-2">
              <div className="col-12 text-center">
                <p className="m-0 f-rob-med f-14 d-inline-block">
                  For Third Party Manufacturing
                </p>
                <Link
                  to="/nutrition/white-labelling"
                  className="btn black-btn mx-3 my-2 my-md-0"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="product-tabination  bg-secondaryyy pb-5">
          <div className="container-fluid w-80">
            <div className="row overflow-hidden pt-2">
              <div className="col-12">
                <div className="item">
                  <img
                    className="border-radius-20 d-none d-md-block"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/nutrition/nutrition-banner-inner-14.webp"
                    }
                    alt="Gomzi Nutrition Banner"
                    width="100%"
                    height="auto"
                    loading="eager"
                  />
                  <img
                    className="border-radius-20 d-block d-md-none"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/nutrition/nutrition-banner-mobile-inner-14.webp"
                    }
                    alt="Gomzi Nutrition Banner"
                    width="100%"
                    height="auto"
                    loading="eager"
                  />
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
          <MobileViewMainPhotoSection />
        </Suspense>
        <section className="product-tabination d-md-block d-none bg-secondaryyyy">
          <div className="container-fluid w-80">
            <div className="row">
              <div className="col-3 px-0 product-tab-sidebar">
                <ul className="scrollspy">
                  <li
                    data-id="whey"
                    className={activeSection === "#whey" ? "isCurrent" : ""}
                  >
                    <a href="#whey">
                      <div className="media">
                        <img
                          className="img-fluid mr-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/sort-1.webp"
                          }
                          alt="whey protein"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="m-0 text-black f-rob-bol f-16 text-uppercase">
                            whey protein
                          </h5>
                          <p className="m-0 text-dark-gray f-rob-med f-14">
                            8 Products
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    data-id="power"
                    className={activeSection === "#power" ? "isCurrent" : ""}
                  >
                    <a href="#power">
                      <div className="media">
                        <img
                          className="img-fluid mr-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/sort-2.webp"
                          }
                          alt="Power Drinks"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="m-0 text-black f-rob-bol f-16 text-uppercase">
                            Performance drinks
                          </h5>
                          <p className="m-0 text-dark-gray f-rob-med f-14">
                            6 Products
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    data-id="shake"
                    className={activeSection === "#shake" ? "isCurrent" : ""}
                  >
                    <a href="#shake">
                      <div className="media">
                        <img
                          className="img-fluid mr-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/sort-3.webp"
                          }
                          alt="protein Shake"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="m-0 text-black f-rob-bol f-16 text-uppercase">
                            protein Shake
                          </h5>
                          <p className="m-0 text-dark-gray f-rob-med f-14">
                            4 Products
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    data-id="energy"
                    className={activeSection === "#energy" ? "isCurrent" : ""}
                  >
                    <a href="#energy">
                      <div className="media">
                        <img
                          className="img-fluid mr-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/sort-5.webp"
                          }
                          alt="energy drink"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="m-0 text-black f-rob-bol f-16 text-uppercase">
                            energy drink
                          </h5>
                          <p className="m-0 text-dark-gray f-rob-med f-14">
                            6 Products
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    data-id="ayurveda"
                    className={activeSection === "#ayurveda" ? "isCurrent" : ""}
                  >
                    <a href="#ayurveda">
                      <div className="media">
                        <img
                          className="img-fluid mr-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutrition/sort-4.webp"
                          }
                          alt="Ayurveda"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="m-0 text-black f-rob-bol f-16 text-uppercase">
                            Ayurveda product
                          </h5>
                          <p className="m-0 text-dark-gray f-rob-med f-14">
                            6 Products
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-9 sidebar-content">
                <div className="pt-4">
                  <section id="whey">
                    <div>
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="col-12">
                          <h2 className="f-rob-bol f-30 text-black text-uppercase">
                            whey protein
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
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
                          {proteinProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              imageSrc={product.imageSrc}
                              productLink={product.productLink}
                              productName={product.productName}
                              rating={product.rating}
                              originalPrice={product.originalPrice}
                              discountedPrice={product.discountedPrice}
                            />
                          ))}
                        </Suspense>
                      </div>
                      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                    </div>
                  </section>
                  <section className="mt-5" id="power">
                    <div>
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="col-12">
                          <h2 className="f-rob-bol f-30 text-black text-uppercase">
                            Performance Drinks
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
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
                          {powerProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              imageSrc={product.imageSrc}
                              productLink={product.productLink}
                              productName={product.productName}
                              rating={product.rating}
                              originalPrice={product.originalPrice}
                              discountedPrice={product.discountedPrice}
                              productLinkWithName={`${product.productLink}?flavor=${product.flavor}`}
                            />
                          ))}
                        </Suspense>
                      </div>
                      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                    </div>
                  </section>
                  <section className="mt-5" id="shake">
                    <div>
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="col-12">
                          <h2 className="f-rob-bol f-30 text-black text-uppercase">
                            protein Shake
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
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
                          {shakeProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              imageSrc={product.imageSrc}
                              productLink={product.productLink}
                              productName={product.productName}
                              rating={product.rating}
                              originalPrice={product.originalPrice}
                              discountedPrice={product.discountedPrice}
                            />
                          ))}
                        </Suspense>
                      </div>
                      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                    </div>
                  </section>
                  <section className="mt-5" id="energy">
                    <div>
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="col-12">
                          <h2 className="f-rob-bol f-30 text-black text-uppercase">
                            Energy Drink
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
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
                          {energyProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              imageSrc={product.imageSrc}
                              productLink={product.productLink}
                              productName={product.productName}
                              rating={product.rating}
                              originalPrice={product.originalPrice}
                              discountedPrice={product.discountedPrice}
                            />
                          ))}
                        </Suspense>
                      </div>
                      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                    </div>
                  </section>
                  <section className="mt-5" id="ayurveda">
                    <div>
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="col-12">
                          <h2 className="f-rob-bol f-30 text-black text-uppercase">
                            Ayurveda
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
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
                          {ayurvedaProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              imageSrc={product.imageSrc}
                              productLink={product.productLink}
                              productName={product.productName}
                              rating={product.rating}
                              originalPrice={product.originalPrice}
                              discountedPrice={product.discountedPrice}
                            />
                          ))}
                        </Suspense>
                      </div>
                      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                    </div>
                  </section>
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
          <HomePageMoreProduct />
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
          <ProductBlogs />
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
          <ProductFAQS />
        </Suspense>
      </div>
      <NutritionFooter />
    </>
  );
}

export default Home;
