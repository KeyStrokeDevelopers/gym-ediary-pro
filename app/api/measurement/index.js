import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addMeasurementApi = (data) => axios.post(`${API_URL}/measurement`, data, getConfig());

const getMeasurementApi = () => axios.get(`${API_URL}/measurement`, getConfig());

const updateMeasurementDataApi = (data) => axios.put(`${API_URL}/measurement`, data, getConfig());

const deleteMeasurementDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/measurement`, config);
};
export {
  addMeasurementApi,
  getMeasurementApi,
  updateMeasurementDataApi,
  deleteMeasurementDataApi
};
