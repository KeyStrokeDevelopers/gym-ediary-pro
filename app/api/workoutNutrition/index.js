import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addWorkoutNutritionApi = (data) => axios.post(`${API_URL}/workoutNutrition`, data, getConfig());

const getWorkoutNutritionApi = () => axios.get(`${API_URL}/workoutNutrition`, getConfig());

const updateWorkoutNutritionDataApi = (data) => axios.put(`${API_URL}/workoutNutrition`, data, getConfig());

const deleteWorkoutNutritionDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/workoutNutrition`, config);
};

const fetchAccessDataApi = () => axios.get(`${API_URL}/access`, getConfig());
export {
  addWorkoutNutritionApi,
  getWorkoutNutritionApi,
  updateWorkoutNutritionDataApi,
  deleteWorkoutNutritionDataApi,
  fetchAccessDataApi
};
