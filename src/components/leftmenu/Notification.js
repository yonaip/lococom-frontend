import React, { useState } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import ThumbUp from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default function Notification(props) {

    const classes = useStyles();

    let primaryText = "";
    let icon;
    switch(props.type) {
        case "disc_upvote":
            primaryText = "Discussion upvote";
            icon = <ThumbUp />;
            break;
        case "comm_create":
            primaryText = "New comment";
            icon =  <CommentIcon />
            break;
        default:
            primaryText = "New notification";
            icon =  <ReportProblemIcon />
            break;
    }

    return (
        <ListItem button className={classes.nested}>
            <ListItemIcon>
                {icon}
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