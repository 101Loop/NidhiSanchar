import React, { Component, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Made with ❤️ "}
      <Link color="inherit" href="#">
        for India
      </Link>{" "}
      in India
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Box mt={5}>
            Nidhi Sanchar - Seamless, transparent and secure scheme funds
            management.
          </Box>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
        {/* End footer */}
      </div>
    </React.Fragment>
  );
}
