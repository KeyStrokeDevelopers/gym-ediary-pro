import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addAccountInfoApi = (data) => axios.post(`${API_URL}/accountInfo`, data, getConfig());

const getAccountInfoApi = () => axios.get(`${API_URL}/accountInfo`, getConfig());

const updateAccountInfoDataApi = (data) => axios.put(`${API_URL}/accountInfo`, data, getConfig());

const deleteAccountInfoDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/accountInfo`, config);
};
export {
  addAccountInfoApi,
  getAccountInfoApi,
  updateAccountInfoDataApi,
  deleteAccountInfoDataApi
};
