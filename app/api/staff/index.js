import axios from 'axios';
import { API_URL, getConfig, configForFilePost } from '../../components/Common/constant';

const addStaffApi = (data) => axios.post(`${API_URL}/staffInfo`, data, configForFilePost());

const getStaffApi = () => axios.get(`${API_URL}/staffInfo`, getConfig());

const updateStaffDataApi = (data) => axios.put(`${API_URL}/staffInfo`, data, getConfig());

const deleteStaffDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/staffInfo`, config);
};

const changePasswordApi = (newPassword, staffId) => axios.put(`${API_URL}/staffInfo/${staffId}`, newPassword, getConfig());

const fetchAccessDataApi = () => axios.get(`${API_URL}/access`, getConfig());
export {
  addStaffApi,
  getStaffApi,
  updateStaffDataApi,
  deleteStaffDataApi,
  fetchAccessDataApi,
  changePasswordApi
};
