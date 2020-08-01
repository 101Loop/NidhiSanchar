import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import funding from "../assets/fund_image.jpg";
import schemes from "../assets/schemes.jpg";
import Track from "../assets/track.webp";

const BelowBanner = () => {
  return (
    <React.Fragment>
      <section className="about">
        <Container>
          <Col md={12}>
            <Row className="rows">
              <Col xs={12} md={6} style={{ paddingTop: "1.5rem" }}>
                <img src={schemes} alt="schemes" width="325px" height="210px" />
              </Col>
              <Col xs={12} md={6}>
                <div className="content">
                  <h3>Create or Modify Schemes </h3>
                  <p>
                    Central officials can create or modify schemes with few
                    clicks. Once the scheme is live and finalized leave it to us
                    to make everything
                    <span id="highlight"> transparent and encrypted</span> for
                    secured communication.
                  </p>
                  <a href="/signin">SigIn to kickstart the process ➡️</a>
                </div>
              </Col>
            </Row>
            <Row className="rows">
              <Col xs={12} md={6}>
                <div className="content">
                  <h3>Request Funds from Center</h3>
                  <p>
                    From agriculture to technology department, we have
                    <span id="highlight"> department wise channels</span> to
                    help state government start requesting funds online from
                    central government.
                  </p>
                  <a href="/signin">LogIn to create a request ➡️</a>
                </div>
              </Col>
              <Col
                xs={12}
                md={6}
                style={{ paddingTop: "1rem", paddingLeft: "3.5rem" }}
              >
                <img
                  src={funding}
                  alt="customer"
                  width="325px"
                  height="210px"
                />
              </Col>
            </Row>

            <Row className="rows">
              <Col
                xs={12}
                md={6}
                style={{ paddingTop: "1.5rem", paddingLeft: "3rem" }}
              >
                <img src={Track} alt="funding" width="325px" height="210px" />
              </Col>
              <Col xs={12} md={6}>
                <div className="content">
                  <h3>Check the realtime status </h3>
                  <p>
                    Create a request then forget{" "}
                    <span id="highlight">we will notify</span> you when funds
                    gets dibursed or just track your request department wise
                    with a single click without any hassle.
                  </p>
                  <a href="/signin">Find out the status of your request ➡️</a>
                </div>
              </Col>
            </Row>
          </Col>
        </Container>

        <style>
          {`
              .about{
                padding: 2rem 0;
                text-align: initial;

              }
              .rows{
                padding: 3rem 0;
                text-align: initial;
              }
              #highlight{
                // color: #E76829;
                font-weight: bold;
              }
              .content{
                margin: 2rem 2rem;
              }
              
              p{
                padding-bottom:1rem;
                text-align: initial;
                justify-content:center;
                vertical-align:baseline;
              }
              h3 {
                font-weight: bold;
                padding-bottom: 1rem;
              }
              
            `}
        </style>
      </section>
    </React.Fragment>
  );
};

export default BelowBanner;
