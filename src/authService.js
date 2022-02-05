const fetch = require('node-fetch');
const {Headers} = fetch;

const authenticate = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", process.env.USERNAME);
    urlencoded.append("password", process.env.PASSWORD);
    urlencoded.append("grant_type", "password");

    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
        redirect: 'follow'
    };

    let response
    try {
        response = await fetch(`${process.env.API_URL}/${process.env.ACCOUNT_NAME}/oauth2/token`, requestOptions)
    } catch (error) {
        throw error
    }
    return await response.json()
}

module.exports = {
    authenticate,
}
// const data = qs.stringify({
//     'username': process.env.USERNAME,
//     'password': process.env.PASSWORD,
//     'grant_type': 'password'
// });
// const config = {
//     method: 'post',
//     url: `${process.env.API_URL}/${process.env.ACCOUNT_NAME}/oauth2/token`,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: data
// };
// let response
// try {
//     response = await axios(config)
// } catch (error) {
//     throw error
// }
// return response.data
