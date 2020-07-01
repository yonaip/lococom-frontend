import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import {currentlyLoggedInUser} from "../services/ConfigService";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }, 
    button: {
        spacing: theme.spacing(1)
    }
  }));

export default function LoginStatus(props) {

    const classes = useStyles();

    

    return(
            <Grid container alignItems="center" justify = "flex-end">
                <Grid item xs={3}>
                    <Box className={classes.button}>
                        <Button color="inherit">Login</Button>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={classes.button}>
                        <Button color="secondary">Register</Button>
                    </Box>
                </Grid>
            </Grid>
    );

    // <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    //     <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         To subscribe to this website, please enter your email address here. We will send updates
    //         occasionally.
    //       </DialogContentText>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="name"
    //         label="Email Address"
    //         type="email"
    //         fullWidth
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose} color="primary">
    //         Cancel
    //       </Button>
    //       <Button onClick={handleClose} color="primary">
    //         Subscribe
    //       </Button>
    //     </DialogActions>
    //</Dialog>
}