import React from "react";
import SimpleHeader from "../../components/partials/Header/nutritionsheader";
import FgiitFooter from "../../components/partials/Footer/nutritionfooter";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import { Link } from "react-router-dom";
import PageMeta from "../../components/PageMeta";

function ThankYouProductPage() {
  const canonicalUrl = window.location.href;
  return (
    <>
      <PageMeta
        title="Thank You for Your Order - Gomzi Nutrition Supplements"
        description="Thank you for ordering from Gomzi Nutrition! We appreciate your trust in our products. Your order is being processed and will be delivered soon."
        keywords="thank you, order confirmation, Gomzi Nutrition, supplement order, buy supplements, order processed"
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
        message={"Hello, I wanted to know more about Nutrition Products. "}
        options={{ pageRef: true }}
      />
      <SimpleHeader />
      <section className="marginbottom-nutrition py-5 my-5">
        <div className="container-fluid pt-md-5">
          <div className="container">
            <div className="row">
              <div className="wrapper-1">
                <div className="wrapper-2">
                  <div className="success-checkmark">
                    <div className="check-icon">
                      <span className="icon-line line-tip"></span>
                      <span className="icon-line line-long"></span>
                      <div className="icon-circle"></div>
                      <div className="icon-fix"></div>
                    </div>
                  </div>
                  <h1>Thank you for order!</h1>
                  <p className="mb-4">Please check your Email for Invoice.</p>
                  <Link className="go-home" to="/user/order">
                    Track Your Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FgiitFooter />
    </>
  );
}

export default ThankYouProductPage;
