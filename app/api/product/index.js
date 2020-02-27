import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addProductApi = (data) => axios.post(`${API_URL}/product`, data, getConfig());

const getProductApi = () => axios.get(`${API_URL}/product`, getConfig());

const updateProductDataApi = (data) => axios.put(`${API_URL}/product`, data, getConfig());

const fetchProductQuantityApi = (productId) => axios.get(`${API_URL}/product/${productId}`, getConfig());

const deleteProductDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/product`, config);
};
export {
  addProductApi,
  getProductApi,
  updateProductDataApi,
  deleteProductDataApi,
  fetchProductQuantityApi
};
