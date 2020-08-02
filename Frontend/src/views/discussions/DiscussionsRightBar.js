import React from "react";
import Modi from "../../assets/pmmodi.jpg";
import { Button } from "react-bootstrap";

export default function RightSideBar() {
  return (
    <div style={{ paddingLeft: "1rem" }}>
      <div className="right-siderbar-main-container">
        <div className="discussion-main-man">
          <div className="discussions-heading-sidebar">Assignees</div>
          <div className="discussion-image">
            <img src={Modi} alt="u" className="main-man-img"></img>
          </div>
          <b>Shree Aniketan Das</b>
        </div>
        <div className="discussions-labels">
          <div className="discussions-heading-sidebar">Labels</div>
          <div className="labels-div">Suggestions</div>
        </div>
        <div className="notifications-subscribe">
          <div className="discussions-heading-sidebar">Notifications</div>
          <Button
            variant="secondary"
            style={{
              border: 0,
              color: "#24292e",
              backgroundColor: "#F6F8FA",
              width: "100%",
            }}
            size="sm"
          >
            Subscribe
          </Button>
        </div>
        <div className="discussions-participants">
          <div className="discussions-heading-sidebar">Participants</div>
          <div className="discussion-image">
            <img src={Modi} alt="" className="main-man-img"></img>
          </div>
          <div className="discussion-image">
            <img src={Modi} alt="" className="main-man-img"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
