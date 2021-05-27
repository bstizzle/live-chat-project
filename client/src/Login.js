import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  Paper,
  Input,
  InputLabel,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

import { makeStyles } from "@material-ui/core/styles";
import bgImage from './images/bg-img.png';
import bubble from './images/bubble.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  imgOver: {
    textAlign: 'center',
  },
  input: {
    padding: "10px"
  },
  header: {
    paddingTop: "50px"
  },
  headerTxt: {
    paddingTop: "25px", 
    color: "#C0C0C0"
  },
  paper: {
    textAlign: "center",  
  },
  button: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.40)",
    width: "200px",
    height: "80px",
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
    <div className={classes.root}>
      <Hidden smDown>
        <div className="sidebar" style={{"--img": `url("${bgImage}")`}}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.imgOver}
          >
            <Grid item xs={12}>
              <img src={bubble} alt="bubble" />
            </Grid>
            <Grid item xs={12}>
              Converse with anyone<br></br>
              with any language
            </Grid>
          </Grid>
        </div>
      </Hidden>
      <Grid container spacing={3} className={classes.header}>
        <Grid item sm={8} xs={6}>
          <Typography className={classes.headerTxt} align="right">Don't have an account?</Typography>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Button className={classes.button} onClick={() => history.push("/register")} style={{color:"#3A8DFF"}}>
            Create Account
          </Button>
        </Grid>
        <Grid item xs={12} style={{padding: '100px'}}>
          <Paper className={classes.paper} elevation={0} justify="center">
            <Typography variant="h4" style={{textAlign: "left", fontWeight: "bold", paddingBottom: '40px'}}>Welcome back!</Typography>
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
              <Grid item xs={12} style={{paddingTop: '40px'}}>
                <Button className={classes.button} color="primary" type="submit" variant="contained" size="large">
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
