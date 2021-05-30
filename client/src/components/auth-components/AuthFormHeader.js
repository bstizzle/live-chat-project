import React from 'react';
import { useStyles } from '../../themes/loginStyles';
import { 
  Hidden,
  Typography
} from '@material-ui/core';

const AuthFormHeader = ({ page }) => {
  const classes = useStyles();

  let header;
  if(page === "login") {
    header = "Welcome back!"
  } else {
    header = "Create an account."
  }

  return(
    <>
      <Hidden smDown>
        <Typography variant="h3" className={classes.formHeader}>{header}</Typography>
      </Hidden>
      <Hidden mdUp>
        <Typography variant="h4" className={classes.formHeader}>{header}</Typography>
      </Hidden>
    </>
  );
}

export default AuthFormHeader;