import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import satyalogo from "../assets/logo_sj.png";

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "#E76829",
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    marginRight: "2rem",
    width: "2rem",
    height: "3rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  ul: {
    marginLeft: "auto",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

function ResponsiveDrawer() {
  const menuItems = [
    { text: "Home", href: "/" },
    { text: "LogIn", href: "/signin" },
    // { text: "Discussions", href: "/discussions" },
    // { text: "Help", href: "/help" },
    { text: "Contact", href: "/contact" },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = menuItems.map((item) => (
    <a className="menu-btn" href={item.href}>
      <div>{item.text}</div>
    </a>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={satyalogo} className={classes.logo} alt="logo" />

          <Typography variant="h6" noWrap>
            Nidhi Sanchar
          </Typography>
          <ul className={classes.ul}>
            {menuItems.map((item) => (
              <a className="btn" href={item.href}>
                {item.text}
              </a>
            ))}
          </ul>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
        <style>
          {`   
              .btn{
                  color: white;
                  font-weight: bold;
              } 
              .menu-btn{
                  font-size: 1rem;
                  padding: 1.1rem 1rem;
                  text-align:initial;
                  color:#E76829 ;
                  font-weight: bold;
              } 
              a:hover {
                  color:black;
                  text-decoration:none;
              }
          `}
        </style>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
