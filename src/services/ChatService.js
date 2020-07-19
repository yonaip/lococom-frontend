import axios from "axios";

const config = require("./ConfigService");

async function addChatComment(username, content, targetUser) {

    const getCurrentDate = () =>{

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        let minute = newDate.getMinutes();
        let seconds = newDate.getSeconds();

        return (date + '-' + month + '-' + year + '/' + hours + ':' + minute + ':' + seconds)
    }

    const timestamp = getCurrentDate();

    const response = await axios.post(`/api/chat/${targetUser}/comment`, {
        "username": username,
        "content": content,
        "timestamp": timestamp
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