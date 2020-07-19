import axios from "axios";

const config = require("./ConfigService");
//adds new Comment
async function addComment(username, content, votes, discussionId, timestamp) {
    const response = await axios.post('/api/comment', {
        "username": username,
        "content": content,
        "votes": votes,
        "discussionId": discussionId,
        "timestamp": timestamp
    }, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });

    return response;
};
//gets all comments from one discussion
async function getCommentsByDiscussionId(discussionId) {
    const response = await axios.get('/api/comment/' + discussionId);
    return response;
}
//deletes Comment
async function deleteComment(id) {
    const url = "/api/comment/" + id
    const response = await axios.delete(url, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    })
    return response;
}

export {
    addComment,
    getCommentsByDiscussionId,
    deleteComment
}