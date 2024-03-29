import "../../App.css";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { Component, useEffect, useState } from "react";
import RequestList from "./requestsList";
import { getSchemes } from "../../core_api_calls/schemes";

class RequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schemes: [],
    };
  }

  componentDidMount() {
    this.preload();
  }

  preload = (pageNo) => {
    getSchemes(pageNo)
      .then((response) => {
        if (response.status > 300) {
          throw new Error("An error occured");
        } else {
          this.setState({
            schemes: response.data,
          });
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    const { schemes } = this.state;
    return (
      <div>{schemes.length !== 0 ? <RequestList schemes={schemes} /> : <div>Loading</div>}</div>
    );
  }
}

export default RequestView;
