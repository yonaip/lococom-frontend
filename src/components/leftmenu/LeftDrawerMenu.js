import React, { useState, useEffect } from 'react';
import { Drawer, makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse, Badge, Divider, Avatar } from "@material-ui/core";
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Notification from './Notification';
import { getNotifications, deleteNotification } from "../../services/NotificationService";
import requestimg from "../../resources/request.png";
import walkerimg from "../../resources/shoes.png";
import natureimg from "../../resources/nature.png";
import photoimg from "../../resources/photograph.png";
import alertimg from "../../resources/alert.png";

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
        paddingLeft: theme.spacing(4)
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        padding: "10%"
    },
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
                        <Badge badgeContent={notifications.length} color="primary">
                            <NotificationImportant />
                        </Badge>
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
                        <Badge badgeContent={props.numberOfFilteredItems} color="primary">
                            <FilterListRoundedIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Filter" />
                    {filtersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button selected={activatedFilters[0]} onClick={() => {pressButton(0);}}>
                            <Avatar alt="request" src={requestimg} variant="square" className={classes.square} className={classes.small}/>
                            <ListItemText primary="Request"/>
                            {activatedFilters[0] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <Divider/>
                        <ListItem button selected={activatedFilters[1]} onClick={() => {pressButton(1);}}>
                            <Avatar alt="nature" src={natureimg} variant="square" className={classes.square} className={classes.small}/>
                            <ListItemText primary="Nature" />
                            {activatedFilters[1] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <Divider/>
                        <ListItem button selected={activatedFilters[2]} onClick={() => {pressButton(2);}}>
                            <Avatar alt="walking" src={walkerimg} variant="square" className={classes.square} className={classes.small}/>
                            <ListItemText primary="Walking"/>
                            {activatedFilters[2] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <Divider/>
                        <ListItem button selected={activatedFilters[3]} onClick={() => {pressButton(3);}}>
                            <Avatar alt="photo" src={photoimg} variant="square" className={classes.square} className={classes.small}/>
                            <ListItemText primary="Photo"/>
                            {activatedFilters[3] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                        <Divider/>
                        <ListItem button selected={activatedFilters[4]} onClick={() => {pressButton(4);}}>
                            <Avatar alt="hint" src={alertimg} variant="square" className={classes.square} className={classes.small}/>
                            <ListItemText primary="Hint"/>
                            {activatedFilters[4] ? <DoneOutlineRoundedIcon /> : null}
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}