import React from "react";
import { Accordion } from "react-bootstrap";

const ProductFAQS = () => {
  return (
    <section className="top-categories-main bg-white py-3 py-md-5">
      <div className="container-fluid w-80">
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex align-items-center justify-content-between">
            <div className="col">
              <h2 className="f-rob-bol f-30 text-black text-uppercase">
                FAQ's
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt-4 pb-5 justify-content-center overflow-hidden">
          <div className="col-md-8">
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="1" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Is protein only used for muscle development?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  A lot of people think that protein is only used for muscle
                  growth and repair, however it can provide a lot of other
                  benefits, such as refueling your stores of nutrients and amino
                  acids which have been lost during exercise.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  What is whey protein?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  Whey is a "complete" protein, meaning it contains all the
                  essential amino acids that the human body requires for proper
                  repair and function. Whey protein is also a rich source of the
                  branched chain amino acids, L-Leucine, L-Isoleucine and
                  L-Valine.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Difference between whey protein isolate and whey protein
                  concentrate?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  According to the Food and Drug Administration, whey protein
                  isolate is a natural dairy protein powder made up of at least
                  90% protein.
                  <br />
                  As a protein source, whey protein isolate contains more
                  protein than whey protein concentrate, which contains about
                  80% protein. In addition, whey protein isolate contains almost
                  no sugar, lactose or fat. Although whey protein isolate packs
                  more protein, whey protein concentrate is the most economical
                  option per gram of protein.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Can those who are lactose intolerant eat whey protein?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  Whey protein isolate is virtually free of lactose, but may
                  contain trace amounts (0.5g per serving). Most people who are
                  lactose intolerant are able to safely consume whey without any
                  negative side effects however a medical practitioner should
                  always be consulted before taking if there are any doubts.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  If whey protein concentrate is 80% protein, what is the other
                  20%?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  Every protein powder, whether it's whey, soy, casein, etc.,
                  has moisture. In fact, 5% of the total formula is water.
                  Another 3-5% is made up of naturally occurring minerals in
                  whey. The remaining 10-12% is a combination of carbs and fat.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Will A Higher Protein Diet Harm My Kidneys?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  According to a study published in the "American Journal of
                  Kidney Disease," anyone who is currently suffering from
                  chronic kidney disease should avoid high-protein diets. For
                  otherwise healthy folk, your high protein intake should not
                  pose a threat to your kidneys; make sure to keep your total
                  daily protein consumption reasonable and consume sufficient
                  water to counteract the water loss. Check with your doctor
                  first if you are concerned about this.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Will More Protein Help Me Build Muscle Faster?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  Yes, but only to some degree. Not all dietary protein you eat
                  goes toward protein synthesis. Once you eat enough protein to
                  drive protein synthesis, your body will oxidize protein for
                  energy. Driving your protein intake far beyond the realm of
                  30-35 percent of your daily calories probably won't provide
                  additional muscle-building benefits, but it will cut into your
                  fat and carbohydrate intake, which may actually hinder your
                  goals. This isn't exact, but eating at least 1 gram of protein
                  per pound per day should cover your bases.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8" className="mt-3 p-4">
                <Accordion.Header className="f-18 lp-2">
                  Is It True The Body Can Only Use 30 Grams Of Protein At Once?
                </Accordion.Header>
                <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                  You're going to digest all the protein you eat, but more isn't
                  always better. Once you turn on protein synthesis and initiate
                  the muscle-building process, you can't turn it on "more" in
                  one meal.
                  <br />
                  Roughly 30 grams of protein per meal across multiple meals
                  will actually help you boost protein synthesis many times over
                  the course of a day. It will probably be easier on your
                  digestive system, too.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFAQS;
