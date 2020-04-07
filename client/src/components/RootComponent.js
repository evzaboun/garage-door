import React, { Component } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoteControlIcon from "@material-ui/icons/SettingsRemote";
import EcoIcon from "@material-ui/icons/Eco";
import SettingsIcon from "@material-ui/icons/Settings";
import HotTubIcon from "@material-ui/icons/HotTub";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import LoginButton from "@material-ui/core/Button";
import OpacityIcon from "@material-ui/icons/Opacity";
import GarageDoor from "./GarageDoor";
import SolarTemperature from "./SolarTemperature";
import Settings from "./Settings";

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    display: "flex"
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#212121"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },

  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold"
  },

  loginButton: {
    fontWeight: "bold",
    color: "#e0e0e0"
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    minHeight: "100vh",
    position: "relative"
    //padding: theme.spacing(3)
  }
});

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Home monitoring",
      open: false,
      auth: true
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onItemClick = title => {
    this.setState({ title: title });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {this.state.title}
            </Typography>
            <LoginButton
              color="inherit"
              variant="outlined"
              className={classes.loginButton}
            >
              {this.state.auth ? "Login" : "Logout"}
            </LoginButton>
          </Toolbar>
        </AppBar>
        <Router history={history}>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                to="/"
                onClick={() => this.onItemClick("Garage remote")}
                divider={true}
                key={"Garage remote"}
              >
                <ListItemIcon>{<RemoteControlIcon />}</ListItemIcon>
                <ListItemText primary={"Garage remote"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/solar"
                onClick={() => this.onItemClick("Solar temperatures")}
                divider={true}
                key={"Solar temperatures"}
              >
                <ListItemIcon>{<EcoIcon />}</ListItemIcon>
                <ListItemText primary={"Solar temperatures"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/hotWater"
                onClick={() => this.onItemClick("Hot Water")}
                divider={true}
                disabled={true}
                key={"Hot water"}
              >
                <ListItemIcon>{<HotTubIcon />}</ListItemIcon>
                <ListItemText primary={"Hot water"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/energy"
                onClick={() => this.onItemClick("Energy")}
                divider={true}
                disabled={true}
                key={"Energy"}
              >
                <ListItemIcon>{<OfflineBoltIcon />}</ListItemIcon>
                <ListItemText primary={"Energy usage"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/irrigation"
                onClick={() => this.onItemClick("Irrigation")}
                divider={true}
                disabled={true}
                key={"Irrigation"}
              >
                <ListItemIcon>{<OpacityIcon />}</ListItemIcon>
                <ListItemText primary={"Irrigation"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/security"
                onClick={() => this.onItemClick("Security")}
                divider={true}
                disabled={true}
                key={"Security"}
              >
                <ListItemIcon>{<LockOpenIcon />}</ListItemIcon>
                <ListItemText primary={"Security"} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/settings"
                onClick={() => this.onItemClick("Settings")}
                divider={true}
                disabled={false}
                key={"Settings"}
              >
                <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route exact path="/" component={GarageDoor} />
            <Route path="/solar" component={SolarTemperature} />
            <Route path="/settings" component={Settings} />
          </main>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(withTheme(RootComponent));
