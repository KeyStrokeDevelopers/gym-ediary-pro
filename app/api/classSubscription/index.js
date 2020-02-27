import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addClassSubscriptionApi = (data) => axios.post(`${API_URL}/classSubscription`, data, getConfig());

const getClassSubscriptionDataApi = (memberId) => axios.get(`${API_URL}/classSubscription/${memberId}`, getConfig());

const updateClassSubscriptionDataApi = (data) => axios.put(`${API_URL}/classSubscription`, data, getConfig());

const deleteClassSubscriptionDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/classSubscription`, config);
};
export {
  addClassSubscriptionApi,
  getClassSubscriptionDataApi,
  updateClassSubscriptionDataApi,
  deleteClassSubscriptionDataApi
};
