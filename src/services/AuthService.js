/** 
 *  Contains functions for authorization
 */
import axios from "axios";

const config = require("./ConfigService");

/**
 * Logs the user in
 * @param username 
 * @param password
 */
async function loginUser(username, password) {
    const response = await axios.post('auth/login', {
        "username": username,
        "password": password
    });

    config.currentlyLoggedUsername = username;
    config.jwtToken = response.data.token;

    return response;
}

/**
 * Logs the user in
 * @param username 
 * @param password
 */
async function registerUser(username, password, email) {
    const response = await axios.post('auth/register', {
        "username": username,
        "password": password,
        "email": email
    });

    config.currentlyLoggedUsername = username;
    config.jwtToken = response.data.token;

    return response;
}

async function me() {
    const response = await axios.get('auth/me', {
        headers: { Authorization: "Bearer " + config.jwtToken }
    });
    return response;
}

export {
    loginUser, registerUser, me
}