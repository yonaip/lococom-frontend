import axios from "axios";

async function addComment(username, content, votes, discussionId) {
    const response = await axios.post('/api/comment', {
        "username": username,
        "content": content,
        "votes": votes,
        "discussionId": discussionId
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