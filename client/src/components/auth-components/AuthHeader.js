import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../themes/loginStyles';
import {
  Grid,
  Typography,
  Button,
  Hidden
} from '@material-ui/core';

const AuthHeader = ({ page }) => {
  const classes = useStyles();
  const history = useHistory();

  let header;
  if(page === "login") {
    header = "Don't have an account?"
  } else {
    header = "Already have an account?"
  }

  return(
    <>
      {/* <Hidden smDown> */}
       <Grid item sm={8} xs={6}>
          <Typography className={classes.headerTxt} align="right">{header}</Typography>
        </Grid>
      {/* </Hidden> */}
      <Grid item sm={4} xs={6}>
        <Button className={classes.routeBtn}
          onClick={() => {
            if(page === "login") {
              history.push("/register")
            } else {
              history.push("/login")
            }
          }}>
          {page === "login" ? "Create account" : "Login"}
        </Button>
      </Grid>
    </>
  );
}

export default AuthHeader;