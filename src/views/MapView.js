import React, {useEffect, useState} from "react";
import { Grid, Drawer, makeStyles, Typography } from "@material-ui/core";

import MapHeader from "../components/Header";
import MapComponent from "../components/MapComponent";
import CreateDiscussion from '../components/CreateDiscussion';
import Discussion from "../components/Discussion";
import {getAllDiscussions, getDiscussion} from "../services/DiscussionService";
import Axios from "axios";

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
export default function MapView(props) {

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

    useEffect(() => {
       if(props.id)
       {
       /* setRightPane(<Discussion discussionId={props.id}/>);*/
        getDiscussion(props.id).then(({data}) => {selectDiscussion(data);})
       }
       else{
       
       }
      }, [props.id]);
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
        setRightPane(<Discussion discussionId={discussionId}/>);
        console.log(discussionId);

        // After discussion is created the red map marker is no longer needed and thus setMarkers([])
        setMarkers([]);
    };

    const selectDiscussion = (discussion) => {
        updateMap({lat: discussion.lat, lng: discussion.lng});
        setRightPane(<Discussion discussionId={discussion._id}/>);
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
    },[rightPane]);

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
                        discussions={discussions}
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
                        discussions={discussions}
                    />
                </Grid>
            </Grid>
        );
    }

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
