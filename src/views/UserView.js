import React, { useState, useEffect } from "react";
import { Button, Grid, Drawer, makeStyles, Typography } from "@material-ui/core";

import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";
import DiscussionOverview from "../components/DiscussionOverview";
import CommentOverview from "../components/CommentOverview";
import Friendslist from "../components/Friendslist";
const config = require("../services/ConfigService");


const useStyles = makeStyles((theme) => ({
    root: {
       position: "fixed",
        bottom: 0,
        top: 0,
        right: 0,
        left:0,
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

    const [leftMenuOpen, setLeftMenu] = useState(false);
    const [differentuser, setDifferentuser] = useState("");
    const [user, setUser] = useState("");
    useEffect(() => {
        handleTick()
        const interval = setInterval(() => handleTick(), 10000);
        return () => {
          clearInterval(interval);
        };
      }, []);
      const handleTick = () => {
        setUser(config.currentlyLoggedUsername);
      };
    
    const toggleLeftMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setLeftMenu(open);
    };

    const getData = (data) => {
        setDifferentuser(data);

    };
    const clear = (event) => {
        setDifferentuser("");
        
       
    };
    let grid;
    if(user == null)
    {
        grid = (<div></div>)
    }
    else{
    if (differentuser == "") {
        grid = (
            <div className={classes.root}>
            <Grid container xs={12}>
                <Grid item xs={3}>
                    <ProfileComponent profile=""></ProfileComponent>
                </Grid>
                <Grid item xs={3}>
                    <DiscussionOverview profile=""></DiscussionOverview>
                </Grid>
                <Grid item xs={3}>
                    <CommentOverview profile=""></CommentOverview>
                </Grid>
                <Grid item xs={3}>
                    <Friendslist callbackFromParent={getData}></Friendslist>
                </Grid>
            </Grid>
            </div>
        );
    } else {
        grid = (
            <div className={classes.root}>
            <Grid container xs={12}>
                <Grid item xs={4}>
                    <ProfileComponent profile={differentuser} ></ProfileComponent>
                </Grid>
                <Grid item xs={4}>
                    <DiscussionOverview profile={differentuser}></DiscussionOverview>
                </Grid>
                <Grid item xs={4}>
                    <CommentOverview profile={differentuser}></CommentOverview>
                    <Button
             onClick={clear}
             className={classes.back}
             variant="contained"
             color="primary">
             Back
         </Button>
                </Grid>
            </Grid>
            </div>
        );
    }}

    return (<div className={classes.root}>
        <Header className={classes.header} position={"fixed"} onLeftMenuClick={toggleLeftMenu} />
        <Drawer anchor='left' open={leftMenuOpen} onClose={toggleLeftMenu(false)}>
            <Typography variant="h6" className={classes.menuElement}>
                Test
            </Typography>
        </Drawer>
        {grid}
    </div>);
}
