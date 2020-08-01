import React from "react";
import yrs from "../assets/150yrs.png";
import ebsb from "../assets/EBSB.png";
import sj from "../assets/logo_sj.png";
import sbsv from "../assets/images.png";
import uba from "../assets/Unnat-Bharat-Abhiyan.jpeg";
import fit_india from "../assets/fit-india-logo.png";

function alertMsg() {
  alert("This link will take you to an external website");
}

const MajorInitiatives = () => {
  return (
    <>
      <section style={{ margin: "3rem 0" }}>
        <center>
          <span className="text">Major Initiatives</span>
        </center>
        <center>
          <hr />
        </center>

        <ul className="major">
          <li className="majorContent">
            <a
              href=""
              title="150 Years of Celebrating The Mahatma"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img className="MajorImg" alt="150 Yrs" src={yrs} />
              <br />
              150 Years of Celebrating The Mahatma
            </a>
          </li>
          <div className="verticalLine"></div>

          <li className="majorContent">
            <a
              href=""
              title="Ek Bharat Shreshtha Bharat"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img
                class="MajorImg"
                alt="Ek Bharat Shreshtha Bharat Image"
                src={ebsb}
              />
              <br />
              Ek Bharat Shreshtha Bharat
            </a>
          </li>
          <div className="verticalLine"></div>

          <li className="majorContent">
            <a
              href=""
              title="Nagrik Kartavya Paalan Abhiyan"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img
                class="MajorImg"
                alt="Nagrik Kartavya Paalan Abhiyan Image"
                src={sj}
              />
              <br />
              Nagrik Kartavya Paalan Abhiyan
            </a>
          </li>
          <div className="verticalLine"></div>

          <li className="majorContent">
            <a
              href=""
              title="Swachh Bharat Swachh Vidyalaya"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img
                class="MajorImg"
                alt="Swachh Bharat Swachh Vidyalaya Image"
                src={sbsv}
              />
              <br />
              Swachh Bharat Swachh Vidyalaya
            </a>
          </li>
          <div className="verticalLine"></div>

          <li className="majorContent">
            <a
              href=""
              title="FIT India"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img class="MajorImg" alt="FIT India Image" src={fit_india} />
              <br />
              FIT India
            </a>
          </li>
          <div className="verticalLine"></div>

          <li className="majorContent">
            <a
              href=""
              title="Unnat Bharat Abhiyan"
              target="_blank"
              className="link"
              onClick={alertMsg}
            >
              <img
                class="MajorImg"
                alt="Unnat Bharat Abhiyan Image"
                src={uba}
              />
              <br />
              Unnat Bharat Abhiyan
            </a>
          </li>
          <div className="verticalLine"></div>
        </ul>

        <style>
          {`  
            .major{
                display: flex;
                justify-items:center;
                width: 80%;
                justify-content: space-around;
                margin:auto;
                list-style-type: none;
            }
            .MajorImg{
                width: 100px;
                height: 100px;
                justify-content: center;
                
            }
            .majorContent{
                width: 150px;
                height: 150px;
            }

            .link{
                font-size: small;
                color: black;
                font-weight: 500;
            }
            .text{
                margin: 1rem 0;
                font-family: 'Times New Roman', serif;
                font-weight: bolder;
                font-size: large;
                justify: center;
                
            }

            hr{
                width: 75%;
                padding-left: 100px;
                justify-content: center;

            }
            .verticalLine{
                border-left: 1px solid #d6d2d2;

            }


          `}
        </style>
      </section>
    </>
  );
};

export default MajorInitiatives;
