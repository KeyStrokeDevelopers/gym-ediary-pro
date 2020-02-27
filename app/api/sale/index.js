import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addSaleApi = (data) => axios.post(`${API_URL}/sale`, data, getConfig());

const getSaleApi = (data) => axios.post(`${API_URL}/sale/getdata`, data, getConfig());

const updateSaleDataApi = (data) => axios.put(`${API_URL}/sale`, data, getConfig());

const getGymInfoApi = () => axios.get(`${API_URL}/gymInfo`, getConfig());

const cancelSaleApi = (data) => axios.post(`${API_URL}/sale/cancel`, data, getConfig());

const deleteSaleDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/sale`, config);
};
export {
  addSaleApi,
  getSaleApi,
  updateSaleDataApi,
  deleteSaleDataApi,
  getGymInfoApi,
  cancelSaleApi
};
