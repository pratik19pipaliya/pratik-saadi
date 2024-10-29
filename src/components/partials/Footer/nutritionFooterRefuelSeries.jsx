import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import nutritionSendWhatsappMsg from "../../../assets/js/utils/nutritionSendWhatsappMsg";
import { sendNutritionInquiry } from "../../../assets/js/utils/contact-us";
import DownloadPDF from "../../../pages/refuel-series/Refuel 2.0.pdf";

function NutritionFooterRefuelSeries() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleApplyForInquiry = async () => {
    try {
      const data = {
        name,
        email,
        mobile,
        subject: "Gomzi Nutrition Refuel 2.0",
        message: "sadfghjngfrtghg",
      };

      await sendNutritionInquiry(data);

      // Clear form fields
      setName("");
      setEmail("");
      setMobile("");
      setShow(false);

      // URL of the PDF to download
      const pdfUrl = DownloadPDF; // Replace with your PDF URL
      downloadPDF(pdfUrl);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to download the PDF via URL
  const downloadPDF = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in new tab if needed
    link.download = ""; // Use this attribute if you want to suggest a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
                <h4 className="mb-0">Gomzi Lifesciences LLP</h4>
                <p>
                  Transform your physique with Gomzi Nutrition's premium
                  supplements.
                </p>
                <div className="f2">
                  <p className="mb-2 mt-2">
                    <Link to="tel:+916354051487">
                      Gautam Jani - +91 63540 51487
                    </Link>
                  </p>
                  <p className="mb-4">
                    <Link to="mailto:sales@gomzilifesciences.in">
                      sales@gomzilifesciences.in
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-md-2 f2">
                <h4>FG Brands</h4>
                <p className="mb-4">
                  <Link
                    to="https://fggroup.in/fitnesswithgomzi/rapid-weight-loss"
                    target="_blank"
                  >
                    Fitness With Gomzi
                  </Link>
                </p>
                <p className="mb-4">
                  <Link
                    to="https://fggroup.in/fgiit/nutritionist-course"
                    target="_blank"
                  >
                    FGIIT
                  </Link>
                </p>
                <p className="mb-4">
                  <Link
                    to="https://fggroup.in/fgdigital/online-digital-marketing-training"
                    target="_blank"
                  >
                    FGDIGITAL
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="/">Nutrition</Link>
                </p>
              </div>
              <div className="col-md-2 f2">
                <h4>Links</h4>
                <p className="mb-4">
                  <Link
                    to="https://fggroup.in/blogs/benefits-of-protein"
                    target="_blank"
                  >
                    BLOG
                  </Link>
                </p>
                <p className="mb-4">
                  <Link
                    to="https://fggroup.in/Fitness-Brand-Franchise"
                    target="_blank"
                  >
                    FRANCHISE
                  </Link>
                </p>
                {/* <p className="mb-4">
                  <Link to="/career">CAREERS</Link>
                </p> */}
              </div>
              <div className="col-md-2 f2">
                <h4>Information</h4>
                <p className="mb-4">
                  <Link to="/nutrition/terms-condition-customer">
                    Terms & Conditions
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="/nutrition/terms-condition-customer">
                    Return & Refund
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="/nutrition/terms-condition-customer">
                    Privacy Policy
                  </Link>
                </p>
                <p className="mb-4">
                  <Link to="/nutrition/terms-condition-customer">
                    Cancellation Policy
                  </Link>
                </p>
              </div>
              <div className="col-md-3 f2">
                <div className="f3 p-0">
                  <h4>Follow Us</h4>
                  <Link to="https://www.facebook.com/gajani2/" className="fb">
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                  <Link
                    to="https://www.instagram.com/gomzi_nutrition?igsh=NTc4MTIwNjQ2YQ=="
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
                <div className="f2 mt-3">
                  <h4 className="mb-4">Partner With Us</h4>
                  <p className="mb-3">
                    <Link
                      onClick={() =>
                        nutritionSendWhatsappMsg(
                          "Hello, I'm interested in becoming a distributor of Gomzi Nutrition.",
                          { pageRef: true }
                        )
                      }
                    >
                      Become a distributor
                    </Link>
                  </p>
                  <p className="mb-3">
                    <Link
                      onClick={() =>
                        nutritionSendWhatsappMsg(
                          "Hello, I'm interested in becoming an affiliate of Gomzi Nutrition.",
                          { pageRef: true }
                        )
                      }
                    >
                      Become an affiliate
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="row ft">
              <div className="col-sm-12 p-0 mb-3">
                <h4>RELATED SEARCHES</h4>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/">Optimum Nutrition</Link>
                </div>
                <div>
                  <Link to="/">Nutrition</Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                    Pre Gym Supplements
                  </Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                    Supplements Weight Gainer
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/nutrition/gomzi-nutrition-whey-protein-isolate">
                    Weight Gainer For Men
                  </Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-mass-gainer-powder">
                    Protein For Mass Gainer
                  </Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                    Whey Protein Powder
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 c p-0">
                <div>
                  <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                    Fat Burner
                  </Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                    Pre Workout Supplements
                  </Link>
                </div>
                <div>
                  <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                    Best Indian Whey Protein
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid refuel-series-inquiry-button p-0">
          <div className="row">
            <div className="col-sm-12 text-center p-0">
              <button variant="primary" onClick={handleShow} className="py-2">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="text-center">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "../assets/images/logo/nutrition-logo.webp"
                  }
                  width="30%"
                  alt="Fg Group"
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body centered>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Ph Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="common-button d-flex justify-content-center">
            <button
              type="button"
              onClick={handleApplyForInquiry}
              className="bg-yellow f-rob-bol w-auto text-white px-3 py-2"
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      </footer>
    </>
  );
}

export default NutritionFooterRefuelSeries;
