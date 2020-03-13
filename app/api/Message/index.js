import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const sendEmailApi = (data) => axios.post(`${API_URL}/sendEmail`, data, getConfig());

const sendSmsApi = (data) => axios.post(`${API_URL}/sendSms`, data, getConfig());

export {
  sendEmailApi,
  sendSmsApi
};
