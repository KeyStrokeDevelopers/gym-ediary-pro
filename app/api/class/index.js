import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addClassApi = (data) => axios.post(`${API_URL}/classInfo`, data, getConfig());

const getClassApi = () => axios.get(`${API_URL}/classInfo`, getConfig());

const updateClassDataApi = (data) => axios.put(`${API_URL}/classInfo`, data, getConfig());

const deleteClassDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/classInfo`, config);
};
export {
  addClassApi,
  getClassApi,
  updateClassDataApi,
  deleteClassDataApi
};
