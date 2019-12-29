import axios from 'axios'

const SERVER_URL = 'http://localhost:4000/api'
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json; charset=utf-8',
    }
};

const addBankApi = (data) => {
    return axios.post(`${SERVER_URL}/bank`, data, config)
}

const getBankApi = () => {
    return axios.get(`${SERVER_URL}/bank`, config)
}

export {
    addBankApi,
    getBankApi
}