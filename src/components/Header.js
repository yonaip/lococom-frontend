import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import SearchFieldComponent from './SearchFieldComponent';
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

import {me} from "../services/AuthService";

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
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

  // Cookie manager
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [user, setUser] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const history = useHistory();


  useEffect(() => {
    config.jwtToken = cookies.token;
    config.currentlyLoggedUsername = cookies.username;

    me()
      .then((profile) => {
        console.log(profile);
        setUser(config.currentlyLoggedUsername);
      })
      .catch((err) => {
        console.log("Error logging in, removing tokens");
        removeCookie('token');
        removeCookie('username');
      })

  }, []);


  const handleDialogClose = (response) => {
    setLoginDialogOpen(false);
    setRegisterDialogOpen(false);

    // if we get a result
    if (response != null) {
      setCookie('token', response.token);
      setCookie('username', response.username);
      setUser(response.username);
    }
  };

  const handleLoginButton = () => {
    setLoginDialogOpen(true);
  };

  const handleRegisterButton = () => {
    setRegisterDialogOpen(true);
  };

  let userStatus;
  if (user == null) {
    userStatus = (
      <Grid container alignItems="center" justify="flex-end">
        <Grid item xs={2}>
          <Box className={classes.button}>
            <Button color="inherit" onClick={handleLoginButton}>Login</Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className={classes.button}>
            <Button color="secondary" onClick={handleRegisterButton}>Register</Button>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    userStatus = (
      <Grid container alignItems="center" justify="flex-end">
        <Grid item xs={2}>
          <Box className={classes.button}>
            <Button color="inherit" variant="outlined" onClick={() => history.push('/profile')}>{user}</Button>
          </Box>
        </Grid>
      </Grid>);
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="flex-start">
          <Grid item xs={1}>
            <IconButton edge="start" className={classes.menuButton} onClick={props.onLeftMenuClick} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" className={classes.title}>
              LoCoCom
              </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={7}>
            <SearchFieldComponent updateMap={props.updateMap} />
          </Grid>
        </Grid>
        {userStatus}
      </Toolbar>
      <LoginDialog open={loginDialogOpen} handleClose={handleDialogClose} />
      <RegisterDialog open={registerDialogOpen} handleClose={handleDialogClose} />
    </AppBar>
  );
}