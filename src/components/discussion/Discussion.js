import React, { useState, useCallback, useEffect } from "react";
import { Divider, Grid, Typography, TextField, Box, InputAdornment, IconButton, Button } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

import requestimg from "../../resources/request.png";
import walkerimg from "../../resources/shoes.png";
import natureimg from "../../resources/nature.png";
import photoimg from "../../resources/photograph.png";
import alertimg from "../../resources/alert.png";
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import SendIcon from '@material-ui/icons/Send';
import { getName } from "../../services//ProfileService";
import DoneOutline from "@material-ui/icons/DoneOutline";

import CommentSection from "./CommentSection";

import { getDiscussion, upVoteDiscussion, downVoteDiscussion } from "../../services/DiscussionService";
import { addComment, getCommentsByDiscussionId } from "../../services/CommentService";
import { me } from "../../services/AuthService";

const config = require("../../services/ConfigService");
 
const useStyles = makeStyles((theme) => ({
    root: {
        top: 0,
        bottom: 0,
        height: "100%",
        padding: theme.spacing(1),
    },

    footerElement: {
        margin: theme.spacing(1),
    },

    inputField: {
        flexGrow: 1
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

    topicicon: {
       
        float: "left",
        height: "60%",
        width: "60%",
        padding: "3px"
    },
}));

export default function Discussion(props) {
    const classes = useStyles();

    // Discussion states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [creator, setCreator] = useState("");
    const [userId, setUserId] = useState(null);
    const [ratingNum, setRatingNum] = useState("0");
    const [timestamp, setTimestamp] = useState("");

    // Voting states
    const [userHasVotedPositive, setUserHasVotedPositive] = useState(false);
    const [userHasVotedNegative, setUserHasVotedNegative] = useState(false);

    // Comment states
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    /** Loads discussion
     * 
     * @param {*} discussionId 
     */
    const loadDiscussion = async (discussionId) => {
        try {
            const {data} = await getDiscussion(discussionId);
            setTitle(data.title);
            setContent(data.content);
            setTopic(data.topic);
            getName(data.creatorId).then(({ data }) => setCreator(data.username));
            setRatingNum(data.votes);
            setTimestamp(data.timestamp);

            // Check if the user has voted
            if(config.jwtToken) {
                const {_id} = (await me()).data;
                if(data.upvoters.includes(_id)) {
                    setUserHasVotedPositive(true);
                } else if(data.downvoters.includes(_id)) {
                    setUserHasVotedNegative(true);
                }
                setUserId(_id);
            }
        } catch(err) {
            console.log(err);
        }
    };

    // Fetch comments from the backend
    const loadComments = async (discussionId) => {
        try {
            const comments = await getCommentsByDiscussionId(props.discussionId);
            setComments(comments.data);
        } catch (err) {
            console.log(err);
        }
    }

    // The discussion are loaded initially
    useEffect(() => {
        loadDiscussion(props.discussionId);
        loadComments(props.discussionId);
    }, [props.discussionId]);

    // Register listener on enter
    useEffect(() => {
        const listener = e => {
            if (e.key === "Enter" && config.currentlyLoggedUsername) {
                handleSubmit();
            }
        };

        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    });

    const handleUpVoteDiscussion = async() => {
        // Prerequisites
        if(!config.jwtToken) {
            alert("Please login first!");
            return;
        }
        if(userHasVotedPositive) {
            return;
        }

        const {votes} = (await upVoteDiscussion(props.discussionId)).data;
        setUserHasVotedPositive(true);
        setUserHasVotedNegative(false);
        setRatingNum(`${votes}`);
    }

    const handleDownVoteDiscussion = async() => {
        if(!config.jwtToken) {
            alert("Please login first!");
            return;
        }

        if(userHasVotedNegative) {
            return;
        }

        const {votes} = (await downVoteDiscussion(props.discussionId)).data;
        setUserHasVotedPositive(false);
        setUserHasVotedNegative(true);
        setRatingNum(`${votes}`);
    }

    const onCommentContentChange = (event) => {
        setCommentContent(event.target.value);
    }
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

    const handleSubmit = async() => {
        if (!config.currentlyLoggedUsername) {
            alert("Please log in first!");
            return;
        }

        try {
            const timestamp = getCurrentDate();
            await addComment(config.currentlyLoggedUsername, commentContent, 0, props.discussionId, timestamp);
            loadComments();
            setCommentContent("");
        } catch(err) {
            console.log(err);
        }  
    }

    let topicIcon;
    if (topic === 'Nature') {
        topicIcon = (
            <img alt='nature' src={natureimg} className={classes.topicicon} />
        );
    } else if (topic === 'Request') {
        topicIcon = (
            <img alt='request' src={requestimg} className={classes.topicicon} />
        );
    } else if (topic === 'Walking') {
        topicIcon = (
            <img alt='walking' src={walkerimg} className={classes.topicicon} />
        );
    } else if (topic === 'Photo') {
        topicIcon = (
            <img alt='photo' src={photoimg} className={classes.topicicon} />
        );
    } else if (topic === 'Hint') {
        topicIcon = (
            <img alt='hint' src={alertimg} className={classes.topicicon} />
        );
    }

    return (
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.root}>
            <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item xs={2}>
                        <Box>
                            {topicIcon}
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h6" align="left">
                            {title}
                        </Typography>
                        <Typography variant="caption" className={classes.text}>
                            Posted by {creator}
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
                <TextField
                    className={classes.contentField}
                    value={content}
                    helperText={`Created at ${timestamp}`} //TODO
                    multiline
                    disable={true}
                    variant="outlined"
                />
                <CommentSection comments={comments} userId={userId}/>
            </Grid>

            <Grid item>
                <Divider />
                <Box className={classes.footerElement}>
                    <TextField
                        value={commentContent}
                        onChange={onCommentContentChange}
                        className={classes.inputField}
                        id="outlined-margin-none"
                        placeholder="Type your comment here..."
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => {}} edge="end">
                                        <SentimentSatisfiedRoundedIcon fontSize="inherit" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button onClick={handleSubmit}>
                        <SendIcon fontSize="large" color="primary" />
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}