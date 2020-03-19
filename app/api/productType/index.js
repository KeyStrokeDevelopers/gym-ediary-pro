import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addProductTypeApi = (data) => axios.post(`${API_URL}/productType`, data, getConfig());

const activeProductTypeDataApi = (dataId) => axios.get(`${API_URL}/productType/active/${dataId}`, getConfig());

const getProductTypeApi = () => axios.get(`${API_URL}/productType`, getConfig());

const updateProductTypeDataApi = (data) => axios.put(`${API_URL}/productType`, data, getConfig());

const deleteProductTypeDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/productType`, config);
};
export {
  addProductTypeApi,
  getProductTypeApi,
  updateProductTypeDataApi,
  deleteProductTypeDataApi,
  activeProductTypeDataApi
};
