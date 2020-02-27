import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addPurposeSubscriptionApi = (data) => axios.post(`${API_URL}/purposeSubscription`, data, getConfig());

const getPurposeSubscriptionApi = () => axios.get(`${API_URL}/purposeSubscription`, getConfig());

const updatePurposeSubscriptionDataApi = (data) => axios.put(`${API_URL}/purposeSubscription`, data, getConfig());

const deletePurposeSubscriptionDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/purposeSubscription`, config);
};
export {
  addPurposeSubscriptionApi,
  getPurposeSubscriptionApi,
  updatePurposeSubscriptionDataApi,
  deletePurposeSubscriptionDataApi
};
