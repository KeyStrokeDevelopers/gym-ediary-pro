import axios from 'axios';
import { API_URL, getConfig, configForFilePost } from '../../components/Common/constant';

const addMediaApi = (data) => axios.post(`${API_URL}/media`, data, configForFilePost());

const getMediaApi = () => axios.get(`${API_URL}/media`, getConfig());

const updateMediaDataApi = (data) => axios.put(`${API_URL}/media`, data, getConfig());

const deleteMediaDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/media`, config);
};
export {
  addMediaApi,
  getMediaApi,
  updateMediaDataApi,
  deleteMediaDataApi
};
