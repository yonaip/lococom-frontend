import React from "react";
import axios from 'axios';
import {Button, ButtonBase, Grid, Typography, Paper} from "@material-ui/core";
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

    icon: {
        float: 'left',
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

export default function Discussion() {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [topic, setTopic] = React.useState("");
    const [creator, setCreator] = React.useState("");
    const [discussionId, setDiscussionId] = React.useState("");
    const [ratingNum, setRatingNum] = React.useState("0");
    const [commentList, setCommentList] = React.useState([]);
    const [voted, setVote] = React.useState("");
    const [user, setUser] = React.useState("User123");


    const loadDiscussion = React.useCallback(() => {
        const temp = "5f02287ae89b7281eabbff57" // placeholder, need to add ID from the discussion
        const url = '/api/discussion/' + temp;
        axios
            .get(url)
            .then(({data}) => {
                console.log(data);
                setTitle(data.title);
                setContent(data.content);
                setTopic(data.topic);
                setCreator(data.username);
                setDiscussionId(data._id);
                setRatingNum(data.votes);
            });
    });

    // The discussion are loaded initially
    React.useEffect(() => {
        loadDiscussion();
    }, [loadDiscussion]);

    const upVoteDiscussion = (event) => {
        if (voted === ""){
            const url = "/api/discussion/upvote/" + discussionId
            axios.put(url);
            setVote("Yes");

        }
        loadDiscussion();
    }

    const downVoteDiscussion = (event) => {
        if (voted === ""){
            const url = "/api/discussion/downvote/" + discussionId
            axios.put(url);
            setVote("No");
        }
        loadDiscussion();
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
            <Grid item xs={12} className={classes.element}>
                <ButtonBase>
                    <AccountCircleIcon className={classes.icon} color="disabled" style={{ fontSize: 65 }}/>
                    <Typography variant="h6" className={classes.text}>
                        {user}
                    </Typography>
                </ButtonBase>
            </Grid>

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
                        <KeyboardArrowUpIcon onClick={upVoteDiscussion} className={voted === 'Yes' ? classes.Rated : classes.notRated}/>
                        <div className={classes.ratingNumber}  style={{ fontWeight: "bold" }}>
                            {ratingNum}
                        </div>
                        <KeyboardArrowDownIcon onClick={downVoteDiscussion} className={voted === 'No' ? classes.Rated : classes.notRated}/>
                    </div>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <div
                    className={classes.discussionContent}> {content}
                </div>
            </Grid>

            <AddComment/>
        </Grid>
    );
}