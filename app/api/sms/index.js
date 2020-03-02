import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addSmsApi = (data) => axios.post(`${API_URL}/sms`, data, getConfig());

const getSmsPackApi = () => axios.get(`${API_URL}/sms/pack`, getConfig());

const getSmsActiveApi = () => axios.get(`${API_URL}/sms/active`, getConfig());

const updateSmsDataApi = (data) => axios.put(`${API_URL}/sms`, data, getConfig());

const deleteSmsDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/sms`, config);
};
export {
  addSmsApi,
  getSmsPackApi,
  getSmsActiveApi,
  updateSmsDataApi,
  deleteSmsDataApi
};
