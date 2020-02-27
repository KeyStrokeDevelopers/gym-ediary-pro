import axios from 'axios';
import { API_URL, getConfig, configForFilePost } from '../../components/Common/constant';

const addAddMemberApi = (data) => axios.post(`${API_URL}/addMember`, data, configForFilePost());

const getAddMemberApi = () => axios.get(`${API_URL}/addMember`, getConfig());

const updateAddMemberDataApi = (data) => axios.put(`${API_URL}/addMember`, data, getConfig());

const getOccupationDataApi = () => axios.get(`${API_URL}/addMember/occupation`, getConfig());

const deleteAddMemberDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/addMember`, config);
};

const getGymInfoApi = () => axios.get(`${API_URL}/gymInfo`, getConfig());

const sendWishApi = (data) => axios.post(`${API_URL}/addMember/wishes`, data, getConfig());

export {
  addAddMemberApi,
  getAddMemberApi,
  updateAddMemberDataApi,
  getOccupationDataApi,
  deleteAddMemberDataApi,
  getGymInfoApi,
  sendWishApi
};
