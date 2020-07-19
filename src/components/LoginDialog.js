import React, {useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core";

import { loginUser } from "../services/AuthService";

const config = require("../services/ConfigService");

export default function LoginDialog(props) {

    const[username, setUsername] = useState("");
    const[usernameIncorrect, setUsernameIncorrect] = useState(false);

    const[password, setPassword] = useState("");
    const[passwordIncorrect, setPasswordIncorrect] = useState(false);

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

    const handleCancel = () => {
        setPassword("");
        props.handleClose()
    }

    const handleLogin = () => {
        loginUser(username, password)
            .then((response) => {
                console.log(response);
                setUsernameIncorrect(false);
                setPasswordIncorrect(false);
                props.handleClose({username: username, token: response.data.token});
            }).catch((err) => {
                console.log(err);
                setUsernameIncorrect(true);
                setPasswordIncorrect(true);
            });
    }

    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To login to LoCoCom please enter your username and password.
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLogin} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}