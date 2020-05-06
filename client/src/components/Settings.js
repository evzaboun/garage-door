import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import human from "../images/avatar.jpg";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import http from "../services/http";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([[1]]);
  const [users, setUsers] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    http
      .get("/users")
      .then((allUsers) => {
        console.log(allUsers);
        setUsers(allUsers.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <List dense className={classes.root}>
      {users.map((user, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <div key={index}>
            <ListItem key={user.email} button>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${index + 1}`} src={human} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={user.email}
                secondary={`Role: ${user.isAdmin ? "Admin" : "User"} - Email: ${
                  user.isVerified ? "" : "not"
                } verified`}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={handleToggle(user)}
                  checked={checked.indexOf(user) !== -1}
                  inputProps={{ "aria-labelledby": `${labelId}` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
