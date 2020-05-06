import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../services/auth";
import ExtLink from "@material-ui/core/Link";
import emitter from "../services/emitter";
import http from "../services/http";

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <ExtLink color="inherit" href="https://github.com/evzaboun">
        Evangelos Z. {` 👨‍💻`}
      </ExtLink>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  const login = (e) => {
    e.preventDefault();
    e.stopPropagation();

    http
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const token = response.headers["x-auth-token"];
          auth.setToken(token);
          emitter.emit("login");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            component={Link}
            to="/"
            onClick={login}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot">{"Forgot password?"}</Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Register now!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}
