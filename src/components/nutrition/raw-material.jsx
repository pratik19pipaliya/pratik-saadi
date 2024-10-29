import React from "react";

const RawMaterial = () => {
  return (
    <>
      <div className="col-12 pt-3 d-none d-md-inline-block">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-inline-block text-right">
            <p className="f-rob-med f-14">
              Raw Material from:
              <span className="ml-1">India, China, Europe, USA</span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 pt-3 d-md-none">
        <div className="row">
          <div className="col-12 mb-0">
            <p className="f-rob-med f-14 mb-1">
              Raw Material from:
              <span className="ml-1">India, China, Europe, USA</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RawMaterial;
