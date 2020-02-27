import axios from 'axios';
import { API_URL, getConfig, configWithoutToken } from '../../components/Common/constant';

const signInApi = (data) => axios.post(`${API_URL}/staffInfo/signIn`, data, configWithoutToken());

const getInitialData = () => axios.get(`${API_URL}/staffInfo`, getConfig());

export {
  signInApi,
  getInitialData
};
