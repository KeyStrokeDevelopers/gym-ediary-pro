import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addEnquiryApi = (data) => axios.post(`${API_URL}/enquiry`, data, getConfig());

const getEnquiryApi = () => axios.get(`${API_URL}/enquiry`, getConfig());

const updateEnquiryDataApi = (data) => axios.put(`${API_URL}/enquiry`, data, getConfig());

const deleteEnquiryDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/enquiry`, config);
};
export {
  addEnquiryApi,
  getEnquiryApi,
  updateEnquiryDataApi,
  deleteEnquiryDataApi
};
