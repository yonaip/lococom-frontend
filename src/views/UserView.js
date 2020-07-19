import React, { useState, useEffect } from "react";
import { Button, Grid, Drawer, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

import LeftDrawerMenu from "../components/leftmenu/LeftDrawerMenu";
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";
import DiscussionOverview from "../components/DiscussionOverview";
import Friendslist from "../components/Friendslist";
import CircularProgress from '@material-ui/core/CircularProgress';
import Discussion from "../components/discussion/Discussion";

import ChatDialog from '../components/ChatDialog';

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
    header: {
        flexGrow: 1
    },
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    },
    back: {
        float: 'right',
        marginRight: "8%",
        marginTop: "8%",
    },
}));

// View of user profile
export default function UserView() {

    const classes = useStyles();
    //check if left Menu from Header is open
    const [leftMenuOpen, setLeftMenu] = useState(false);
    //Variable for another user profile
    const [differentuser, setDifferentuser] = useState("");
    //stores loggedin user as String
    const [user, setUser] = useState("");

    const history = useHistory();

    
    useEffect(() => {
        handleTick()
        const interval = setInterval(() => handleTick(), 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    //saves loggedin User in Variable user
    const handleTick = () => {
        setUser(config.currentlyLoggedUsername);
    };

    // Callback functions for opening/closing leftsideMenu
    const toggleLeftMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setLeftMenu(open);
    };

    //store user in "differentuser" from Childcomponent "Friendslist"
    const getData = (data) => {
        setDifferentuser(data);

    };
    //when clicking back button and switching to loggedin User set differentuser to ""
    const clear = (event) => {
        setDifferentuser("");
    };
    //switch to mapview when location is entered in searchbar
    const switchToMapView = (coordinates) => {
        console.log(coordinates); //lat=:lat&lng=:lng"
        //history.push(`/map/${coordinates.lat}/${coordinates.lng}`)
        history.push(`/map?lat=${coordinates.lat}&lng=${coordinates.lng}`)
    }

    //when user is not loggedin, no profile view will be displayed
    let grid;
    if (user == null) {
        grid = (<div>Loading user!</div>)
    }
    //when user is logged in...
    else {
        //display loggedin user
        if (differentuser == "") {
            grid = (
                <Grid container direction="row" justify="space-around" alignItems="flex-start">
                    <Grid item xs={4}>
                        <ProfileComponent profile=""></ProfileComponent>
                    </Grid>
                    <Grid item xs={4}>
                        <DiscussionOverview profile=""></DiscussionOverview>
                    </Grid>
                    <Grid item xs={4}>
                        <Friendslist callbackFromParent={getData}></Friendslist>
                    </Grid>
                </Grid>
            );
        } else {
            //display another profile the loggedin user has clicked on
            grid = (
                <Grid container direction="row" justify="space-around" alignItems="flex-start">
                    <Grid item xs={4}>
                        <ProfileComponent profile={differentuser} ></ProfileComponent>
                    </Grid>
                    <Grid item xs={4}>
                        <DiscussionOverview profile={differentuser}></DiscussionOverview>
                    </Grid>
                </Grid>
            );
        }
    }

    return (<div className={classes.root}>
        <Header className={classes.header} position={"fixed"} onLeftMenuClick={toggleLeftMenu(true)} updateMap={switchToMapView}/>
        {/* <LeftDrawerMenu open={leftMenuOpen} onClose={toggleLeftMenu(false)} /> */}
        {grid}
    </div>);
}
