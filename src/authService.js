const axios = require('axios');
const qs = require('qs');


const authenticate = async () => {

    const data = qs.stringify({
        'username': process.env.USERNAME,
        'password': process.env.PASSWORD,
        'grant_type': 'password'
    });
    const config = {
        method: 'post',
        url: `${process.env.API_URL}/${process.env.ACCOUNT_NAME}/oauth2/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
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
    authenticate,
}