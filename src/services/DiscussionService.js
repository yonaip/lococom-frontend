import axios from "axios";

const config = require("./ConfigService");

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
const createDiscussion = async(title, topic, content, votes, lat, lng) => {
    const response = await axios.post('api/discussion', {
        "title": title,
        "topic": topic,
        "content": content,
        "votes": votes,
        "lat": lat,
        "lng": lng
    }, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });

    return response;
};

const getDiscussion = async(discussionID) => {
    const response = await axios.get('/api/discussion/' + discussionID);
    return response;
}

const getAllDiscussions = async() => {
    const response = await axios.get('/api/discussion');
    return response;
}

const upVoteDiscussion = async(discussionID) => {
    const response = await axios.put( `/api/discussion/${discussionID}/upvote/`, 
    {}, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

const downVoteDiscussion = async(discussionID) => {
    const response = await axios.put( `/api/discussion/${discussionID}/downvote/`,
    {}, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

export {
    createDiscussion,
    getDiscussion,
    upVoteDiscussion,
    downVoteDiscussion,
    getAllDiscussions
}