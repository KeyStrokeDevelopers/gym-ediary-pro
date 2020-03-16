import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addPackageApi = (data) => axios.post(`${API_URL}/package`, data, getConfig());

const getPackageApi = () => axios.get(`${API_URL}/package`, getConfig());

const activePackageDataApi = (dataId) => axios.get(`${API_URL}/package/active/${dataId}`, getConfig());

const updatePackageDataApi = (data) => axios.put(`${API_URL}/package`, data, getConfig());

const deletePackageDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/package`, config);
};
export {
  addPackageApi,
  getPackageApi,
  updatePackageDataApi,
  deletePackageDataApi,
  activePackageDataApi
};
