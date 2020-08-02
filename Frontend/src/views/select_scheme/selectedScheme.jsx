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
import CalenderDatePicker from "../Schemes/DatePicker";
import moment from "moment";
import { getSchemeBySlug, updateScheme } from "../../core_api_calls/schemes";

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
  myeditor: {
    height: "70%",
    border: "1px solid black",
    margin: "2px",
    display: "flex",
    flexDirection: "column",
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

export default function SelectScheme(props) {
  const [scheme, setScheme] = useState();
  const [values, setValues] = useState({
    open: false,
    error: false,
    schemeName: "",
    schemeId: "",
    schemeBudget: "",
    launchDate: moment().format("YYYY-MM-DD"),
    description: "",
  });

  async function preload(slug) {
    const response = await getSchemeBySlug(slug);
    const data = await response.data;
    await setScheme(data);
    let scheme_check = data;
    if (scheme) {
      setValues({
        open: false,
        error: false,
        schemeName: scheme.name,
        schemeId: scheme.scheme_code,
        schemeBudget: scheme.scheme_budget,
        launchDate: scheme.date_of_launching,
        description: scheme.description,
      });
    }
  }

  useEffect(() => {
    preload(props.match.params.slug);
  }, []);

  const onValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onDescriptionChange = (e) => {
    setValues({
      ...values,
      description: e,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    if (formattedDate < moment().format("YYYY-MM-DD")) {
      setValues({
        ...values,
        launchDate: moment().format("YYYY-MM-DD"),
      });
    } else {
      setValues({
        ...values,
        launchDate: formattedDate,
      });
    }
  };

  const {
    open,
    schemeBudget,
    schemeId,
    schemeName,
    launchDate,
    description,
    selectedDate,
  } = values;

  const requiredData = {
    name: schemeName,
    scheme_code: schemeId,
    date_of_launching: launchDate,
    description: description,
    scheme_budget: schemeBudget,
  };

  const onSubmitData = () => {
    const { slug } = scheme;
    updateScheme(slug, requiredData);
    setValues({
      open: false,
      error: false,
      schemeName: "",
      schemeId: "",
      schemeBudget: "",
      launchDate: moment().format("YYYY-MM-DD"),
      description: "",
    });
  };

  const classes = useStyles();

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
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  marginBottom: "1rem",
                }}
                variant="h4"
                align="left"
                gutterBottom
              >
                <h2>Modify scheme</h2>
              </Typography>

              <form>
                <div className={classes.my_form}></div>
                <h6 className={classes.heading}>Scheme Name</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    value={props.location.customNameData}
                    id="outlined-size-small"
                    placeholder="Enter scheme name"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    name="schemeName"
                    value={schemeName}
                    onChange={onValueChange}
                  />
                </div>

                <h6 className={classes.heading}>Scheme ID</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    id="outlined-size-small"
                    placeholder="Enter Unique Id"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    name="schemeId"
                    value={schemeId}
                    onChange={onValueChange}
                  />
                </div>

                <h6 className={classes.heading}>Scheme Budget</h6>
                <div className={classes.my_form}>
                  <TextField
                    className="form-box"
                    label=""
                    placeholder="Enter Budget in crores"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    name="schemeBudget"
                    value={schemeBudget}
                    onChange={onValueChange}
                  />
                </div>

                <h6 className={classes.heading}>Launch Date</h6>
                <div>
                  <CalenderDatePicker
                    handleDateChange={handleDateChange}
                    selectedDate={launchDate}
                  />
                </div>

                <h6 className={classes.heading}>Description</h6>

                <div>
                  <MyEditor
                    onDescriptionChange={onDescriptionChange}
                    description={description}
                    values={values}
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
                    className={classes.button}
                    onClick={onSubmitData}
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
