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
    minWidth: "94%",
    maxWidth: "100%",

    textAlign: "initial",
    borderRadius: "11px",
    background: "#F7F8F9",
    boxShadow: "5px 5px 10px #dedfe0, -5px -5px 10px #ffffff",

    // backgroundColor: "#F7F8F9",
    // zIndex: 0,
    // display: "block",
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

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.department}
        </Typography>
        <Typography style={{ color: "#21bf73" }} variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.date}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ backgroundColor: " #21bf73", color: "white" }}
          size="small"
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
