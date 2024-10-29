import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./assets/css/bootstrap.css";
import "./assets/css/font-family.css";
import "./assets/css/media.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/nutrition.css";
import "./assets/css/fg_group.css";
import "./assets/css/media.css";
const App = lazy(() => import("./App"));

window.$ = $;
window.jQuery = $;
window.BASE_URL = process.env.PUBLIC_URL;

const RedirectFromHtml = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanPath = location.pathname.replace(/\.html$/, "");

    if (location.pathname !== cleanPath) {
      navigate(cleanPath);
    }

    if (cleanPath === "/nutrition") {
      window.location.href = "https://www.gomzilifesciences.in/";
    }
  }, [location, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=UA-209915471-2";
      script.async = true; // Ensure async loading
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "UA-209915471-2");
      };
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RedirectFromHtml>
      <Suspense
        fallback={
          <div>
            <div className="main-loading-logo">
              <div className="">
                {/* <div className='m-auto'>
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div> */}
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "../assets/images/logo/nutrition-logo.webp"
                    }
                    className="img-fluid"
                    width={120}
                    height="auto"
                    alt="Fg Group"
                  />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <App />
      </Suspense>
    </RedirectFromHtml>
    <ToastContainer />
  </BrowserRouter>
);
