import React, { Fragment } from "react";
import HomeCarousel from "../components/homecarousel";

import "../App.css";

const LandingPage = () => {
  return (
    <Fragment>
      <div className="landing-caraousel">
        <HomeCarousel />
      </div>
    </Fragment>
  );
};

export default LandingPage;
