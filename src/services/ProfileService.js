import axios from "axios";

const config = require("./ConfigService");


async function getCommentProfile(profile) {
    let url = "/api/comment/CommentProfile/" + profile
    const response = await axios.get(url)
    return response;
}

async function getUser(profile) {
    let url = "/api/user/" + profile
    const response = await axios
        .get(url)
    return response;
}


const getDiscussions = async (discussionids) => {
    try {
        var i;
        var arrayresult = [];
        for (i = 0; i < discussionids.length; i++) {
            arrayresult.push(
                await axios.get("/api/discussion/" + discussionids[i]))

        }
        return arrayresult;
    }
    catch{ }
}

const getNames = async (idlist) => {
    try {
        var i;
        var arrayresult = [];
        for (i = 0; i < idlist.length; i++) {
            arrayresult.push(
                await axios.get("/api/user/id/" + idlist[i]))

        }
        return arrayresult;
    }
    catch{ }
}

const getName = async (id) => {
    const response = await axios.get("/api/user/id/" + id)
    console.log(response);
    return response
}

const deleteFriend = async (profile) => {
    let url = "/api/user/" + profile
    axios
        .get(url, )
        .then(({ data }) => {
            axios.put('/api/user/removeFriend', {
                "username": config.currentlyLoggedUsername,
                "friend": data._id
            },{
                headers: { Authorization: "Bearer " + config.jwtToken }
            });
        });
}

const addFriend = async (friend) => {
    axios
        .post('/api/user/friendlist/', friend ,{
            headers: { Authorization: "Bearer " + config.jwtToken }
        })
        .then(response => {
            alert('Friend added');
        })
        .catch(err => {
            alert('Friend not found');
            console.error(err);
        });
}
async function getDiscussion(discussionID) {
    const response = await axios.get('/api/discussion/' + discussionID);
    return response;
}

async function getAllDiscussions() {
    const response = await axios.get('/api/discussion');
    return response;
}

async function upVoteDiscussion(discussionID) {
    const response = axios.put('/api/discussion/upvote/' + discussionID);
    return response;
}

async function downVoteDiscussion(discussionID) {
    const response = axios.put('/api/discussion/downvote/' + discussionID);
    return response;
}

export {
    getCommentProfile,
    getUser,
    getDiscussions,
    getNames,
    deleteFriend,
    addFriend,
    getName
}