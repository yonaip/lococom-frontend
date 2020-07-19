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
const createDiscussion = async (title, topic, content, votes, lat, lng, timestamp) => {
    const response = await axios.post('api/discussion', {
        "title": title,
        "topic": topic,
        "content": content,
        "votes": votes,
        "lat": lat,
        "lng": lng,
        "timestamp": timestamp
    }, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });

    return response;
};
//get discussion object from id
const getDiscussion = async (discussionID) => {
    const response = await axios.get('/api/discussion/' + discussionID);
    return response;
}
//gets all existing discussions
const getAllDiscussions = async () => {
    const response = await axios.get('/api/discussion');
    return response;
}
//upvotes discussion
const upVoteDiscussion = async (discussionID) => {
    const response = await axios.put(`/api/discussion/${discussionID}/upvote/`,
        {}, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}
//downvotes discussion
const downVoteDiscussion = async (discussionID) => {
    const response = await axios.put(`/api/discussion/${discussionID}/downvote/`,
        {}, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}
//deletes Discussion
const deleteDiscussion = async (discussionID) => {
    const response = await axios.delete(`/api/discussion/${discussionID}`, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    })
    return response;

}

export {
    createDiscussion,
    getDiscussion,
    upVoteDiscussion,
    downVoteDiscussion,
    getAllDiscussions,
    deleteDiscussion
}