import React, { Suspense, useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import ProductCard from "../../productCard";

const MobileViewMainPhotoSection = () => {
  const [proteinProducts, setProteinProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("protein");
  const [isVisible, setIsVisible] = useState(true);
  const loadMoreRef = useRef(null);
  const productsPerPage = 8;

  useEffect(() => {
    loadInitialProducts();
  }, [activeTab]);

  const loadInitialProducts = () => {
    setIsVisible(false); // Start zoom-out and fade-out transition

    setTimeout(() => {
      const initialProducts = gomzinutrition[0][activeTab].slice(
        0,
        productsPerPage
      );
      setProteinProducts(initialProducts);
      setHasMore(true);
      setPage(1);
      setIsVisible(true); // Start zoom-in and fade-in transition
    }, 300); // Match this timeout with CSS transition duration
  };

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

  const loadMoreProducts = () => {
    const start = page * productsPerPage;
    const end = start + productsPerPage;
    const nextProducts = gomzinutrition[0][activeTab].slice(start, end);

    setProteinProducts((prevProducts) => [...prevProducts, ...nextProducts]);

    if (end >= gomzinutrition[0][activeTab].length) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

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
      <section className="product-tabination-mobile d-block d-md-none bg-secondaryyyy">
        <div className="container-fluid w-80">
          <div className="row">
            <div className="product-tab-sidebar-mobile col-12">
              <ul className="nav nav-tabs mt-2">
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("protein")}
                    className={`cp tab-btn ${
                      activeTab === "protein" ? "active" : ""
                    }`}
                  >
                    Whey Protein
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("power")}
                    className={`cp tab-btn ${
                      activeTab === "power" ? "active" : ""
                    }`}
                  >
                    Power Drink
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("shake")}
                    className={`cp tab-btn ${
                      activeTab === "shake" ? "active" : ""
                    }`}
                  >
                    Protein Shake
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("energy")}
                    className={`cp tab-btn ${
                      activeTab === "energy" ? "active" : ""
                    }`}
                  >
                    Energy Drink
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("ayurveda")}
                    className={`cp tab-btn ${
                      activeTab === "ayurveda" ? "active" : ""
                    }`}
                  >
                    Ayurveda
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-12 sidebar-content">
              <div className="pt-4">
                <section>
                  <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div className="col-12">
                        <h2 className="f-rob-bol f-30 text-black text-uppercase">
                          Gomzi Nutrition
                        </h2>
                      </div>
                    </div>
                    <div
                      className={`row mt-3 product-container ${
                        isVisible ? "visible" : "hidden"
                      }`}
                    >
                      <Suspense
                        fallback={
                          <div className="main-loading-logo">
                            <Oval
                              visible={true}
                              height="60"
                              width="60"
                              color="#4fa94d"
                              ariaLabel="oval-loading"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileViewMainPhotoSection;
