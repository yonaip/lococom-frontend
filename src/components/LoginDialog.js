import React, {useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core";

export default function LoginDialog(props) {
    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={props.handleClose} color="primary">
                Subscribe
            </Button>
            </DialogActions>
        </Dialog>
    );
}