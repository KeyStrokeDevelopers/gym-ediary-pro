import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addOrderSummaryApi = (data) => axios.post(`${API_URL}/orderSummary`, data, getConfig());

const getOrderSummaryApi = () => axios.get(`${API_URL}/orderSummary`, getConfig());

const updateOrderSummaryDataApi = (data) => axios.put(`${API_URL}/orderSummary`, data, getConfig());

const deleteOrderSummaryDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/orderSummary`, config);
};
export {
  addOrderSummaryApi,
  getOrderSummaryApi,
  updateOrderSummaryDataApi,
  deleteOrderSummaryDataApi
};
