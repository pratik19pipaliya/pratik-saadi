import React from "react";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";

const HowToUse = ({ src1, src2, src3, src4, step1, step2 }) => {
  return (
    <section className="profile-tabination pt-3 bg-dark-section">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 sidebar-content">
              <div className="tab-pane fade show active">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="col text-center">
                    <h2 className="f-rob-bol f-30 text-white text-uppercase">
                      How To Use
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <div className="d-block">
                      <ReactPlayer
                        url={
                          process.env.PUBLIC_URL +
                          `/assets/images/nutrition/${src1}`
                        }
                        width="100%"
                        height="auto"
                        className="how-to-make-stap-video"
                        playing
                        loop
                        muted
                        playsinline
                      />
                      <Button className="mt-2" variant="dark">
                        Step 1
                      </Button>
                      <p className="f-pop-reg f-16 my-1 text-white">{step1}</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="d-block">
                      <ReactPlayer
                        url={
                          process.env.PUBLIC_URL +
                          `/assets/images/nutrition/${src2}`
                        }
                        width="100%"
                        height="auto"
                        className="how-to-make-stap-video"
                        playing
                        loop
                        muted
                        playsinline
                      />
                      <Button className="mt-2" variant="dark">
                        Step 2
                      </Button>
                      <p className="f-pop-reg f-16 my-1 text-white">{step2}</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="d-block">
                      <ReactPlayer
                        url={
                          process.env.PUBLIC_URL +
                          `/assets/images/nutrition/${src3}`
                        }
                        width="100%"
                        height="auto"
                        className="how-to-make-stap-video"
                        playing
                        loop
                        muted
                        playsinline
                      />
                      <Button className="mt-2" variant="dark">
                        Step 3
                      </Button>
                      <p className="f-pop-reg f-16 my-1 text-white">
                        Shake Well
                      </p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="d-block">
                      <ReactPlayer
                        url={
                          process.env.PUBLIC_URL +
                          `/assets/images/nutrition/${src4}`
                        }
                        width="100%"
                        height="auto"
                        className="how-to-make-stap-video"
                        playing
                        loop
                        muted
                        playsinline
                      />
                      <Button className="mt-2" variant="dark">
                        Step 4
                      </Button>
                      <p className="f-pop-reg f-16 my-1 text-white">
                        Enjoy the unique taste
                      </p>
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

export default HowToUse;
