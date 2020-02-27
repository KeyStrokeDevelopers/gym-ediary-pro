import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addBrandUnitApi = (data) => axios.post(`${API_URL}/brandUnit`, data, getConfig());

const getBrandUnitApi = () => axios.get(`${API_URL}/brandUnit`, getConfig());

const updateBrandUnitDataApi = (data) => axios.put(`${API_URL}/brandUnit`, data, getConfig());

const deleteBrandUnitDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/brandUnit`, config);
};
export {
  addBrandUnitApi,
  getBrandUnitApi,
  updateBrandUnitDataApi,
  deleteBrandUnitDataApi
};
