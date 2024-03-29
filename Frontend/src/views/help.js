import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import ChatBot from "./chat";
import { green } from "@material-ui/core/colors";
import SchemeByState from "./scheme_by_state/scheme_by_state";
import { Redirect, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createHelpRequest } from "../core_api_calls/help"
import { css } from "glamor";

toast.configure({
  autoClose: 2000,
  draggable: true,
  hideProgressBar: true,

  position: toast.POSITION.TOP_CENTER,
  toastClassName: css({
    fontSize: "20px !important",

    backgroundColor: "#da1c36 !important",
    padding: "15px !important",
  }),
});
const notify = () => {
  toast("Your message has been sent", {
    position: toast.POSITION.TOP_CENTER,
  });
};
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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
    paddingTop: "1rem",
  },
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

export default function SpecificHelp(props) {
  console.log("props: ", props);
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");
  const [values, setValues] = React.useState({
    email: "",
    subject: "",
    description: ""
  });
  const { email, subject, description } = values
  console.log("daata", props.location.state.customNameData);
  let history = useHistory();
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const onValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const requiredData = {
    email: email,
    subject: subject,
    text: description
  }
  const onSubmitData = () => {
    createHelpRequest(requiredData);
    setValues({
      email: "",
      subject: "",
      description: ""
    })
    toast("Your message has been sent", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  if (props.location.state.customNameData[0] !== "Propose a Scheme") {
    return (
      <React.Fragment>
        <CssBaseline />

        <section
          style={{
            paddingLeft: "10%",
            paddingTop: "3rem",
            paddingBottom: "2rem",
          }}
        >
          {/* Hero unit */}
          <Container>
            <div>
              <Typography
                component="div"
                style={{
                  fontWeight: "600",
                  marginTop: "3rem",
                  width: "90vh",
                  height: "7vh",
                  color: "black",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  marginBottom: "1rem",
                }}
                variant="h4"
                align="left"
                gutterBottom
              >
                Get help with Nidhi Sanchar
              </Typography>

              <form>
                <h6 className={classes.heading}>E-mail</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    placeholder="Subject"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    name="email"
                    value={email}
                    onChange={onValueChange}
                  />
                </div>
                <h6 className={classes.heading}>Subject</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    placeholder="Subject"
                    value={subject}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    name="subject"
                    onChange={onValueChange}
                  />
                </div>

                <h6 className={classes.heading}>How Can we help ?</h6>

                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    style={{
                      width: "70%",
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    placeholder="Please tell us what exactly you want to accomplish"
                    variant="outlined"
                    name="description"
                    value={description}
                    onChange={onValueChange}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "left",
                    paddingTop: "20px",
                  }}
                ></div>
                <div
                  style={{
                    paddingTop: "25px",
                    display: "flex",
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
                    onClick={onSubmitData}
                  >
                    Send Request
                  </Button>
                  <Button
                    style={{
                      color: "#E76829",
                      marginLeft: "5rem",
                    }}
                    variant="outlined"
                    className={classes.button}
                    onClick={() => {
                      history.push({
                        pathname: "/contact",
                      });
                    }}
                  >
                    <b>BACK TO Help Desk</b>
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </section>
        <ChatBot />
      </React.Fragment>
    );
  } else {
    return (
      <div style={{ padding: "5rem" }}>
        <SchemeByState />
      </div>
    );
  }
}
