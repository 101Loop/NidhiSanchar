import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { blue, blueGrey, lightBlue } from "@material-ui/core/colors";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import { Redirect, useHistory, Link } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReportIcon from '@material-ui/icons/Report';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import ExtensionIcon from '@material-ui/icons/Extension';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  my_button: {
    margin: theme.spacing(1, 1.5),
    float: "right",
  },
  my_card: {
    width: "250px",
    height: "130px",
    cursor: "pointer",
    background: "#fff",
    "&:hover": {
      background: "#f1f1f1",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: "flex",
  },

  toolbarTitle: {
    flexWrap: "wrap",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 4),
  },
  tr: {
    background: "#f1f1f1",
    "&:hover": {
      background: "#f00",
    },
  },
  cardHeader: {
    backgroundColor: "#D3D3D3",
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    description: ["Create Scheme Issue"],
    icon: {CreateIcon},
  },
  {
    description: ["Connection Problem"],
    icon: {WifiTetheringIcon},
  },
  {
    description: ["Fund Approval Issue"],
    icon : {CancelScheduleSendIcon},
  },
  {
    description: ["Feed Refresh "],
    icon: {RefreshIcon},
  },
  {
    description: ["Comment Issue"],
    icon : {SmsFailedIcon},
  },
  {
    description: ["Report Spam"],
    icon : {ReportIcon},
  },
  {
    description: ["Authentication Issues"],
    icon : {PermIdentityIcon},
  },
  {
    description: ["Account info problem"],
    icon : {AccountCircleIcon},
  },
  {
    description: ["Nidhi sanchar Extensions"],
    icon : {ExtensionIcon},
  },
];

export default function Support() {
  const classes = useStyles();
  let history = useHistory();

  const handleRoute = (name) => {
    const pname = name;
    history.push({
      pathname: `/shelp/${name}`,
      customNameData: pname,
    });
  };

  let [showChat, setShowChat] = useState(true);

  const startChat = () => {
    setShowChat(true);
  };
  const hideChat = () => {
    setShowChat(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <section>
        <div>
          <Typography
            component="div"
            style={{
              backgroundColor: "#24292e",
              paddingTop: "4rem",
              width: "auto",
              height: "18vh",
              fontWeight: "600",
              color: "#F1F8FF",
              textshadow:
                "0 1px 1px rgba(27,31,35,0.25), 0 1px 25px rgba(27,31,35,0.75)",
            }}
            variant="h4"
            align="center"
          >
            Help Desk
          </Typography>

          <Container
            style={{ backgroundColor: "#f6f8fa" }}
            maxWidth="lg"
            component="main"
            className={classes.heroContent}
          >
            <Typography
              style={{ color: "#24292e" }}
              component="h5"
              variant="h6"
              align="center"
            >
              Choose the kind of request needed from below
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container
            maxWidth="md"
            component="main"
            style={{ backgroundColor: "#f6f8fa" }}
          >
            <Grid container spacing={3} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint

                <Grid
                  item
                  key={tier.title}
                  
                  xs={12}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                  md={4}
                >
                  <Card
                    className={classes.my_card}
                    onClick={() => handleRoute(tier.description)}
                  >
                    <CardContent className="classes.my_card_">
                      <div className={classes.cardPricing}>
                       
                        <Typography variant="h6" color="textSecondary">
                          
                        </Typography>
                      </div>
                      <ul>
                     
                        
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}


                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* <br />
          <br />
          <hr /> */}

          <div
            style={{
              display: "flex",
              height: "25vh",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                width: "auto",
                color: "black",
                padding: "0 0 4vh 0",
              }}
              variant="h4"
              align="center"
            >
              Requests not covered?
            </Typography>

            <Container>
              <ColorButton
                style={{ background: "#E76829" }}
                variant="contained"
              >
                <Link
                  to="/help"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Write us your request
                </Link>
              </ColorButton>
            </Container>
          </div>
        </div>
        <div className="bot">

        </div>
      </section>
    </React.Fragment>
  );
}
