import axios from "axios";

const config = require("./ConfigService");

async function addChatComment(username, content, targetUser) {
    const response = await axios.post(`/api/chat/${targetUser}/comment`, {
        "username": username,
        "content": content,
    }, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });

    return response;
};

async function getChatComments(targetUser) {
    const response = await axios.get(`/api/chat/${targetUser}/comment`, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

export {
    addChatComment,
    getChatComments
}