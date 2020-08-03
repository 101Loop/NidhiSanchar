import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import React, { useState } from "react";
import { css } from "glamor";

import { createScheme } from "../../core_api_calls/schemes";
import MyEditor from "../add_scheme/editor";

import CalenderDatePicker from "./DatePicker";
import { toast } from "react-toastify";

toast.configure({
  autoClose: 2000,
  draggable: true,
  hideProgressBar: true,

  position: toast.POSITION.TOP_CENTER,
  toastClassName: css({
    fontSize: "18px !important",

    backgroundColor: "#da1c36 !important",
    padding: "15px !important",
  }),
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
    borderRadius: "13px",
    background: "#ffffff",
    boxShadow: "inset 5px 5px 10px #e6e6e6, inset - 5px - 5px 10px #ffffff",
  },
}));

const useStylesButton = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStylesforModal = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [values, setValues] = useState({
    open: false,
    error: false,
    schemeName: "",
    schemeId: "",
    schemeBudget: "",
    launchDate: moment().format("YYYY-MM-DD"),
    description: "",
  });

  const onValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onDescriptionChange = (e) => {
    console.log("e: ", e);
    setValues({
      ...values,
      description: e,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log("formattedDate: ", formattedDate);

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
  const buttonStyleClass = useStylesButton();

  const modalClasses = useStylesforModal();
  const handleClickOpen = () => {
    setValues({ ...values, open: true });
  };

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const requiredData = {
    name: schemeName,
    date_of_launching: launchDate,
    description: description,
    scheme_budget: schemeBudget,
  };

  const onSubmitData = () => {
    createScheme(requiredData);
    setValues({
      open: false,
      error: false,
      schemeName: "",
      schemeId: "",
      schemeBudget: "",
      launchDate: moment().format("YYYY-MM-DD"),
      description: "",
    });
    toast("Scheme Added ", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className={buttonStyleClass.margin}
        id="floating-button"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          className={modalClasses.appBar}
          style={{ backgroundColor: "#E76829" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={modalClasses.title}>
              Create Scheme
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <section style={{ paddingLeft: "10%" }}>
            {/* Hero unit */}
            <Container>
              <div>
                <form>
                  <div className={classes.my_form}></div>
                  <h6 className={classes.heading}>Scheme Name</h6>
                  <div className={classes.my_form}>
                    <TextField
                      className="form-box"
                      label=""
                      placeholder="Name"
                      id="outlined-size-small"
                      defaultValue=""
                      variant="outlined"
                      size="small"
                      name="schemeName"
                      value={schemeName}
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

                  <h6 className={classes.heading}>Description :</h6>

                  <div>
                    <MyEditor
                      onDescriptionChange={onDescriptionChange}
                      description={description}
                      values={values}
                    />
                  </div>

                  <div style={{ padding: "15px 0" }}>
                    <Button
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyItems: "left",
                        backgroundColor: "#E76829",
                        color: "white",
                      }}
                      onClick={onSubmitData}
                      variant="contained"
                      className={classes.button}
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </section>
        </div>
      </Dialog>
    </div>
  );
}
