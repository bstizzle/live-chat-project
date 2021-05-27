import React, { useState } from "react";
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
import { register } from "./store/utils/thunkCreators";
import AuthSidebar from './components/auth-components/AuthSidebar';
import AuthHeader from './components/auth-components/AuthHeader';
import AuthFormHeader from './components/auth-components/AuthFormHeader';

import { useStyles } from './themes/loginStyles.js'

const Signup = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={classes.root}>
      <AuthSidebar />
      <Grid container className={classes.header} spacing={3}>
        <AuthHeader page="signup" />
        <Grid item xs={12} className={classes.formContainer}>
          <Paper className={classes.paper} elevation={0} justify="center">
            <AuthFormHeader page="signup" />
            <form onSubmit={handleRegister}>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" aria-describedby="username" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required>
                  <InputLabel htmlFor="e-mail address">E-mail address</InputLabel>
                  <Input id="email" aria-describedby="e-mail address" type="email"/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required error={!!formErrorMessage.confirmPassword}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" aria-describedby="password" type="password" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth required error={!!formErrorMessage.confirmPassword}>
                  <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
                  <Input id="confirmPassword" aria-describedby="confirm password" type="password" />
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.btnContainer}>
                <Button className={classes.submitBtn} color="primary" type="submit" variant="contained" size="large">
                  Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
