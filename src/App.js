import React from 'react';
import Map from './components/Map.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        height: '100vh',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
            <Grid item xs={8} className={classes.paper}>
                <Map/>
            </Grid>
            <Grid item xs={4}>
                Discussion
            </Grid>
        </Grid>
      </div>
  );
}

export default App;
