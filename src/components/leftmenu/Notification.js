import React, { useState } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import StarBorder from '@material-ui/icons/StarBorder';
import ThumbUp from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default function Notification(props) {

    const classes = useStyles();

    let primaryText = "";
    switch(props.type) {
        case "disc_upvote":
            primaryText = "Discussion upvote";
            break;
        default:
            primaryText = "New notification";
            break;
    }

    return (
        <ListItem button className={classes.nested}>
            <ListItemIcon>
                <ThumbUp />
            </ListItemIcon>
            <ListItemText primary={primaryText} secondary={props.message}/>
        </ListItem>
    );
}