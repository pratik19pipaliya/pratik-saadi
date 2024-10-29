import React from "react";

const ProductDesignByGautam = () => {
  return (
    <section className="profile-tabination pt-3 mt-md-5 bg-secondary">
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12 sidebar-content">
            <div className="row">
              <div className="col-12 tab-content p-3">
                <div className="tab-pane fade show active">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="col text-center">
                      <h2 className="f-rob-bol f-30 text-white text-uppercase">
                        Product Design By
                      </h2>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="col-12 br-15">
                      <div className="row align-items-center justify-content-center p-xl-5">
                        <div className="col-12 col-lg-6">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/gautam-jani.webp"
                            }
                            className="img-fluid"
                            alt="Dr.gautam Jani"
                            style={{ borderRadius: "20px" }}
                          />
                        </div>
                        <div className="col-12 col-lg-6 pl-xl-5 text-center mt-3 mt-lg-0">
                          <h2 className="f-rob-bol f-22 mb-3 text-white">
                            <b>Dr. Gautam Jani</b>
                          </h2>
                          <h2 className="f-rob-bol f-22 text-white">
                            <b>
                              Founder & CEO of FG Group / CEO GCS PVT LTD / Core
                              member of INPTA
                            </b>
                          </h2>
                          <p className="f-pop-reg f-16 my-1 text-white">
                            He finished his Civil Engineer and turned fitness
                            enthusiast in 2014 began his personal training
                            journey in Gujarat, India, in 2016. Certified by
                            ACSM, ISSA, and VLCC. he specializes in Clinical and
                            weight loss nutrition, Strength Training, Exercise
                            Science, and Performance Enhancement Drugs. In 2019
                            finished his MBA for better training and placement
                            services for their student of FGIIT. In 2024, he
                            earned his Ph.D. in Health & Fitness from Thames
                            university. As the Founder of FGIIT, Gautam is
                            dedicated to promoting holistic well-being through
                            personalized training and nutritional guidance.
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
      </div>
    </section>
  );
};

export default ProductDesignByGautam;
