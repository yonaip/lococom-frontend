import React, { useEffect, useState, useMemo } from "react";
import { Grid, Drawer, makeStyles, Typography, Paper } from "@material-ui/core";
import { useParams } from "react-router";


import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import { getAllDiscussions, getDiscussion } from "../services/DiscussionService";
import CreateDiscussion from '../components/discussion/CreateDiscussion';
import Discussion from "../components/discussion/Discussion";
import LeftDrawerMenu from '../components/leftmenu/LeftDrawerMenu';

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
export default function MapView(props) {

    const classes = useStyles();

    /** Checks the path for parameters and makes coordinates out of them
     * 
     */
    let param = useParams();
    let coordinates;
    if (param && param.lat && param.lng) {
        coordinates = {
            lat: parseFloat(param.lat),
            lng: parseFloat(param.lng)
        }
    }

    console.log(coordinates);

    //const [center, setCenter] = useState(props.center? props.center : { lat: 48.137154, lng: 11.576124 });
    const [center, setCenter] = useState(coordinates? coordinates : { lat: 48.137154, lng: 11.576124 });

    // Sets the content of the right pane 
    const [rightPane, setRightPane] = useState(null);

    // TODO: implement leftsideMenu
    const [leftMenuOpen, setLeftMenu] = useState(false);

    // List of map markers created on double click
    const [markers, setMarkers] = useState([]);

    const [discussions, setDiscussions] = useState([]);

    const [activatedFilters, setActivatedFilters] = useState([false, false, false, false, false]);
    const topics = ["Request", "Nature", "Walking", "Photo", "Hint"];


    useEffect(() => {
        if (props.id) {
            /* setRightPane(<Discussion discussionId={props.id}/>);*/
            getDiscussion(props.id).then(({ data }) => { selectDiscussion(data); })
        }
        else {

        }
    }, [props.id]);

    // Register listener on escape
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    });

    useEffect(() => {
        loadAllDiscussions();
    }, [activatedFilters]);

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
        console.log(event);

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        updateMap({
            "lat": lat,
            "lng": lng
        });

        setRightPane(
            <Paper className={classes.container} elevation={3}>
                <CreateDiscussion lat={lat} lng={lng} handleClose={handleCreateDiscussionClose}/>
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
            setRightPane(
                <Paper className={classes.container} elevation={3}>
                    <Discussion discussionId={discussionId}/>
                </Paper>
            );
        }

        // After discussion is created the red map marker is no longer needed and thus setMarkers([])
        setMarkers([]);
    };

    const handleClose = () => {
        setRightPane(null);
    };

    const selectDiscussion = (discussion) => {
        updateMap({lat: discussion.lat, lng: discussion.lng});
        setRightPane(
            <Paper className={classes.container} elevation={3}>
                <Discussion discussionId={discussion._id}/>
            </Paper>
        );
    };

    function loadAllDiscussions() {
        console.log(activatedFilters);
        getAllDiscussions(activatedFilters
            .map((entry, index) => {
                return [entry, index]
            })
            .filter((listElement) => {
                return listElement[0]
            })
            .map((listElement) => {
                return listElement[1]
            })
            .map((index) => {
                return topics[index]
            })
            .toString()
        )
            .then((res) => {
                //console.log(res);
                setDiscussions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={classes.root}>
            <Header
                className={classes.mapHeader}
                position={"fixed"}
                onLeftMenuClick={toggleLeftMenu(true)}
                updateMap={updateMap}
            />
            <Grid container className={classes.content}>
                <Grid item xs={12}>
                    <MapComponent
                        onDblClick={createDiscussion}
                        markers={markers}
                        selectDiscussion={selectDiscussion}
                        discussions={discussions}
                    />
                </Grid>
            </Grid>
            <LeftDrawerMenu
                open={leftMenuOpen}
                onClose={toggleLeftMenu(false)}
                activatedFilters={activatedFilters}
                setActivatedFilters={setActivatedFilters}
                loadAllDiscussions={loadAllDiscussions}
                numberOfFilteredItems={discussions.length}
            />
            {rightPane}
        </div>);
}
