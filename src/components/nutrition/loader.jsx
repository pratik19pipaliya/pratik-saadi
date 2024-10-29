import React from "react";
import "../../assets/css/nutrition.css";

const Loader = () => (
  <div className="main-loader">
    <div className="sub-loader">
      <div className="me-md-0 me-3">
        <div id="loading-bar-spinner" className="spinner">
          <div className="spinner-icon"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
