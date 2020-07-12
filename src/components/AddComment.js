import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';
import { addComment, getCommentsByDiscussionId } from "../services/CommentService";
import SendIcon from '@material-ui/icons/Send';

const config = require("../services/ConfigService");

const useStyles = makeStyles((theme) => ({
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

    icon: {
        float: 'left',
    },
    user: {
        background: '#62AEBB',
        height: '5vh',
        width: '8vw',
        borderRadius: theme.shape.borderRadius,
        color: "white",
        fontSize: 20,
        /*textAlign: 'center',*/
        float: 'left',
    },


    identifier: {
        fontSize: 15,
        color: '#706666',
        float: 'left',
        marginBottom: "2%"
        /* margin: theme.spacing(0,0.5),*/
    },


    image: {
        background: "black",
        /*margin:  theme.spacing(2,4),*/
        width: '90%',
        height: '30vh',
        float: 'left',
        color: "white",
        marginTop: "2.5%",
        borderRadius: theme.shape.borderRadius,
    },
    comment: {
        background: '#62AEBB',
        textTransform: 'none',
        textAlign: "left",
        flexGrow: 1,
        marginTop: "2%",
        borderRadius: theme.shape.borderRadius,
        color: "black",
        fontSize: 15,
        float: "left",
        minHeight: "content",
        height: "auto",
        padding: "10px",
        minWidth: "60%",
        maxWidth: "content"
    },

    newComment: {
        minHeight: "10%",
        float: "left",
        color: "white",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        width: "80%",
        marginTop: "2%",
        background: "white",
    },

    post: {
        float: 'left',
        marginTop: "2%",
        marginLeft: "2.5%",
        width: '3vw',
        height: '6vh',
        [theme.breakpoints.down('sm')]: {
            width: '3vw',
            height: '3vh',
            fontSize: '65%'
        },
    },
    comments: {
        height: "320px", // used fixed values, otherwise overflow doesnt work
        width: "90%",
        overflow: "auto",
        float: "left",
    },

}));

export default function AddComment(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState(false);
    const [user, setUser] = useState("User123");
    const [commentContent, setCommentContent] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);
    //const [discussionId, setDiscussionId] = React.useState("5f02287ae89b7281eabbff57");
    const [voted, setVote] = useState("");

    const onChangeContent = (event) => {
        setCommentContent(event.target.value);
    };

    console.log(props.discussionId);
    // Fetch comments from the backend
    const loadComments = useCallback(() => {
        getCommentsByDiscussionId(props.discussionId)
            .then(({data}) => {
                console.log(data);
                setCommentList(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // The comments are loaded initially
    useEffect(() => {
        loadComments();
    }, [loadComments]);

    // TODO change
    function handleSubmit() {
        //event.preventDefault();
        addComment(config.currentlyLoggedUsername, commentContent, 0, props.discussionId)
            .then((response) => {
                // Reload the comments also the new one
                loadComments();
                console.log('Comment created');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function Comment(props) {
        return (
            <div className={classes.comment}>
                <span style={{fontWeight: "bold"}}>{props.username} :  </span>
                <span>{props.commentcontent}</span>
            </div>
        );
    }

    function CommentList(props) {
        return (
            <div>
                {props.commentlist.map(c => <Comment username={c.username} commentcontent={c.content}/>)}
            </div>
        );
    }

    return (
        <Grid container>
            <Grid item xs={12} className={classes.element}>
                <div className={classes.comments}>
                    <CommentList commentlist={commentList}/>
                </div>
            </Grid>

            <Grid item xs={12} className={classes.element}>
                <TextField
                    onChange={onChangeContent}
                    className={classes.newComment}
                    id="outlined-margin-none"
                    placeholder="Your Comment."
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                />
                <Button onClick={() => {handleSubmit();}} size="large" variant="contained" color="primary" className={classes.post}>
                    <SendIcon />
                </Button>
            </Grid>
        </Grid>
    );


}