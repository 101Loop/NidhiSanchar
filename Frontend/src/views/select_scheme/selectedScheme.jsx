import React, { useState, useEffect, Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MyEditor from "../add_scheme/editor";
import { green } from "@material-ui/core/colors";
import CalenderDatePicker from "../Schemes/DatePicker";
import moment from "moment";
import { getSchemeBySlug, updateScheme } from "../../core_api_calls/schemes";
import ReactQuill from 'react-quill';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

// const useStyles = makeStyles((theme) => ({
//     "@global": {
//         ul: {
//             margin: 0,
//             padding: 0,
//             listStyle: "none",
//         },
//     },
//     heading: {
//         color: "#E76829",
//         fontWeight: "600",
//         display: "flex",
//         justifyItems: "left",
//         paddingTop: "1rem",
//     },
//     myeditor: {
//         height: "70%",
//         border: "1px solid black",
//         margin: "2px",
//         display: "flex",
//         flexDirection: "column",
//     },
//     input: {
//         display: "none",
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     my_button: {
//         margin: theme.spacing(1, 1.5),
//         float: "right",
//     },
//     my_form: {
//         display: "flex",
//         flexDirection: "row",
//         justifyItems: "left",
//         paddingBottom: "10px",
//     },
// }));

export class SelectScheme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      schemeName: "",
      schemeId: "",
      schemeBudget: "",
      launchDate: moment().format("YYYY-MM-DD"),
      description: "",
      scheme: {}
    }
  }

  componentDidMount() {
    this.preload(this.props.match.params.slug);
  }

  async preload(slug) {
    const response = await getSchemeBySlug(slug);
    const data = response.data;
    console.log("data: ", data);
    this.setState({
      scheme: data,
      open: false,
      error: false,
      schemeName: data.name,
      schemeId: data.id,
      schemeBudget: data.scheme_budget,
      launchDate: data.date_of_launching,
      description: data.description,
    })
    console.log("this.state.scheme: ", this.state.scheme);

  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDescriptionChange = (e) => {
    console.log("e:", e);
    this.setState({
      description: e,
    });
  };

  handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    if (formattedDate < moment().format("YYYY-MM-DD")) {
      this.setState({
        launchDate: moment().format("YYYY-MM-DD"),
      });
    } else {
      this.setState({
        launchDate: formattedDate,
      });
    }
  };




  onSubmitData = () => {
    const { slug } = this.state.scheme;
    const requiredData = {
      name: this.state.schemeName,
      date_of_launching: this.state.launchDate,
      description: this.state.description,
      scheme_budget: this.state.schemeBudget,
    };
    updateScheme(slug, requiredData);
    this.setState({
      open: false,
      error: false,
      schemeName: "",
      schemeId: "",
      schemeBudget: "",
      launchDate: moment().format("YYYY-MM-DD"),
      description: "",
    });
  };

  theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  //const classes = useStyles();


  render() {
    console.log("this.state: ", this.state);
    return (
      <React.Fragment>
        <div style={{ paddingTop: "2rem" }}>
          <CssBaseline />
          <section style={{ paddingLeft: "10%" }}>
            {/* Hero unit */}
            <Container>
              <div>
                <Typography
                  component="div"
                  style={{
                    fontWeight: "600",
                    marginTop: "2rem",
                    width: "90vh",
                    height: "5vh",
                    color: "black",
                    borderBottom: `1px solid ${this.theme.palette.divider}`,
                    marginBottom: "1rem",
                  }}
                  variant="h4"
                  align="left"
                  gutterBottom
                >
                  <h2>Modify scheme</h2>
                </Typography>

                <form>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "left",
                    paddingBottom: "10px",
                  }}></div>
                  <h6 style={{
                    color: "#E76829",
                    fontWeight: "600",
                    display: "flex",
                    justifyItems: "left",
                    paddingTop: "1rem",
                  }}>Scheme Name</h6>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "left",
                    paddingBottom: "10px",
                  }}>
                    <TextField
                      className="form-box"
                      label=""
                      value={this.props.location.customNameData}
                      id="outlined-size-small"
                      placeholder="Enter scheme name"
                      defaultValue=""
                      variant="outlined"
                      size="small"
                      name="schemeName"
                      value={this.state.schemeName}
                      onChange={this.onValueChange}
                    />
                  </div>



                  <h6 style={{
                    color: "#E76829",
                    fontWeight: "600",
                    display: "flex",
                    justifyItems: "left",
                    paddingTop: "1rem",
                  }}>Scheme Budget (Cr)</h6>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "left",
                    paddingBottom: "10px",
                  }}>
                    <TextField
                      className="form-box"
                      label=""
                      placeholder="Enter Budget in crores"
                      id="outlined-size-small"
                      defaultValue=""
                      variant="outlined"
                      size="small"
                      name="schemeBudget"
                      value={this.state.schemeBudget}
                      onChange={this.onValueChange}
                    />
                  </div>

                  <h6 style={{
                    color: "#E76829",
                    fontWeight: "600",
                    display: "flex",
                    justifyItems: "left",
                    paddingTop: "1rem",
                  }}>Launch Date</h6>
                  <div>
                    <CalenderDatePicker
                      handleDateChange={this.handleDateChange}
                      selectedDate={this.state.launchDate}
                    />
                  </div>

                  <h6
                    style={{
                      color: "#E76829",
                      fontWeight: "600",
                      display: "flex",
                      justifyItems: "left",
                      paddingTop: "1rem",
                    }}>Description</h6>

                  <div>

                    <ReactQuill value={this.state.description}
                      onChange={this.onDescriptionChange}
                    />
                  </div>

                  <div
                    style={{
                      padding: "15px 0",
                    }}
                  >
                    <Button
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyItems: "left",
                        backgroundColor: "#E76829",
                        color: "white",
                      }}
                      variant="contained"

                      onClick={this.onSubmitData}
                    >
                      Modify
                      </Button>
                  </div>
                </form>
              </div>
            </Container>
          </section>
        </div>
      </React.Fragment>
    );
  }

}

export default SelectScheme;