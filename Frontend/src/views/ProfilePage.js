import React, { Component } from "react";
import Modi from "../assets/pmmodi.jpg";

class ProfilePage extends Component {
  render() {
    return (
      <div className="profile-page">
        <div className="heading">
          <h1>My Profile</h1>
          <p>
            Basic info, like your name and photo, that you use on Google
            services
          </p>
        </div>
        <div className="personal-info">
          <div classname="personal-photo">
            <h3>Profile</h3>
            <div className="photo-description">
              A photo helps Personalize your account
            </div>
            <div className="discussion-image">
              <img src={Modi} alt="" className="icon-img"></img>
            </div>
          </div>
          <div className="personal-name"></div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
