import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const resetPasswordApi = (data) => axios.post(`${API_URL}/resetPassword`, data, getConfig());

const userData = () => axios.get(`${API_URL}/staff`, getConfig());

export {
  resetPasswordApi,
  userData
};
