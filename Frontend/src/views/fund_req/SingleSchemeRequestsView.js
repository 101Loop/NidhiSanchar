import "../../App.css";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { Component, useEffect, useState } from "react";
import RequestList from "./requestsList";
import { getFundRequests } from "../../core_api_calls/requests";
import SpecificRequest from "./specific_request";

class SingleSchemeRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundRequests: [],
    };
  }

  componentDidMount() {
    this.preload();
  }

  async preload() {
    const response = await getFundRequests();
    this.setState({
      fundRequests: response.data,
    });

    // .then((response) => {
    //   if (response.status > 300) {
    //     throw new Error("An error occured");
    //   } else {
    //     this.setState({
    //       fundRequests: response.data,
    //     });
    //   }
    // })
    // .catch((err) => {
    //   console.log("error: ", err);
    // });
  };

  render() {
    const { fundRequests } = this.state;
    console.log("FUND REQUESTS: ", fundRequests);
    return (
      <div>
        {fundRequests.length !== 0 ? (
          <SpecificRequest fundRequests={fundRequests} />
        ) : (
            <div>Loading</div>
          )}
      </div>
    );
  }
}

export default SingleSchemeRequestView;
