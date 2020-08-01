import React, { Fragment } from "react";
import BelowBanner from "../components/BelowBanner.js";
import HomeCarousel from "../components/homecarousel";
import MajorInitiatives from "../components/MajorInitiatives.js";
import Footer from "../components/footer";
import CustomCard from "../components/CustomCard";
import "../App.css";

const LandingPage = () => {
  const CardInfoItems = [
    {
      name: "Total Schemes",
      num: "256",
    },
    {
      name: "Total Requests",
      num: "1020",
    },
    {
      name: "Total discussions",
      num: "1100",
    },
    {
      name: "Requests Pending",
      num: "546",
    },
  ];
  return (
    <Fragment>
      <div>
        <div className="landing-caraousel">
          <HomeCarousel />
        </div>
        <div className="status-card" style={{ margin: "2rem" }}>
          <div className="container ">
            <div className="row ">
              {CardInfoItems.map((item) => (
                <CustomCard name={item.name} num={item.num} />
              ))}
            </div>
          </div>
        </div>
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
