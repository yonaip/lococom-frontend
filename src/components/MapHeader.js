import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchFieldComponent from '../components/SearchFieldComponent';
import Grid from "@material-ui/core/Grid";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <Grid container alignItems="center" justify = "flex-end">
            <Grid item xs={2}>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}