import React, { Component } from "react";
import Modi from "../../assets/pmmodi.jpg";
import { getProfileInfo } from "../../core_api_calls/userProfile"
import MyProfile from "./MyProfile";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDetails: {}
    }
  }

  componentDidMount() {
    this.preload();
  }

  async preload() {
    const response = await getProfileInfo();
    console.log("response: ", response);
    if (response) {
      this.setState({
        profileDetails: response.data
      })
    }

  }


  details = [
    {
      name: "Harsh",
      birthday: "13/08/1999",
      gender: "male",
      isStateUser: "True",
      department: "Technology",
      photo: { Modi },
    },
  ];
  render() {
    return (
      <div className="profile">
        <div className="profile-heading">
          <h2>My Profile</h2>
          <p style={{ color: "#5F6368" }}>
            Basic info, like your name and photo, that you use on Nidhi Sanchar
          </p>
        </div>
        <div className="profile-pic">
          <img src={Modi} alt="" className="profile-img"></img>
        </div>
        <div className="personal">
          <MyProfile
            name={"Harsh"}
            birthday={"13/08/1999"}
            gender={"Male"}
            isStateUser={"True"}
            department={"Education"}
            phone={8368991155}
            email={"harsh@gmail.com"}
            username={"harshkc"}
          />
        </div>
      </div>
    );
  }
}

export default ProfileView;
