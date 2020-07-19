import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, Divider, DialogActions, TextField, Button, Box, InputAdornment, IconButton } from "@material-ui/core";
import { getChatComments, addChatComment } from "../services/ChatService";
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import SendIcon from '@material-ui/icons/Send';
import CommentSection from "./discussion/CommentSection";

const config = require("../services/ConfigService");


const useStyles = makeStyles((theme) => ({
    footerElement: {
        margin: theme.spacing(1),
    },

    inputField: {
        flexGrow: 1
    },
}));

export default function ChatDialog(props) {

    const classes = useStyles();

    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    // Fetch comments from the backend
    const loadComments = async (targetUser) => {
        try {
            const comments = await getChatComments(targetUser);
            setComments(comments.data);
        } catch (err) {
            console.log(err);
        }
    }

    // The discussion are loaded initially
    useEffect(() => {
        loadComments(props.targetUser);
    }, [props.targetUser, comments]);

    const handleClose = () => {
        props.handleClose()
    }

    const handleSubmit = () => {
        addChatComment(config.currentlyLoggedUsername, commentContent, props.targetUser);
        setCommentContent("");
        loadComments();
    }

    const handleCommentContentChange = (event) => {
        if(commentContent !==  event.target.value) {
            setCommentContent(event.target.value);
        }
    }

    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Chat with {props.targetUser}</DialogTitle>
            <DialogContent>
                <CommentSection comments={comments}/>
                <Divider />
                <Box>
                    <TextField
                        value={commentContent}
                        onChange={handleCommentContentChange}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}