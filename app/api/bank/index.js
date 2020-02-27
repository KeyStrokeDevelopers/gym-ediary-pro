import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';


const addBankApi = (data) => axios.post(`${API_URL}/bank`, data, getConfig());

const getBankApi = () => axios.get(`${API_URL}/bank`, getConfig());

const updateBankDataApi = (data) => axios.put(`${API_URL}/bank`, data, getConfig());

const deleteBankDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/bank`, config);
};
export {
  addBankApi,
  getBankApi,
  updateBankDataApi,
  deleteBankDataApi
};
