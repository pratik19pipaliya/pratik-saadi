/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function HomeFooter() {
  return (
    <>
      <footer>
        <div
          className="container-fluid pt-5 pb-3"
          style={{ backgroundColor: "black" }}
        >
          <div className="container ">
            <div className="row ">
              <div className="col-md-3 f1 f2">
                <h4>Fitness With Gomzi</h4>
                <p>
                  From Diet And Exercise Plans To Provide Digital Marketing
                  Knowledge, We Give You The Best Knowledge Overall.
                </p>
              </div>
              <div className="col-md-2 f2">
                <h4>FG Brands</h4>
                <p className="mb-4">
                  <Link to="fitnesswithgomzi/rapid-weight-loss">
                    Fitness With Gomzi
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="fgiit/nutritionist-course">FGIIT</Link>
                </p>
                <p className="mb-4">
                  <Link to="fgdigital/online-digital-marketing-training">
                    FGDIGITAL
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="recipe/free-weight-loss-recipe-videos">
                    FGMEALS
                  </Link>
                </p>
              </div>
              <div className="col-md-2 f2">
                <h4>Links</h4>
                <p className="mb-4">
                  <Link to="/contact">CONTACT US</Link>
                </p>
                <p className="mb-4">
                  <Link to="/blogs/benefits-of-protein">BLOG</Link>
                </p>
                <p className="mb-4">
                  <Link to="/Fitness-Brand-Franchise">FRANCHISE</Link>
                </p>
                <p className="mb-4">
                  <Link to="/career">CAREERS</Link>
                </p>
                <p className="mb-4">
                  <Link to="/best-fitness-podcast">
                    Health & Fitness Podcast
                  </Link>
                </p>
              </div>
              <div className="col-md-2 f2">
                <h4>Information</h4>
                <p className="mb-4">
                  <Link to="/terms-condition">Terms & Conditions</Link>
                </p>
                <p className="mb-4">
                  <Link to="/return-refund">Return & Refund</Link>
                </p>
                <p className="mb-4">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </p>
                <p className="mb-4">
                  <Link to="/cancellation-policy">Cancellation Policy</Link>
                </p>
                <p className="mb-4">
                  <Link to="/">About us</Link>
                </p>
                <p className="mb-4">
                  <Link to="/app-privacy-policy">App Privacy Policy</Link>
                </p>
              </div>
              <div className="col-md-2 f3 pl-2">
                <div>
                  <h4>Follow Us</h4>
                  <Link to="https://www.facebook.com/gajani2/" className="fb">
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                  <Link
                    to="https://www.instagram.com/fitnesswithgomzi/"
                    className="insta"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link
                    to="https://www.youtube.com/channel/UCLyvtq55YZORdV-SN8OQSzQ"
                    className="you"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </Link>
                  <Link
                    to="https://www.linkedin.com/in/dt-gautam-jani-561a50161/"
                    className="in"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </Link>
                </div>
                <div className="mt-4">
                  <h4 className="mb-3">Location</h4>
                  <iframe
                    title="Fg Group"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.3152737271894!2d72.770764!3d21.139848000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0530a562711f1%3A0x3f5ec296b19e2f33!2sFGIIT%20-%20Nutrition%20%26%20Dietitian%20Courses%20In%20Surat%2C%20Personal%20Trainer%20Courses%20In%20Surat%2C%20Diploma%20Courses%20In%20Surat!5e0!3m2!1sen!2sin!4v1711457729537!5m2!1sen!2sin"
                    style={{ border: "0", borderRadius: "10px" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="row ft">
              <div className="col-sm-12 p-0 mb-3">
                <h4>RELATED SEARCHES</h4>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/fitnesswithgomzi/rapid-weight-loss">
                    Best Dietitian In Surat
                  </Link>
                </div>
                <div>
                  <Link to="/fitnesswithgomzi/rapid-weight-loss">
                    Online Dietitian Consultation
                  </Link>
                </div>
                <div>
                  <Link to="/fitnesswithgomzi/online-personal-training">
                    Gyms In Surat
                  </Link>
                </div>
                <div>
                  <Link to="/fitnesswithgomzi/online-personal-training">
                    Personal Training Gyms Near Me
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/fgiit/nutritionist-course">
                    Certified Nutritionist Course
                  </Link>
                </div>
                <div>
                  <Link to="/fgiit/nutritionist-course">
                    Fitness Trainer Course In India
                  </Link>
                </div>
                <div>
                  <Link to="/fgiit/fitness-courses">
                    Online Fitness Courses
                  </Link>
                </div>
                <div>
                  <Link to="/fgiit/fitness-courses">
                    Nutritionist Course Online India
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/fgiit/flexible-fitness-courses">
                    Certification For Fitness Trainer
                  </Link>
                </div>
                <div>
                  <Link to="/fgiit/flexible-fitness-courses">
                    Nutritionist Online Course
                  </Link>
                </div>
                <div>
                  <Link to="/fgdigital/online-digital-marketing-training">
                    Best Digital Marketing Course
                  </Link>
                </div>
                <div>
                  <Link to="/fgdigital/online-digital-marketing-training">
                    Best Digital Marketing Course Online
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeFooter;
