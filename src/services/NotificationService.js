import axios from "axios";

const config = require("./ConfigService");

const getNotifications = async() => {
    const response = await axios.get('api/notification', {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

export {
    getNotifications
}