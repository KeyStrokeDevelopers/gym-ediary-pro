import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addPurchaseApi = (data) => axios.post(`${API_URL}/purchase`, data, getConfig());

const getPurchaseApi = (data) => axios.post(`${API_URL}/purchase/getdata`, data, getConfig());

const updatePurchaseDataApi = (data) => axios.put(`${API_URL}/purchase`, data, getConfig());

const getGymInfoApi = () => axios.get(`${API_URL}/gymInfo`, getConfig());

const deletePurchaseDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/purchase`, config);
};
export {
  addPurchaseApi,
  getPurchaseApi,
  updatePurchaseDataApi,
  deletePurchaseDataApi,
  getGymInfoApi
};
