import React, { useState } from "react";
import { Grid, Drawer, makeStyles, Typography } from "@material-ui/core";

import MapHeader from "../components/Header";
import MapComponent from "../components/MapComponent";
import CreateDiscussion from '../components/CreateDiscussion';
import Discussion from "../components/Discussion";
import nature from "../resources/nature-black.png"
import request from "../resources/request.png"
import walking from "../resources/sport-black.png"
import photo from "../resources/photograph.png"
import hint from "../resources/attention.png"

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

    // Munich: lat: 48.137154, lng: 11.576124, TODO: update with user location
    const [center, setCenter] = useState({ lat: 48.137154, lng: 11.576124 });
    
    // Sets the content of the right pane 
    const [rightPane, setRightPane] = useState(null);

    // TODO: implement leftsideMenu
    const [leftMenuOpen, setLeftMenu] = useState(false);

    // const [discussionCreated, setDiscussionStatus] = useState(false);
    // const [discussionId, setDiscussionId] = useState(null);

    // List of map markers created on double click
    const [markers, setMarkers] = useState([]);

    // Callback functions for opening/closing leftsideMenu
    const toggleLeftMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setLeftMenu(open);
    };

    const updateMap = (coordinates) => {
        setCenter(coordinates);
    };

    const createDiscussion = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        updateMap({
            "lat":lat, 
            "lng":lng
        });

        setRightPane(<CreateDiscussion lat={lat} lng={lng} handleClose={handleCreateDiscussionClose}/>);

        setMarkers((current) => [
            ...current,
            {
                lat: lat,
                lng: lng,
                time: new Date(),
            },
        ]);
    };

    const handleCreateDiscussionClose = (discussionId) => {
        //setRightPane(<Discussion createdDiscussionId={discussionId}/>);
        console.log(discussionId);
    };

    const selectDiscussion = (discussion) => {
        setRightPane(<Discussion discussionId={discussion._id}/>);
    };

    // const updateDiscussionPane = (discussionCreated) => {
    //     setDiscussionStatus(discussionCreated);
    // }

    // const createdDiscussionId = (id) => {
    //     setDiscussionId(id);
    //     console.log(id);
    // }

    // Set container for map and disucssion pane
    let grid;
    if (rightPane) {
        grid = (
            <Grid container>
                <Grid item xs={8} className={classes.element}>
                    <MapComponent
                        defaultCenter={center}
                        onDblClick={createDiscussion}
                        markers={markers}
                        selectDiscussion={selectDiscussion}
                    />
                </Grid>
                <Grid item xs={4} className={classes.element}>
                    {rightPane}
                </Grid>
            </Grid>
        );
    } else {
        grid = (
            <Grid container>
                <Grid item xs={12} className={classes.element}>
                    <MapComponent
                        defaultCenter={center}
                        onDblClick={createDiscussion}
                        markers={markers}
                        selectDiscussion={selectDiscussion}
                    />
                </Grid>
            </Grid>
        );
    }
    // if (discussionOpen & !discussionCreated) {
    //     grid = (
    //         <Grid container>
    //             <Grid item xs={8} className={classes.element}>
    //                 <MapComponent
    //                     defaultCenter={center}
    //                     onDblClick={toggleDiscussion}
    //                 />
    //             </Grid>
    //             <Grid item xs={4} className={classes.element}>
    //                 <CreateDiscussion updateDiscussionPane={updateDiscussionPane} createdDiscussionId={createdDiscussionId}/>
    //             </Grid>
    //         </Grid>
    //     );
    // } else if (!discussionOpen & !discussionCreated) {
    //     grid = (
    //         <Grid item xs={12} className={classes.element}>
    //             <MapComponent
    //                 defaultCenter={center}
    //                 onDblClick={toggleDiscussion}
    //             />
    //         </Grid>
    //     );
    // } else {
    //     grid = (
    //         <Grid container>
    //             <Grid item xs={8} className={classes.element}>
    //                 <MapComponent
    //                     defaultCenter={center}
    //                     onDblClick={toggleDiscussion}
    //                 />
    //             </Grid>
    //             <Grid item xs={4} className={classes.element}>
    //                 <Discussion updateDiscussionPane={updateDiscussionPane} createdDiscussionId={discussionId}/>
    //             </Grid>
    //         </Grid>
    //     );
    // }

    return (<div className={classes.root}>
        <MapHeader className={classes.mapHeader} position={"fixed"} onLeftMenuClick={toggleLeftMenu} updateMap={updateMap} />
        <Drawer anchor='left' open={leftMenuOpen} onClose={toggleLeftMenu(false)}>
            <Typography variant="h6" className={classes.menuElement}>
                Test
            </Typography>
        </Drawer>
        {grid}
    </div>);
}
