import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addCategoryApi = (data) => axios.post(`${API_URL}/category`, data, getConfig());

const getCategoryApi = () => axios.get(`${API_URL}/category`, getConfig());

const activeCategoryDataApi = (categoryId) => axios.get(`${API_URL}/category/active/${categoryId}`, getConfig());

const updateCategoryDataApi = (data) => axios.put(`${API_URL}/category`, data, getConfig());

const deleteCategoryDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/category`, config);
};
export {
  addCategoryApi,
  getCategoryApi,
  updateCategoryDataApi,
  deleteCategoryDataApi,
  activeCategoryDataApi
};
