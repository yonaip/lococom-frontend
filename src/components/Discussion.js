import React, { useState, useCallback, useEffect } from "react";
import { ButtonBase, Grid, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {makeStyles} from "@material-ui/core/styles";
import requestimg from "../resources/request.png";
import walkerimg from "../resources/shoes.png";
import natureimg from "../resources/nature.png";
import photoimg from "../resources/photograph.png";
import alertimg from "../resources/alert.png";
import AddComment from "./AddComment";
import { getDiscussion, upVoteDiscussion, downVoteDiscussion } from "../services/DiscussionService";

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#CAE2E5',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
        flexGrow: 1,
    },

    element: {
        position: 'relative',
        justifyContent: 'inherit',
    },

    text: {
        color: "black",
        textAlign: 'left',
        padding: theme.spacing(1),
        flexGrow: 2,
        marginBottom: "2%"
    },

    topic: {
        width: 60,
        height: 60,
        float: 'left',
        margin: theme.spacing(1,3),
    },

    ratingNumber: {
        color: '#706666',
        textAlign: 'center',

    },

    ratingBlock: {
        float: 'left',

    },

    notRated: {
        color: "#FFFFFFF",
    },

    Rated: {
        color: "blue",
    },

    discussionContent: {
        background: "black",
        /*margin:  theme.spacing(2,4),*/
        width: '90%',
        height: '30vh',
        float: 'left',
        color: "white",
        marginTop: "2.5%",
        borderRadius: theme.shape.borderRadius,
    },

    topicIcon: {
        height: "10%",
        width: "10%",
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
    const [commentList, setCommentList] = useState([]);
    const [userHasVotedPositive, setUserHasVotedPositive] = useState(false);
    const [userHasVotedNegative, setUserHasVotedNegative] = useState(false);
    const [user, setUser] = useState("User123");

    // TODO: Add backend endpoint for users (creatorId)
    const loadDiscussion = useCallback(() => {
        getDiscussion(props.discussionId)
            .then(({data}) => {
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
    });

    // The discussion are loaded initially
    useEffect(() => {
        loadDiscussion();
    }, [loadDiscussion]);

    function handleUpVoteDiscussion() {
        if (!userHasVotedPositive & !userHasVotedNegative){
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
        if (!userHasVotedNegative & !userHasVotedPositive){
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
    if(topic === 'Nature') {
        topicIcon = (
            <img alt='nature' src={natureimg} className={classes.topicIcon}/>
        );
    } else if(topic === 'Request') {
        topicIcon = (
            <img alt='request' src={requestimg} className={classes.topicIcon}/>
        );
    } else if(topic === 'Walking') {
        topicIcon = (
            <img alt='walking' src={walkerimg} className={classes.topicIcon}/>
        );
    } else if(topic === 'Photo') {
        topicIcon = (
            <img alt='photo' src={photoimg} className={classes.topicIcon}/>
        );
    } else if(topic === 'Hint') {
        topicIcon = (
            <img alt='hint' src={alertimg} className={classes.topicIcon}/>
        );
    }

    return (
        <Grid container className={classes.root} justify="space-around">
            <Grid container className={classes.element}>
                <Grid item xs={10} >
                    <ButtonBase>
                        {topicIcon}
                        <Typography variant="h6" className={classes.text}>
                            Posted by {creator} <br/> {title}
                        </Typography>
                    </ButtonBase>
                </Grid>

                <Grid item xs={2} >
                    <div className={classes.ratingBlock}>
                        <KeyboardArrowUpIcon onClick={handleUpVoteDiscussion} className={userHasVotedPositive ? classes.Rated : classes.notRated}/>
                        <div className={classes.ratingNumber}  style={{ fontWeight: "bold" }}>
                            {ratingNum}
                        </div>
                        <KeyboardArrowDownIcon onClick={handleDownVoteDiscussion} className={userHasVotedNegative ? classes.Rated : classes.notRated}/>
                    </div>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <div
                    className={classes.discussionContent}> {content}
                </div>
            </Grid>

            <AddComment discussionId={props.discussionId}/>
        </Grid>
    );
}