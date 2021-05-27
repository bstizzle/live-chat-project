import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../themes/loginStyles';
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';

const AuthHeader = ({ page }) => {
  const classes = useStyles();
  const history = useHistory();

  return(
    <>
      <Grid item sm={8} xs={6}>
        <Typography className={classes.headerTxt} align="right">Already have an account?</Typography>
      </Grid>
      <Grid item sm={4} xs={6}>
        <Button className={classes.routeBtn}
          onClick={() => {
            if(page === "login") {
              history.push("/register")
            } else {
              history.push("/login")
            }
          }}>
          {page === "login" ? "Login" : "Create account"}
        </Button>
      </Grid>
    </>
  );
}

export default AuthHeader;