import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    root: {
        margin: theme.spacing(1),
        borderRadius: "15px",
        border: "1px solid #dfe6e3",
    },

    list: {
        display: "block",
        position: 'relative',
        overflow: 'auto',
        maxHeight: "27vh"
    },

    listItem: {
        border: "1px"
    },

    element: {
        position: 'relative',
        justifyContent: 'inherit',
        flexGrow: 2
    },

    footer: {
        bottom: 0,
        position: 'relative',
    },

}));

export default function CommentSection(props) {
    const classes = useStyles();
    //const [showPicker, setShowPicker] = useState(false);

    //console.log(props.discussionId); 5f107b7eac00571098e2348e

    // Fetch comments from the backend
    // const togglePicker = () => {
    //     if (showPicker) {
    //         setShowPicker(false);
    //     } else {
    //         setShowPicker(true);
    //     }
    // };

    // const handleEmojiSelect = (emoji) => {
    //     console.log(emoji);
    //     setCommentContent(`${commentContent}${emoji.native}`);
    //     togglePicker();
    // };

    return (
        <Box component="div" className={classes.root}>
            <List className={classes.list}>
            {/*commentlist.map(c => <Comment username={c.username} commentcontent={c.content} />)*/
                props.comments.map((comment, i) =>
                    <ListItem key={i} dense={true}>
                        <ListItemText primary={comment.content} 
                            secondary={`Created by ${comment.username}`}
                            divider={true} />
                    </ListItem>
                )
            }
            </List>
        </Box>
    );

    /* {showPicker && <EmojiPicker handleEmojiSelect={handleEmojiSelect} />} */
    /* <Grid item xs={12} className={classes.footer}>
                <TextField
                    value={commentContent}
                    onChange={onChangeContent}
                    className={classes.newComment}
                    id="outlined-margin-none"
                    placeholder="Type your comment here..."
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePicker} edge="end">
                                    <SentimentSatisfiedRoundedIcon fontSize="inherit" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button onClick={handleSubmit}>
                    <SendIcon fontSize="large" color="primary" />
                </Button>
            </Grid> */
}