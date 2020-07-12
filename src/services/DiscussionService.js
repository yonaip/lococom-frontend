import axios from "axios";

/**
 * Creates discussion
 * @param title
 * @param content
 * @param topic
 * @param username
 * @param votes
 * @param lat
 * @param lng
 */
async function createDiscussion(username, title, topic, content, votes, lat, lng) {
    const response = await axios.post('api/discussion', {
        "username": username,
        "title": title,
        "topic": topic,
        "content": content,
        "votes": votes,
        "lat": lat,
        "lng": lng
    });

    return response;
};

async function getDiscussion(discussionID) {
    const response = await axios.get('/api/discussion/' + discussionID);
    return response;
}

async function getAllDiscussions() {
    const response = await axios.get('/api/discussion');
    return response;
}

async function upVoteDiscussion(discussionID) {
    const response = axios.put( '/api/discussion/upvote/' + discussionID);
    return response;
}

async function downVoteDiscussion(discussionID) {
    const response = axios.put( '/api/discussion/downvote/' + discussionID);
    return response;
}

export {
    createDiscussion,
    getDiscussion,
    upVoteDiscussion,
    downVoteDiscussion,
    getAllDiscussions
}