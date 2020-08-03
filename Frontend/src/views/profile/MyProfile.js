import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: "1rem 2rem 0rem 2rem ",
    padding: "1rem",
    width: "60%",
    textAlign: "initial",
    borderRadius: "11px",
    background: "#F7F8F9",
    boxShadow: "5px 5px 10px #dedfe0, -5px -5px 10px #ffffff",

    // backgroundColor: "#F7F8F9",
    // zIndex: 0,
    // display: "block",
  },
  static: {
    color: "#5f6368",
    fontSize: "16px",
    float: "left",
    width: "30%",
    height: "3rem",
  },
  data: {
    color: "#202124",
    float: "left",
    height: "3rem",
    textAlign: "initial",
    paddingLeft: "20%",
    width: "60%",
  },
  description: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "500",
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyProfile(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="profile-section">
          <div className={classes.static}>Type</div>

          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.isStateUser ? "State" : "Center"}
            </Typography>
          </div>
        </div>
        <div className="profile-section">
          <div className={classes.static}>Department</div>

          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.department}
            </Typography>
          </div>
        </div>

        <div className="profile-section">
          <div className={classes.static}>Name</div>
          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.name}
            </Typography>
          </div>
        </div>
        <div className="profile-section">
          <div className={classes.static}>Birthday</div>
          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.birthday}
            </Typography>
          </div>
        </div>

        <div className="profile-section">
          <div className={classes.static}>Gender</div>

          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.gender}
            </Typography>
          </div>
        </div>
        <div className="profile-section">
          <div className={classes.static}>Username</div>
          <div className={classes.data}>
            <Typography variant="h6" component="h4">
              {props.username}
            </Typography>
          </div>
        </div>

        <div className="profile-section">
          <div className={classes.data} className={classes.static}>
            Email
          </div>

          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.email}
            </Typography>
          </div>
        </div>

        <div className="profile-section">
          <div className={classes.static}>Phone</div>

          <div className={classes.data}>
            <Typography variant="h6" component="h2">
              {props.phone}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
