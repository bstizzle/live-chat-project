import React from 'react';
import { useStyles } from '../../themes/loginStyles';
import bgImage from '../../images/bg-img.png';
import bubble from '../../images/bubble.svg';
import {
  Hidden,
  Grid,
  Typography
} from '@material-ui/core';

const AuthSidebar = () => {
  const classes = useStyles();

  return(
    <Hidden smDown>
      <div className={classes.sidebar} style={{"--img": `url("${bgImage}")`}}>
        <Grid
          container
          className={classes.imgOver}
          spacing={10}
        >
          <Grid item xs={12}>
            <img src={bubble} alt="bubble" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.sideTxt}>
              Converse with anyone<br/>
              with any language
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Hidden>
  );
}

export default AuthSidebar;