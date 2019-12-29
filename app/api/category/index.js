import axios from 'axios'

const SERVER_URL = 'http://localhost:4000/api'
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json; charset=utf-8',
    }
};

const addCategoryApi = (data) => {
    return axios.post(`${SERVER_URL}/category`, data, config)
}

const getCategoryApi = () => {
    return axios.get(`${SERVER_URL}/category`, config)
}

export {
    addCategoryApi,
    getCategoryApi
}