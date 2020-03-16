import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addPaymentMethodApi = (data) => axios.post(`${API_URL}/paymentMethod`, data, getConfig());

const getPaymentMethodApi = () => axios.get(`${API_URL}/paymentMethod`, getConfig());

const updatePaymentMethodDataApi = (data) => axios.put(`${API_URL}/paymentMethod`, data, getConfig());

const activePaymentMethodDataApi = (dataId) => axios.get(`${API_URL}/paymentMethod/active/${dataId}`, getConfig());

const deletePaymentMethodDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/paymentMethod`, config);
};
export {
  addPaymentMethodApi,
  getPaymentMethodApi,
  updatePaymentMethodDataApi,
  deletePaymentMethodDataApi,
  activePaymentMethodDataApi
};
