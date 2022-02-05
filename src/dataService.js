const axios = require('axios');
const {getTodayISO} = require('./helpers');

const fetchResponseList = async (token, surveyId) => {
    const status = 'completed'
    const today = getTodayISO()
    const config = {
        method: 'get',
        url: `${process.env.API_URL}/${process.env.ACCOUNT_NAME}/surveys/${surveyId}/responses/?min_started_date=${today}&status=${status}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    let response
    try {
        response = await axios(config)
    } catch (error) {
        throw error
    }
    return response.data.items
}

const fetchResponse = async (token, responseId, surveyId) => {
    const config = {
        method: 'get',
        url: `${process.env.API_URL}/${process.env.ACCOUNT_NAME}/surveys/${surveyId}/responses/${responseId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    let response
    try {
        response = await axios(config)
    } catch (error) {
        throw error
    }
    return response.data
}


module.exports = {
    fetchResponseList,
    fetchResponse
}