import React, { Fragment } from "react";
import HomeCarousel from "../components/homecarousel";
import BelowBanner from "../components/BelowBanner.js";

import MajorInitiatives from "../components/MajorInitiatives.js";
import Footer from "../components/footer";

import "../App.css";

const LandingPage = () => {
  return (
    <Fragment>
      <div className="landing-caraousel">
        <HomeCarousel />
        <div className="below-banner-land">
          <BelowBanner />
        </div>
        <div className="major-initiatives-land m-2">
          <MajorInitiatives />
        </div>
        <div className="footer-land"></div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default LandingPage;
