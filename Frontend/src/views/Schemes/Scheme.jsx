import React, { useEffect, useState, Fragment } from "react";

import EditIcon from "@material-ui/icons/Edit";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";
import { getSchemeBySlug } from "../../core_api_calls/schemes";
import moment from "moment";
import { Typography, Button, Paper, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myroot: {
    margin: 0,
    backgroundColor: "#ecedf1",
    borderRadius: "11px",
    background: " inear-gradient(145deg, #d4d5d9, #fdfeff)",
    padding: "1rem",
    boxShadow: "5px 5px 10px #dbdce0, -5px -5px 10px #fdfeff",
  },
  heading: {},
}));
const SchemeCentral = (props) => {
  const [scheme, setScheme] = useState();
  const preload = (slug) => {
    getSchemeBySlug(slug).then((response) => {
      if (response > 300) {
        throw new Error("An error");
      } else {
        setScheme(response.data);
      }
    });
  };

  const handleRoute = (slug) => {
    history.push({
      pathname: `edit-scheme/${slug}`,
    });
  };

  const classes = useStyles();
  let history = useHistory();

  const data = props;

  useEffect(() => {
    preload(props.match.params.slug);
  }, []);

  const generateSchemeJSX = () => {
    return (
      <div style={{ padding: "5rem" }}>
        <div style={{ padding: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={null} sm={2}></Grid>

            <Grid className={classes.heading} item xs={12} sm={8}>
              <Typography variant="h3" align="center">
                <Paper classes={{ root: classes.myroot }} elevation={10}>
                  <h2>{scheme.name} </h2>
                </Paper>
              </Typography>
            </Grid>

            <Grid item xs={null} sm={2}></Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <div style={{ paddingLeft: "8.6%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h5" align="left">
                  Date of launch : <b>{scheme.date_of_launching}</b>
                </Typography>
                <Typography variant="h5" align="left">
                  Last modified on :{" "}
                  <b>{moment(scheme.date_updated).format("YYYY-MM-DD")}</b>
                </Typography>
              </Grid>
              <Grid item xs={null} sm={4}></Grid>

              <Grid item xs={null} sm={4}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h5" align="left">
                  Description
                </Typography>
              </Grid>
              <Grid item xs={null} sm={4}></Grid>
              <Grid item xs={null} sm={4}></Grid>
            </Grid>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={null} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <Paper classes={{ root: classes.myroot }} elevation={10}>
                <div style={{ padding: "0.5rem" }}>
                  <Typography variant="h6" align="left">
                    <h5>{scheme.description}</h5>
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={null} sm={1}></Grid>
          </Grid>
        </div>
        <div style={{ paddingTop: "1rem" }}>
          <Grid container>
            <Grid item xs={null} sm={3}></Grid>
            <Grid item xs={12} sm={3}>

              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  history.push({
                    pathname: `/edit-scheme/${scheme.slug}`,
                    customNameData: data,
                  });
                }}
              >
                Modify
                </Button>



              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push({
                    pathname: `/raise-req`,
                  });
                }}
              >
                Raise a request
                </Button>
              )
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push({
                    pathname: "/schemes",
                    customNameData: data,
                  });
                }}
              >
                All Schemes
              </Button>
            </Grid>
            <Grid item xs={null} sm={3}></Grid>
          </Grid>
        </div>
      </div>
    );
  };

  if (scheme) {
    return <Fragment>{generateSchemeJSX()}</Fragment>;
  } else {
    return <div>Loading</div>;
  }
};

export default SchemeCentral;
