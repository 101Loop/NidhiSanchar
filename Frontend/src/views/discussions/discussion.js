import React from "react";
import Modi from "../../assets/pmmodi.jpg";

export default function Message({ message }) {
  console.log("message: ", message)
  return (
    <div className="discussion-container container ml-0 mr-0  ">
      <div className="row">
        <div className="col-md-1 m-0 p-0">
          <div className="discussion-image">
            <img src={Modi} alt="" className="icon-img"></img>
          </div>
        </div>
        <div className="col-md-11 m-0 p-0">
          <div className="message">
            <div className="header">
              { /*<span className="date">
                <b>KS Ramu</b> commented on {message.date.toLocaleString()}
  </span> */}
            </div>
            <div className="body">
              <div className="heading">
                <h5 style={{ fontWeight: "600", fontSize: "20px" }}>
                  {message.subject}
                </h5>
              </div>
              <div className="body-description" dangerouslySetInnerHTML={{__html: message.message}} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
