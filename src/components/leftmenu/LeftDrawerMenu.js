import React, { useState, useEffect } from 'react';
import { Drawer, makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import FilterIcon from '@material-ui/icons/Filter';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';

import Notification from './Notification';
import { getNotifications, deleteNotification } from "../../services/NotificationService";

const config = require("../../services/ConfigService");
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "5vw"
    },
    modal: {
        paddingTop: 20
    },
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));
export default function LeftDrawerMenu(props) {
    const classes = useStyles();
    const [notificationsOpen, setNotificaitonsOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [activatedFilters, setActivatedFilters] = useState([false, false, false, false, false]);

    useEffect(() => {
        handleTick();
        let timer = setInterval(handleTick, 10000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        props.setActivatedFilters(activatedFilters);
    }, [activatedFilters]);
    /** Handle timer tick, only execute if there is a logged in user
     *
     */
    const handleTick = async() => {
        if(config.jwtToken) {
            let response = await getNotifications();
            if(notifications != response.data) {
                setNotifications(response.data);
            }
        }
    };
    const handleToggleNotifications = () => {
        setNotificaitonsOpen(!notificationsOpen);
    };
    const handleToggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };
    const onNotificationDelete = async(notificationId) => {
        const notification = await deleteNotification(notificationId);
        handleTick();
    };
    const notificationContent = notifications.map((element, i) => (
        <Notification key={i} id={element._id} type={element.type} message={element.message} onDelete={onNotificationDelete}/>
    ));
    const pressButton = (id) => {
        var temp = [...activatedFilters];
        temp[id] = !temp[id];
        setActivatedFilters(temp);
    };

    return (
        <Drawer className={classes.root} anchor='left' open={props.open} onClose={props.onClose}>
            <List>
                <ListItem button onClick={handleToggleNotifications}>
                    <ListItemIcon>
                        <NotificationImportant />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                    {notificationsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={notificationsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {notificationContent}
                    </List>
                </Collapse>
                <ListItem button onClick={handleToggleFilters}>
                    <ListItemIcon>
                        <FilterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sort" />
                    {filtersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button selected={activatedFilters[0]} onClick={() => {pressButton(0);}}>
                            <ListItemText primary="Request"/>
                            {activatedFilters[0] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <ListItem button selected={activatedFilters[1]} onClick={() => {pressButton(1);}}>
                            <ListItemText primary="Nature" />
                            {activatedFilters[1] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <ListItem button selected={activatedFilters[2]} onClick={() => {pressButton(2);}}>
                            <ListItemText primary="Walking"/>
                            {activatedFilters[2] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <ListItem button selected={activatedFilters[3]} onClick={() => {pressButton(3);}}>
                            <ListItemText primary="Photo"/>
                            {activatedFilters[3] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <ListItem button selected={activatedFilters[4]} onClick={() => {pressButton(4);}}>
                            <ListItemText primary="Hint"/>
                            {activatedFilters[4] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}