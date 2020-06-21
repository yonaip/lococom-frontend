import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchFieldComponent from '../components/SearchFieldComponent';
import createSpacing from "@material-ui/core/styles/createSpacing";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  searchField: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    justify: "flex-end"
  },
}));

export default function MapHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container xs={4} alignItems="center" justify = "flex-start">
            <Grid item xs={1}>
              <IconButton edge="start" className={classes.menuButton} onClick={props.onLeftMenuClick(true)} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.title}>
                LoCoCom
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={4} alignItems="center" justify = "center">
            <Grid item >
              <SearchFieldComponent className={classes.searchField}/>
            </Grid>
          </Grid>
          <Grid container xs={4} alignItems="center" justify = "flex-end">
            <Grid item>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}