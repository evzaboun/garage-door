import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import garageDoor from "../services/garageDoorConnection";

const styles = {
  freezeContainer: {
    minHeight: "100vh",
    padding: "10%"
  },

  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridGap: "3vh"
  },

  button: {
    backgroundColor: "transparent",
    color: "#212121",
    borderColor: "#212121",
    borderRadius: "5px",
    padding: "20px",
    fontWeight: "bold",
    fontSize: "150%"
  }
};

class GarageDoor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  componentDidMount() {
    garageDoor.connect();
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    garageDoor.disconnect();
    document.body.style.overflow = "initial";
  }

  openDoor = e => {
    this.preventBubbling(e);
    navigator.vibrate(15);
    garageDoor.send("OPEN");
    console.log("OPEN");
  };

  closeDoor = e => {
    this.preventBubbling(e);
    navigator.vibrate(15);
    garageDoor.send("CLOSE");
    console.log("CLOSE");
  };

  freezeDoor = e => {
    this.preventBubbling(e);
    navigator.vibrate([20, 50, 20]);
    garageDoor.send("FREEZE");
    console.log("FREEZE");
  };

  preventBubbling = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.freezeContainer}
        onClick={e => this.freezeDoor(e)}
      >
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            className={classes.button}
            disabled={this.state.connected}
            onClick={e => this.openDoor(e)}
          >
            OPEN
          </Button>
          <Button
            variant="outlined"
            className={classes.button}
            disabled={this.state.connected}
            onClick={e => this.closeDoor(e)}
          >
            CLOSE
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(GarageDoor);
