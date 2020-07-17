import React, { useState } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import ThumbUp from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';

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
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" onClick={() => props.onDelete(props.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}