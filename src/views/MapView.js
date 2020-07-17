import React, { useEffect, useState } from "react";
import { Grid, Drawer, makeStyles, Typography, Paper } from "@material-ui/core";

import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import CreateDiscussion from '../components/discussion/CreateDiscussion';
import Discussion from "../components/discussion/Discussion";
import LeftDrawerMenu from '../components/leftmenu/LeftDrawerMenu';

import { getAllDiscussions } from "../services/DiscussionService";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    header: {
        flexGrow: 1,
        height: "5vh"
    },
    content: {
        flexGrow: 1,
        height: "95vh"
    },
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    },
    container: {
        position: "absolute",
        overflow: 'auto',
        top: "15vh",
        right: theme.spacing(1),
        zIndex: 1000,
        height: "70vh",
        width: "30vw",
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

    // List of map markers created on double click
    const [markers, setMarkers] = useState([]);

    const [discussions, setDiscussions] = useState([]);

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
            "lat": lat,
            "lng": lng
        });

        setRightPane(
            <Paper className={classes.container} elevation={3}>
                <CreateDiscussion lat={lat} lng={lng} handleClose={handleCreateDiscussionClose} />
            </Paper>
        );

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
        if (!discussionId) {
            setRightPane(null);
        } else {
            setRightPane(<Discussion discussionId={discussionId} />);
        }

        // After discussion is created the red map marker is no longer needed and thus setMarkers([])
        setMarkers([]);
    };

    const selectDiscussion = (discussion) => {
        updateMap({ lat: discussion.lat, lng: discussion.lng });
        setRightPane(
            <Paper className={classes.container} elevation={3}>
                <Discussion discussionId={discussion._id} />
            </Paper>
        );
    };

    function loadAllDiscussions() {
        getAllDiscussions()
            .then((res) => {
                console.log(res);
                setDiscussions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // TODO: check how to memorize discussions array and add render only the newly created discussion
    useEffect(() => {
        loadAllDiscussions();
    }, [rightPane]);

    return (<div className={classes.root}>
        <Header className={classes.mapHeader} position={"fixed"} onLeftMenuClick={toggleLeftMenu(true)} updateMap={updateMap} />
        <Grid container className={classes.content}>
            <Grid item xs={12}>
                <MapComponent
                    defaultCenter={center}
                    onDblClick={createDiscussion}
                    markers={markers}
                    selectDiscussion={selectDiscussion}
                    discussions={discussions}
                />
            </Grid>
        </Grid>
        <LeftDrawerMenu open={leftMenuOpen} onClose={toggleLeftMenu(false)} />
        {rightPane}
    </div>);
}
