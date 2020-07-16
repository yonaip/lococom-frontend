import React, { useState, useEffect } from 'react';
import { Drawer, makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Notification from './Notification';

import { getNotifications } from "../../services/NotificationService";

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

    useEffect(() => {
        handleTick();
        let timer = setInterval(handleTick, 10000);

        return () => {
            clearInterval(timer);
        }
    }, []);

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
    }

    const handleToggleNotifications = () => {
        setNotificaitonsOpen(!notificationsOpen);
    }

    const notificationContent = notifications.map((element, i) => (
        <Notification key={i} type={element.type} message={element.message}/>
    ));

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
            </List>
        </Drawer>
    );
}