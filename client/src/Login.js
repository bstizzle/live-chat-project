import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

import { makeStyles } from "@material-ui/core/styles";
import bgImage from './images/bg-img.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    padding: "20px",
    flexDirection: "column"
  },
  header: {
    display: 'flex',
    flexDirection: "row"
  },
  paper: {
    textAlign: "center",
  },
  button: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
    width: "200px",
    height: "100px"
  }
}))

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <>
    <Box className={classes.root}>
      <img src={bgImage} alt="sidebar" />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>Need to register?</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.button} onClick={() => history.push("/register")}>Register</Button>
          </Grid>
          <Grid item xs={12} alignContent="center">
            <Paper className={classes.paper} elevation={0}>
            <form onSubmit={handleLogin}>
            <Grid item>
              <FormControl required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required>
                <TextField
                  aria-label="password"
                  label="Password"
                  name="password"
                  type="text"
                />
              </FormControl>
              </Grid>
            </form>
            </Paper>
          </Grid>
        </Grid>
    </Box>


    <Grid container justify="center">
      <Box>
        <Grid container item>
          <Typography>Need to register?</Typography>
          <Button onClick={() => history.push("/register")}>Register</Button>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
