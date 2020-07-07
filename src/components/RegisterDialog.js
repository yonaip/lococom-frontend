import React, {useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core";

import { registerUser } from "../services/AuthService";

const config = require("../services/ConfigService");

export default function RegisterDialog(props) {

    const[username, setUsername] = useState("");
    const[usernameIncorrect, setUsernameIncorrect] = useState(false);

    const[password, setPassword] = useState("");
    const[passwordIncorrect, setPasswordIncorrect] = useState(false);

    const[email, setEmail] = useState("");

    const handleUsernameChange = (event) => {
        if(username !==  event.target.value) {
            setUsername(event.target.value);
        }
    }
    const handlePasswordChange = (event) => {
        if(password !== event.target.value) {
            setPassword(event.target.value)
        }
    }

    const handleEmailChange = (event) => {
        if(email !== event.target.value) {
            setEmail(event.target.value)
        }
    }

    const handleCancel = () => {
        setPassword("");
        props.handleClose()
    }

    const handleRegister = () => {
        registerUser(username, password, email)
            .then((response) => {
                console.log(response);
                setUsernameIncorrect(false);
                setPasswordIncorrect(false);
                props.handleClose();
            }).catch((err) => {
                console.log(err);
                setUsernameIncorrect(true);
                setPasswordIncorrect(true);
            });
    }

    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To register in LoCoCom please enter the following details.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    error={usernameIncorrect}
                    margin="dense"
                    id="username"
                    label="Username"
                    type="username"
                    defaultValue={username}
                    fullWidth
                    onChange={handleUsernameChange}
                />
                <TextField
                    required
                    error={passwordIncorrect}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={handlePasswordChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="E-Mail"
                    type="text"
                    defaultValue={email}
                    fullWidth
                    onChange={handleEmailChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleRegister} color="primary">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
}