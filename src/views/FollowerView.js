import React, { useState } from "react";
import { Grid, Drawer, makeStyles, Typography } from "@material-ui/core";

import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";
import DiscussionOverview from "../components/DiscussionOverview";
import CommentOverview from "../components/CommentOverview";
import Friendslist from "../components/Friendslist";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        flexGrow: 1
    },
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    }
}));

// View of user profile
export default function FollowerView() {

    const classes = useStyles();

    const [leftMenuOpen, setLeftMenu] = useState(false);

    // Callback functions for opening/closing leftsideMenu
    const toggleLeftMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftMenu(open);
    };

    return (<div className={classes.root}>
        <Header className={classes.header} position={"fixed"} onLeftMenuClick={toggleLeftMenu}/>
        <Drawer anchor='left' open={leftMenuOpen} onClose={toggleLeftMenu(false)}>
            <Typography variant="h6" className={classes.menuElement}>
                Test
            </Typography>
        </Drawer>
        <Grid container xs={12}>
            <Grid item xs={4}>
                <ProfileComponent></ProfileComponent>
            </Grid> 
            <Grid item xs={4}>
            <DiscussionOverview></DiscussionOverview>
            </Grid> 
            <Grid item xs={4}>
            <CommentOverview></CommentOverview>
            </Grid> 
          
        </Grid>
    </div>);
}
