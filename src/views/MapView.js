import React, { useState } from "react";
import { Grid, Drawer, makeStyles, Typography } from "@material-ui/core";

import MapHeader from "../components/MapHeader";
import MapComponent from "../components/MapComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mapHeader: {
        flexGrow: 1
    },
    element: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        height: "100vh",
        border: theme.palette.primary
    },
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    }
}));

// View of mapview page
export default function MapView() {

    const classes = useStyles();

    const [leftMenuOpen, setLeftMenu] = useState(false);
    const [discussionOpen, setDiscussion] = useState(false);

    //Munich: lat: 48.137154, lng: 11.576124, update with user location
    const [center, setCenter] = useState({lat: 48.137154, lng: 11.576124})

    // Callback functions for opening/closing leftsideMenu
    const toggleLeftMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftMenu(open);
    };

    const toggleDiscussion = (event) => {
        // Do additional checks if required
        console.log(event);
        setDiscussion(!discussionOpen);
    };

    const updateMap = (coordinates) => {
        setCenter(coordinates);
    }

    // Set container for map and disucssion pane
    let grid;
    if(discussionOpen) {
        grid = (
            <Grid container>
                <Grid item xs={8} className={classes.element}>
                    <MapComponent
                        defaultCenter={center}
                        onRightClick={toggleDiscussion}
                    />
                </Grid>
                <Grid item xs={4} className={classes.element}>
                    <Typography variant="h6" className={classes.menuElement}>
                        Test
                    </Typography>
                </Grid>
            </Grid>
        );
    } else {
        grid = (
            <Grid item xs={12} className={classes.element}>
                <MapComponent
                    defaultCenter={center}
                    onRightClick={toggleDiscussion}
                />
            </Grid>
        );
    }

    return (<div className={classes.root}>
        <MapHeader className={classes.mapHeader} position={"fixed"} onLeftMenuClick={toggleLeftMenu} updateMap={updateMap}/>
        <Drawer anchor='left' open={leftMenuOpen} onClose={toggleLeftMenu(false)}>
            <Typography variant="h6" className={classes.menuElement}>
                Test
            </Typography>
        </Drawer>
        {grid}
    </div>);
}
