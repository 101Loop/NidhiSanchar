import "../../App.css";
import React, { Component } from "react";
import RequestList from "./requestsList";
import { getFundRequestsBySchemeId } from "../../core_api_calls/requests";
import { getSchemeBySlug } from "../../core_api_calls/schemes";
import SpecificRequest from "./specific_request";

class SingleSchemeRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundRequests: [],
    };
  }

  componentDidMount() {
    this.preloadGetSchemeBySlug(this.props.match.params.slug);
  }

  async preload(schemeId) {
    const response = await getFundRequestsBySchemeId(schemeId);
    if (response) {
      this.setState({
        fundRequests: response.data,
      });
    }


  };

  async preloadGetSchemeBySlug(slug) {
    const response = await getSchemeBySlug(slug)
    this.setState({
      scheme: response.data
    })
    this.preload(response.data.id);
  };

  render() {
    const { fundRequests } = this.state;
    return (
      <div>
        {fundRequests ? (
          <SpecificRequest fundRequests={fundRequests} />
        ) : (
            <h2>Loading</h2>
          )}
      </div>
    );
  }
}

export default SingleSchemeRequestView;
