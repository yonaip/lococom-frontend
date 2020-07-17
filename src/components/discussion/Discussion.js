import React, { useState, useCallback, useEffect } from "react";
import { Divider, Grid, Typography, TextField, Box, Paper } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import requestimg from "../../resources/request.png";
import walkerimg from "../../resources/shoes.png";
import natureimg from "../../resources/nature.png";
import photoimg from "../../resources/photograph.png";
import alertimg from "../../resources/alert.png";

import DoneOutline from "@material-ui/icons/DoneOutline";

import CommentSection from "./CommentSection";
import { getDiscussion, upVoteDiscussion, downVoteDiscussion } from "../../services/DiscussionService";

const useStyles = makeStyles((theme) => ({
    root: {
        top: 0,
        bottom: 0,
        height: "100%",
        padding: theme.spacing(1),
    },

    footerElement: {
        bottom: 0,
        position: 'relative',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },

    text: {
        textAlign: 'left',
    },

    topic: {
        float: 'left',
        margin: theme.spacing(1, 3),
    },

    ratingNumber: {
        color: '#706666',
        textAlign: 'center',

    },

    ratingBlock: {
        float: 'right',
    },

    notRated: {
        color: "#FFFFFFF",
    },

    Rated: {
        color: "blue",
    },

    contentField: {
        display: 'flex',
        padding: theme.spacing(1),
        background: "white",
        borderRadius: "5px",
        justifyContent: 'inherit',
    },

    topicIcon: {
        flexGrow: 1
    },
}));

export default function Discussion(props) {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [creator, setCreator] = useState("");
    const [discussionId, setDiscussionId] = useState("");
    const [ratingNum, setRatingNum] = useState("0");

    // const [discussion, setDiscussion] = useState(null);

    const [userHasVotedPositive, setUserHasVotedPositive] = useState(false);
    const [userHasVotedNegative, setUserHasVotedNegative] = useState(false);

    // TODO: Add backend endpoint for users (creatorId)
    const loadDiscussion = async (discussionId) => {
        getDiscussion(props.discussionId)
            .then(({ data }) => {
                console.log(data);
                setTitle(data.title);
                setContent(data.content);
                setTopic(data.topic);
                setCreator(data.username);
                setDiscussionId(data._id);
                setRatingNum(data.votes);
                //props.discussionId(null);
                console.log(props.discussionId);
            })
            .catch(err => console.log(err));
        // const discussion = await getDiscussion(discussionId);
        // setDiscussion(discussion);
    };

    // The discussion are loaded initially
    useEffect(() => {
        loadDiscussion();
    }, []);

    function handleUpVoteDiscussion() {
        if (!userHasVotedPositive && !userHasVotedNegative) {
            upVoteDiscussion(props.discussionId)
                .then((response) => {
                    loadDiscussion();
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                });
            setUserHasVotedPositive(true);
        }
    }

    function handleDownVoteDiscussion() {
        if (!userHasVotedNegative && !userHasVotedPositive) {
            downVoteDiscussion(props.discussionId)
                .then((response) => {
                    loadDiscussion();
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                });
            setUserHasVotedNegative(true);
        }
    }

    let topicIcon;
    if (topic === 'Nature') {
        topicIcon = (
            <img alt='nature' src={natureimg} className={classes.topicIcon} />
        );
    } else if (topic === 'Request') {
        topicIcon = (
            <img alt='request' src={requestimg} className={classes.topicIcon} />
        );
    } else if (topic === 'Walking') {
        topicIcon = (
            <img alt='walking' src={walkerimg} className={classes.topicIcon} />
        );
    } else if (topic === 'Photo') {
        topicIcon = (
            <img alt='photo' src={photoimg} className={classes.topicIcon} />
        );
    } else if (topic === 'Hint') {
        topicIcon = (
            <img alt='hint' src={alertimg} className={classes.topicIcon} />
        );
    }

    return (
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.root}>
            {/* Header of discussion. TODO: Add discussion topic */}
            {/* <Grid item xs={2}>
                <Grid container justify='left'>
                    <Grid item xs={2}>
                        <DoneOutline className={classes.topicIcon} />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" align="left">
                            {title}
                        </Typography>
                        <Typography variant="caption" className={classes.text}>
                            Posted by somebody
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                            <Grid item>
                                <KeyboardArrowUpIcon onClick={handleUpVoteDiscussion} className={userHasVotedPositive ? classes.Rated : classes.notRated} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" className={classes.text}>
                                    {ratingNum}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <KeyboardArrowDownIcon onClick={handleDownVoteDiscussion} className={userHasVotedNegative ? classes.Rated : classes.notRated} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </Grid>

            <Grid item xs={4} className={classes.element}>
                <TextField
                    className={classes.contentField}
                    value={content}
                    multiline
                    disable={true}
                    variant="outlined"
                    placeholder="Enter Text..."
                    InputProps={{ inputProps: { rowsMax: 15 } }}
                />
            </Grid>

            <Grid item xs={6} className={classes.element}>
                <CommentSection discussionId={props.discussionId} />
            </Grid> */}

            <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item xs={2}>
                        <Box>
                            <DoneOutline />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h6" align="left">
                            {title}
                        </Typography>
                        <Typography variant="caption" className={classes.text}>
                            Posted by somebody
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Grid container direction="column" justify="space-between" alignItems="center">
                            <Grid item>
                                <KeyboardArrowUpIcon onClick={handleUpVoteDiscussion} className={userHasVotedPositive ? classes.Rated : classes.notRated} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" align="center">
                                    {ratingNum}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <KeyboardArrowDownIcon onClick={handleDownVoteDiscussion} className={userHasVotedNegative ? classes.Rated : classes.notRated} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </Grid>

            <Grid item>
                <Typography variant="h6">
                    Placeholder
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="h6">
                    Placeholder
                </Typography>
            </Grid>
        </Grid>
    );
}