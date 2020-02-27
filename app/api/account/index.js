import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addAccountApi = (data) => axios.post(`${API_URL}/account`, data, getConfig());

const getAccountApi = (memberId) => axios.get(`${API_URL}/account/${memberId}`, getConfig());

const updateAccountDataApi = (data) => axios.put(`${API_URL}/account`, data, getConfig());

const deleteAccountDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/account`, config);
};
export {
  addAccountApi,
  getAccountApi,
  updateAccountDataApi,
  deleteAccountDataApi
};
