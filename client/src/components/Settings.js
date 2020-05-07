import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import http from "../services/http";
import Divider from "@material-ui/core/Divider";
import PermIdentitySharpIcon from "@material-ui/icons/PermIdentitySharp";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    color: "black",
    backgroundColor: "white",
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const handleToggle = (e, user, index) => {
    e.preventDefault();
    e.stopPropagation();
    http
      .put(`/assign/${user.email}`)
      .then((result) => {
        users[index].isAdmin = result.data.isAdmin;
        setUsers(() => [...users]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    http
      .get("/users")
      .then((allUsers) => {
        setUsers(allUsers.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <List
      subheader={<ListSubheader>Users</ListSubheader>}
      className={classes.root}
    >
      {users.map((user, index) => {
        return (
          <div key={index}>
            <ListItem>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <PermIdentitySharpIcon fontSize="large" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={user.email}
                secondary={`Role: ${user.isAdmin ? "Admin" : "User"} - Email: ${
                  user.isVerified ? "" : "not"
                } verified`}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={(e) => handleToggle(e, user, index)}
                  checked={user.isAdmin}
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
