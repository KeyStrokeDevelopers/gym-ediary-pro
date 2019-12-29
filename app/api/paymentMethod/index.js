import axios from 'axios'

const SERVER_URL = 'http://localhost:4000/api'
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json; charset=utf-8',
    }
};

const addPaymentMethodApi = (data) => {
    return axios.post(`${SERVER_URL}/paymentMethod`, data, config)
}

const getPaymentMethodApi = () => {
    return axios.get(`${SERVER_URL}/paymentMethod`, config)
}

export {
    addPaymentMethodApi,
    getPaymentMethodApi
}