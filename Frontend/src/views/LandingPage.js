import React, { Fragment, useState, useEffect } from "react";
import BelowBanner from "../components/BelowBanner.js";
import HomeCarousel from "../components/homecarousel";
import MajorInitiatives from "../components/MajorInitiatives.js";
import Footer from "../components/footer";
import CustomCard from "../components/CustomCard";
import { getLandingPageBoxInfo } from "../core_api_calls/landingPageBoxesInfo"
import "../App.css";

const LandingPage = () => {
  const [boxDetails, setboxDetails] = useState({})

  const preload = async () => {
    const response = await getLandingPageBoxInfo()
    setboxDetails(response.data)
    console.log("response: ", response);
  }

  useEffect(() => {
    preload();
  }, [])

  const CardInfoItems = [
    {
      name: "Total Schemes",
      num: boxDetails.total_schemes,
    },
    {
      name: "Total Requests",
      num: boxDetails.total_requests,
    },
    {
      name: "Total discussions",
      num: boxDetails.total_discussions,
    },
    {
      name: "Requests Pending",
      num: boxDetails.pending_requests,
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
