import axios from "axios";

const config = require("./ConfigService");

const getNotifications = async() => {
    const response = await axios.get('/api/notification', {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

const deleteNotification = async(notificationId) => {
    const response = await axios.delete(`/api/notification/${notificationId}`, {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

export {
    getNotifications, deleteNotification
}