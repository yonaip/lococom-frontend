import axios from "axios";

const config = require("./ConfigService");

//gets every Comment from profile
async function getCommentProfile(profile) {
    let url = "/api/comment/CommentProfile/" + profile
    const response = await axios.get(url)
    return response;
}
//get user object from profile
async function getUser(profile) {
    let url = "/api/user/" + profile
    const response = await axios
        .get(url)
    return response;
}

//get discussion objects from discussion ids
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
//get username from user ids
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
//get single username from id
const getName = async (id) => {
    const response = await axios.get("/api/user/id/" + id)
    console.log(response);
    return response
}
//deletes friend from friendslist from loggenin user
const deleteFriend = async (profile) => {
    axios.delete(`/api/user/friendlist/${username}`, {}, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    })
        .then(response => {
            alert('Friend removed');
        })
        .catch(err => {
            alert('Friend not found');
            console.error(err);
        });
}
//adds friend to friendslist from loggedin user
const addFriend = async (friend) => {
    axios
        .post('/api/user/friendlist/', friend, {
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


export {
    getCommentProfile,
    getUser,
    getDiscussions,
    getNames,
    deleteFriend,
    addFriend,
    getName
}