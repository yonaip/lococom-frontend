import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Button, AppBar, Toolbar, Typography, IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import LoginStatus from "./LoginStatus";
import SearchFieldComponent from './SearchFieldComponent';
import LoginDialog from "./LoginDialog";

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    width: '50%',
    height: '50%',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MapHeader(props) {
  const classes = useStyles();

  const [user, setUser] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setLoginDialogOpen(false);
    if(config.currentlyLoggedUsername != null) {
      setUser(config.currentlyLoggedUsername);
    }
  }

  const handleLoginButton = (event) => {
    setLoginDialogOpen(true);
  }

  let userStatus = (user == null ?(
    <Grid container alignItems="center" justify = "flex-end">
      <Grid item xs={3}>
        <Box className={classes.button}>
          <Button color="inherit" onClick={handleLoginButton}>Login</Button>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box className={classes.button}>
          <Button color="secondary">Register</Button>
        </Box>
      </Grid>
    </Grid>
  ):(<Box className={classes.button}>
    <Button color="inherit" variant="outlined">{user}</Button>
  </Box>));

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Grid container alignItems="center" justify = "flex-start">
            <Grid item xs={1}>
              <IconButton edge="start" className={classes.menuButton} onClick={props.onLeftMenuClick(true)} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" className={classes.title}>
                LoCoCom
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify = "center">
            <Grid item xs={7}>
              <SearchFieldComponent updateMap={props.updateMap}/>
            </Grid>
          </Grid>
          {userStatus}
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginDialogOpen} handleClose={handleDialogClose}/>
    </div>
  );
}