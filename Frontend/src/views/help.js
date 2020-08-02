import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

import { green } from "@material-ui/core/colors";
import SchemeByState from "./scheme_by_state/scheme_by_state";

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

export default function SpecificHelp(props) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");
  const [value, setValue] = React.useState("Controlled");
  console.log("daata", props.location.state.customNameData);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

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
                <h6 className={classes.heading}>From</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    id="outlined-select-currency-native-size-small"
                    select
                    label=""
                    value={currency}
                    onChange={handleChange}
                    size="small"
                    SelectProps={{
                      native: true,
                    }}
                    align="left"
                    variant="outlined"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <h6 className={classes.heading}>Account or Organization</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    id="outlined-select-currency-native-size-small"
                    select
                    label=""
                    size="small"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <h6 className={classes.heading}>Subject</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    placeholder="Subject"
                    value={props.location.customNameData}
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
                        Upload a screenshot or Doc
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
                    paddingTop: "25px",
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
                    Send Request
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </section>
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
