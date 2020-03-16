import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addPurposeApi = (data) => axios.post(`${API_URL}/purpose`, data, getConfig());

const getPurposeApi = () => axios.get(`${API_URL}/purpose`, getConfig());

const getActivePurposeApi = (purposeId) => axios.get(`${API_URL}/purpose/active/${purposeId}`, getConfig());

const updatePurposeDataApi = (data) => axios.put(`${API_URL}/purpose`, data, getConfig());

const deletePurposeDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/purpose`, config);
};

const fetchAccessDataApi = () => axios.get(`${API_URL}/access`, getConfig());
export {
  addPurposeApi,
  getPurposeApi,
  updatePurposeDataApi,
  deletePurposeDataApi,
  fetchAccessDataApi,
  getActivePurposeApi
};
