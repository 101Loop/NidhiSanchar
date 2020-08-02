import React, { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MyEditor from "../add_scheme/editor";
import { green } from "@material-ui/core/colors";
import { createFundRequest } from "../../core_api_calls/requests"
import { getSchemeBySlug } from "../../core_api_calls/schemes"

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const currencies = [
  {
    value: "global",
    label: "All",
  },
  {
    value: "Agriculture",
    label: "Agriculture",
  },
  {
    value: "Technology",
    label: "Technology",
  },
];
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heading: {
    color: "#E76829",
    fontWeight: "600",
    display: "flex",
    justifyItems: "left",
    padding: "1rem 0",
  },
  // myeditor: {
  //   height: "70%",
  //   border: "1px solid black",
  //   margin: "2px",
  //   display: "flex",
  //   flexDirection: "column",
  // },
  input: {
    display: "none",
  },
  margin: {
    margin: theme.spacing(1),
  },
  my_button: {
    margin: theme.spacing(1, 1.5),
    float: "right",
  },
  my_form: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "left",
    paddingBottom: "10px",
  },
}));

export default function RaiseRequest(props) {
  console.log("props: ", props);
  const classes = useStyles();
  const [scheme, setScheme] = useState();
  console.log("scheme: ", scheme);
  const preload = (slug) => {
    getSchemeBySlug(slug).then((response) => {
      if (response > 300) {
        throw new Error("An error");
      } else {
        setScheme(response.data);
      }
    });
  };

  useEffect(() => {
    preload(props.match.params.slug);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <section style={{ paddingLeft: "10%", paddingTop: "2rem" }}>
        {/* Hero unit */}
        <Container>
          <div>
            <Typography
              component="div"
              style={{
                fontWeight: "600",
                marginTop: "4rem",
                width: "90vh",
                height: "8vh",
                color: "black",
                borderBottom: `1px solid ${theme.palette.divider}`,
                marginBottom: "1rem",
              }}
              variant="h4"
              align="left"
              gutterBottom
            >
              Raise a fund request
            </Typography>

            <form>


              <h5 className={classes.heading}>Fund Amount(in Cr):</h5>
              <div className={classes.my_form}>
                <TextField
                  className="form-box"
                  label=""
                  value=""
                  placeholder="Amount in Crores"
                  id="outlined-size-small"
                  defaultValue=""
                  variant="outlined"
                  size="small"
                />
              </div>

              <h5 className={classes.heading}>Add Description </h5>

              <div>
                <MyEditor />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "left",
                  paddingTop: "2rem",
                }}
              >
                <div style={{ paddingRight: "20px" }}>
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="default"
                      component="span"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyItems: "left",
                      }}
                    >
                      Upload Report
                    </Button>
                  </label>
                </div>
                <div>
                  <input
                    style={{
                      display: "flex",
                      height: "5vh",
                    }}
                    accept="image/file*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                </div>
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
                  className={classes.button}
                >
                  Request
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
}
