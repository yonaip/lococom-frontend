import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, IconButton } from '@material-ui/core';
import { addComment, getCommentsByDiscussionId } from "../services/CommentService";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import EmojiPicker from "./EmojiPicker";

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
        float: "left",
        color: "white",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        width: "80%",
        background: "white",
    },

    post: {
        float: 'left',
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
    const [commentContent, setCommentContent] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        if(showPicker) {
            setShowPicker(false);
        } else {
            setShowPicker(true);
        }
    };

    const handleEmojiSelect = (emoji) => {
        console.log(emoji);
        setCommentContent(`${commentContent}${emoji.native}`);
        togglePicker();
    };

    const onChangeContent = (event) => {
        setCommentContent(event.target.value);
    };

    function clear() {
        setCommentContent("");
    }

    console.log(props.discussionId);
    // Fetch comments from the backend
    function loadComments() {
        getCommentsByDiscussionId(props.discussionId)
            .then(({data}) => {
                console.log(data);
                setCommentList(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Send message on enter
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

    // The comments are loaded initially
    useEffect(() => {
        loadComments();
    }, [props.discussionId]);

    // TODO change
    function handleSubmit() {
        if(!config.currentlyLoggedUsername) {
            alert("Please log in first!");
            return;
        }

        addComment(config.currentlyLoggedUsername, commentContent, 0, props.discussionId)
            .then((response) => {
                // Reload the comments also the new one
                loadComments();
                console.log('Comment created');
                clear();
            })
            .catch((err) => {
                console.error(err);
            });
    }

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

            {showPicker && <EmojiPicker handleEmojiSelect={handleEmojiSelect}/>}
            <Grid item xs={12} className={classes.element}>
                <TextField
                    value={commentContent}
                    onChange={onChangeContent}
                    className={classes.newComment}
                    id="outlined-margin-none"
                    placeholder="Type your comment here..."
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePicker} edge="end">
                                    <SentimentSatisfiedRoundedIcon fontSize="inherit"/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button onClick={handleSubmit}>
                    <SendIcon fontSize="large" color="primary"/>
                </Button>
            </Grid>
        </Grid>
    );


}