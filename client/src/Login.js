import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  Paper,
  Input,
  InputLabel
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthSidebar from './components/auth-components/AuthSidebar';
import AuthHeader from './components/auth-components/AuthHeader';
import AuthFormHeader from './components/auth-components/AuthFormHeader';

import { useStyles } from './themes/loginStyles.js'

const Login = (props) => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <AuthSidebar />
      <Grid container spacing={3} className={classes.header}>
        <AuthHeader page="login" />
        <Grid item xs={12} className={classes.formContainer}>
          <Paper className={classes.paper} elevation={0} justify="center">
            <AuthFormHeader page="login" />
            <form onSubmit={handleLogin}>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" aria-describedby="username" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" aria-describedby="password" type="password" />
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.subBtnContainer}>
                <Button className={classes.submitBtn} color="primary" type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
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
