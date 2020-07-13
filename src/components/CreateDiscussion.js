import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Box } from '@material-ui/core';

import { createDiscussion } from "../services/DiscussionService";
import Topic from "./Topic";

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#CAE2E5',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        flexGrow: 1
    },

    element: {
        position: 'relative',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },

    title: {
        marginBottom: theme.spacing(0)
    },

    titleField: {
        background: "white",
        borderRadius: "5px",
        justifyContent: 'inherit',
        width: '90%',
        margin: theme.spacing(0),
    },

    contentField: {
        width: '90%',
        background: "white",
        borderRadius: "5px",
        margin: theme.spacing(0),
    },

    cancel: {
        float: 'left',
        margin: theme.spacing(1)
    },

    confirm: {
        float: 'center',
        margin: theme.spacing(1)
    },

    buttonBox: {
        float: 'center',
    }

}));

/** Component for creation of discussions
 * 
 * @param {*} props
 * @param {Number} props.lat
 * @param {Number} props.lng
 * @param {()} handleClose returns the id of the newly created discussion or nothing
 */
export default function CreateDiscussion(props) {

    const classes = useStyles();

    const [title, setTitle] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [content, setContent] = useState("");

    // Clear input after discussion is saved
    const clear = () => {
        setTitle("");
        setContent("");
        setSelectedTopic("");
    }

    const handleCreate = () => {
        if(!config.currentlyLoggedUsername) {
            alert("Please log in first!");
            return;
        }

        const username = config.currentlyLoggedUsername;
        const lat = props.lat;
        const lng = props.lng;
        const votes = 0;

        createDiscussion(username, title, selectedTopic, content, votes, lat, lng)
            .then(response => {
                clear();
                props.handleClose(response.data._id);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleCancel = () => {
        clear();
        //props.handleClose();
    }

    const onChangeContent = (event) => {
        setContent(event.target.value);
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const selectTopic = (topic) => {
        setSelectedTopic(topic);
    }

    return (
        <Grid container className={classes.root} justify="center">

            <Grid item xs={12} className={classes.element}>
                <Typography variant="h6" className={classes.title} gutterBottom>
                    Create a discussion
                </Typography>
                <Typography variant="caption" gutterBottom>
                    at ({props.lat.toFixed(6)}, {props.lng.toFixed(6)})
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
                <Typography variant="h6" className={classes.title} gutterBottom>
                    Select a Topic
                </Typography>
            </Grid>

            <Grid container xs={12} className={classes.element}>
                <Topic onClick={selectTopic} type={'Request'} picked={selectedTopic === 'Request'} />
                <Topic onClick={selectTopic} type={'Nature'} picked={selectedTopic === 'Nature'} />
                <Topic onClick={selectTopic} type={'Walking'} picked={selectedTopic === 'Walking'} />
                <Topic onClick={selectTopic} type={'Photo'} picked={selectedTopic === 'Photo'} />
                <Topic onClick={selectTopic} type={'Hint'} picked={selectedTopic === 'Hint'} />
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <Typography variant="h6" className={classes.title} gutterBottom>
                    Enter text | content
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.element}>
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
                <Box className={classes.buttonBox}>
                    <Button
                        onClick={handleCancel}
                        className={classes.cancel}
                        variant="contained"
                        color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className={classes.confirm}
                        variant="contained"
                        color="inherit">
                        Confirm
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}