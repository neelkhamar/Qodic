const axios = require("axios");

const APIHandler = async (options) => {
    try {
        let response = await axios.request(options);
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = APIHandler;