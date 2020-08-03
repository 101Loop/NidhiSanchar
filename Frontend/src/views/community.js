import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const currencies = [
  {
    value: "USD",
    label: "option 1",
  },
  {
    value: "EUR",
    label: "option 2",
  },
  {
    value: "BTC",
    label: "option 3",
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

export default function Support() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");
  const [value, setValue] = React.useState("Controlled");
  let history = useHistory();

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <section
        style={{
          paddingLeft: "10%",
          paddingTop: "2rem",
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
                />
              </div>
              <h6 className={classes.heading}>Subject</h6>
              <div className={classes.my_form}>
                <TextField
                  className="form-box"
                  label=""
                  placeholder="Subject"
                  id="outlined-size-small"
                  defaultValue=""
                  variant="outlined"
                  size="small"
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
                  onClick={notify}
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
    </React.Fragment>
  );
}
