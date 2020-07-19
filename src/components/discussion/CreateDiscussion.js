import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Box, Divider, ButtonGroup } from '@material-ui/core';

import { createDiscussion } from "../../services/DiscussionService";
import Topic from "./Topic";
import { findLastIndex } from 'lodash';

const config = require("../../services/ConfigService");

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },

    element: {
        position: 'relative',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },

    titleField: {
        display: 'flex',
        padding: theme.spacing(1),
        background: "white",
        borderRadius: "5px",
        justifyContent: 'inherit',
    },

    contentField: {
        display: 'flex',
        padding: theme.spacing(1),
        background: "white",
        borderRadius: "5px",
        justifyContent: 'inherit',
    },

    button: {  
        margin: theme.spacing(1)
    }

}));

/** Component for creation of discussions
 * 
 * @param {*} props
 * @param {Number} props.lat
 * @param {Number} props.lng
 * @param {()} props.handleClose returns the id of the newly created discussion or nothing
 */
export default function CreateDiscussion(props) {

    const classes = useStyles();

    const [title, setTitle] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [content, setContent] = useState("");

    // Clear input after discussion is saved
    // const clear = () => {
    //     setTitle("");
    //     setContent("");
    //     setSelectedTopic("");
    // };

    const handleCreate = () => {
        if (!config.currentlyLoggedUsername) {
            alert("Please log in first!");
            return;
        }

        const lat = props.lat;
        const lng = props.lng;
        const votes = 0;
        const timestamp = getCurrentDate();

        createDiscussion(title, selectedTopic, content, votes, lat, lng, timestamp)
            .then(response => {
                //clear();
                props.handleClose(response.data);
            }).catch((err) => {
                console.log(err);
            });
    };
    
    const getCurrentDate = () =>{

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        let minute = newDate.getMinutes();
        let seconds = newDate.getSeconds();

        return (date + '-' + month + '-' + year + '/' + hours + ':' + minute + ':' + seconds)
        }

    const handleCancel = () => {
        //clear();
        props.handleClose();
    };

    const onChangeContent = (event) => {
        setContent(event.target.value);
    };

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const selectTopic = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <Grid container className={classes.root} justify="center">
            <Grid item xs={12} className={classes.element}>
                <Typography variant="h6" align="center" gutterBottom>
                    Create a discussion
                </Typography>
                <Divider />
                <Typography variant="caption" gutterBottom>
                    Currently at ({props.lat.toFixed(6)}, {props.lng.toFixed(6)})
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <TextField
                    value={title}
                    onChange={onChangeTitle}
                    className={classes.titleField}
                    id="outlined-margin-none"
                    placeholder="Your Title."
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <Typography variant="h6" className={classes.title} align="center" gutterBottom>
                    Select a Topic
                </Typography>
                <Divider />
                <Box display="flex" justifyContent="center">
                    <Box p={1}>
                        <Topic onClick={selectTopic} type={'Request'} picked={selectedTopic === 'Request'} />
                    </Box>
                    <Box p={1}>
                        <Topic onClick={selectTopic} type={'Nature'} picked={selectedTopic === 'Nature'} />
                    </Box>
                    <Box p={1}>
                        <Topic onClick={selectTopic} type={'Walking'} picked={selectedTopic === 'Walking'} />
                    </Box>
                    <Box p={1}>
                        <Topic onClick={selectTopic} type={'Photo'} picked={selectedTopic === 'Photo'} />
                    </Box>
                    <Box p={1}>
                        <Topic onClick={selectTopic} type={'Hint'} picked={selectedTopic === 'Hint'} />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <Typography variant="h6" className={classes.title} gutterBottom>
                    Enter text | content
                </Typography>
                <Divider />
                <TextField
                    className={classes.contentField}
                    value={content}
                    onChange={onChangeContent}
                    multiline
                    rows={'10'}
                    variant="outlined"
                    placeholder="Enter Text..."
                    InputProps={{ inputProps: { rowsMax: 15 } }}
                />
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <Box display="flex" justifyContent="center">
                    <Button
                        onClick={handleCancel}
                        className={classes.button}
                        variant="contained"
                        color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className={classes.button}
                        variant="contained"
                        color="primary">
                        Confirm
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}