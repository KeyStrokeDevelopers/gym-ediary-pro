import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addSubscriptionApi = (data) => axios.post(`${API_URL}/subscription`, data, getConfig());

const getSubscriptionApi = () => axios.get(`${API_URL}/subscription/masterPack`, getConfig());

const updateSubscriptionDataApi = (data) => axios.put(`${API_URL}/subscription`, data, getConfig());

const getSubscriptionActiveApi = () => axios.get(`${API_URL}/subscription/active`, getConfig());


const deleteSubscriptionDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/subscription`, config);
};
export {
  addSubscriptionApi,
  getSubscriptionApi,
  getSubscriptionActiveApi,
  updateSubscriptionDataApi,
  deleteSubscriptionDataApi
};
