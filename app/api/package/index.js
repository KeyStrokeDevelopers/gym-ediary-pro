import axios from 'axios'

const SERVER_URL = 'http://localhost:4000/api'
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json; charset=utf-8',
    }
};

const addPackageApi = (data) => {
    return axios.post(`${SERVER_URL}/package`, data, config)
}

const getPackageApi = () => {
    return axios.get(`${SERVER_URL}/package`, config)
}

export {
    addPackageApi,
    getPackageApi
}