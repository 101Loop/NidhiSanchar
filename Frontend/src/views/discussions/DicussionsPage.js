import React from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "react-bootstrap";
import DEditor from "./DiscussionsEditor";
import MessagesBox from "./messagebox";
import Modi from "../../assets/pmmodi.jpg";
import RightSideBar from "./DiscussionsRightBar";
import {
  createSchemeDiscussion,
  getSchemeDiscussion,
  createSchemeDiscussionMessages,
  getSchemeDiscussionMessages,
} from "../../core_api_calls/discussions";
import { getSchemeBySlug } from "../../core_api_calls/schemes";

class Discussions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheme: {},
      messages: []
    };
  }

  componentDidMount() {
    this.preloadScheme(this.props.match.params.slug);
    //this.preloadDiscussion(this.state.scheme.data.id);
    console.log("this.state: ", this.state);
    console.log("this.porps: ", this.props);
  }

  preloadScheme = (slug) => {
    getSchemeBySlug(slug)
      .then((response) => {
        console.log("response in getSchemeBySlug: ", response);
        // if (response.status > 300) {
        //   throw new Error("An error");
        // } else {
        this.setState({
          scheme: response.data
        })
        const discussionData = {
          scheme: response.data.id,
        };

        this.preloadCreateDiscussion(discussionData);
        //   this.setState({ scheme: response.data });
        // }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  preloadCreateDiscussion = (schemeId) => {
    console.log("schemeID: ", schemeId);
    createSchemeDiscussion(schemeId)
      .then((response) => {
        console.log("response in createSchemeDiscussion:", response);
        if (response.status > 300) {
          throw new Error("An error occured");
        } else {
          console.log("response of create scheme discussion ", response);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        this.preloadGetSchemeDiscussion(schemeId);
      });
  };

  preloadGetSchemeDiscussion = (schemeId) => {
    const id = schemeId.scheme;
    getSchemeDiscussion(id).then((response) => {
      console.log("response in getSchemeDiscussion: ", response);
      // if (response.status > 300) {
      //   throw new Error("An error occured");
      // }
      //this.preloadGetDiscussionMessages(discussionId)
    });
  };

  preloadGetDiscussionMessages = (discussionId) => {
    getSchemeDiscussionMessages(discussionId).then((response) => {
      console.log("response in getSchemeDiscussionMessages: ", response);
      if (response.status > 300) {
        throw new Error("An error occured");
      }
    });
  };

  preloadCreateDiscussionMessage = (discussionId) => {
    createSchemeDiscussionMessages(discussionId).then((response) => {
      if (response.status > 300) {
        throw new Error("An error occured");
      } else {
        console.log("response of create scheme message ", response);
      }
    });
  };

  render() {
    var isClosed = false;
    const messageItems = [
      {
        msg: `We can make an extension of this scheme to a different version just for people Below Poverty line to benifit the needy on priority basis `,
        date: "28/6/2020",
        subject: "Extension for people BPL",
        isMainUser: true,
      },
      {
        msg: `A provision of a digital system can be implemented to ensure stability and fast adoptaion of this plan`,
        date: "28/6/2020",
        subject: "Digital Implementation",

        isMainUser: true,
      },
      {
        msg: `In addition to the extension aspect as mentioned above i would like to add that the extension can be made available for differently abled people as well  `,
        date: "28/6/2020",
        subject: "Suggestion for extension",

        isMainUser: false,
      },
      {
        msg: `In addition to the extension aspect as mentioned above i would like to add that the extension can be made available for differently abled people as well  `,
        date: "28/6/2020",
        subject: "Suggestion for extension",

        isMainUser: false,
      },
      {
        msg: `In addition to the extension aspect as mentioned above i would like to add that the extension can be made available for differently abled people as well  `,
        date: "28/6/2020",
        subject: "Suggestion for extension",

        isMainUser: false,
      },
    ];

    return (
      <section className="discussion-div">
        <div
          className="discussion-header"
          style={{
            marginBottom: "1rem",
            borderBottom: `1px solid #E8EBEE`,
            width: "70%",
            marginLeft: "3rem",
          }}
        >
          <Typography
            component="div"
            style={{
              fontWeight: "500",
              margin: "3rem 3rem 0.5rem 0",
              color: "black",
            }}
            variant="h4"
            align="left"
          >
            {this.state.scheme.name}
            <span style={{ color: "grey" }}>#21</span>
          </Typography>
          <div className="container p-0 m-0">
            <div className="row">
              <div className=" col-12 col-md-1 m-0">
                <Button
                  variant="success"
                  style={{
                    backgroundColor: isClosed ? "red" : " ",
                    borderRadius: "20px",
                    marginBottom: "1rem",
                    justifyItems: "left",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  id="btn"
                >
                  {isClosed ? `closed` : `open`}
                </Button>
              </div>
              <div className="col-12 col-md-10 m-0">
                <p
                  style={{
                    paddingTop: "0.6rem",
                    color: "grey",
                    textAlign: "initial",
                  }}
                >
                  <strong>KS Ramajun </strong>{" "}
                  <span>opened this on 6/12/20202</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" discussions-rightbar col-12 col-md-3 pl-0 ">
          <RightSideBar />
        </div>

        <div className="container m-0">
          <div className="col-12 col-md-10 p-0 ">
            <MessagesBox messages={messageItems} />
          </div>
          <div className="discussion-editor-box col-12 col-md-10 pl-0 pr-0 pt-4 ">
            <div className="container">
              <div className="row m-0">
                <div className="col-md-1 m-0 p-0">
                  <div className="discussion-image">
                    <img src={Modi} alt="" className="icon-img"></img>
                  </div>
                </div>
                <div className="col-md-11 m-0 p-0">
                  <div className="comment-box">
                    <DEditor />
                    <Button
                      variant="success"
                      style={{
                        borderRadius: "50px",
                        margin: "1rem 0 1rem auto",
                        display: "flex",
                      }}
                      id="btn"
                    >
                      comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Discussions;
