import axios from 'axios';
import { API_URL, configWithoutToken, getConfig } from '../../components/Common/constant';

const registerationApi = (data) => axios.post(`${API_URL}/registration`, data, configWithoutToken());

const userData = () => axios.get(`${API_URL}/staff`, getConfig());

export {
  registerationApi,
  userData
};
