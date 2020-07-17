import axios from "axios";

const config = require("./ConfigService");

async function addComment(username, content, votes, discussionId) {
    const response = await axios.post('/api/comment', {
        "username": username,
        "content": content,
        "votes": votes,
        "discussionId": discussionId
    }, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });

    return response;
};

async function getCommentsByDiscussionId(discussionId) {
    const response = await axios.get('/api/comment/' + discussionId);
    return response;
}

export {
    addComment,
    getCommentsByDiscussionId
}