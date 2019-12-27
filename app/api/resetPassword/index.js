import axios from 'axios'

const SERVER_URL = 'http://localhost:4000/api'
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json; charset=utf-8'
    }
};

const resetPasswordApi = (data) => {
    return axios.post(`${SERVER_URL}/user`, data, config)
}

const userData = () => {
    return axios.get(`${SERVER_URL}/user`, config)
}

export {
    resetPasswordApi,
    userData
}