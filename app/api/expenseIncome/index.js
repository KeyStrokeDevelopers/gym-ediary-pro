import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addExpenseIncomeApi = (data) => axios.post(`${API_URL}/expenseIncome`, data, getConfig());

const getExpenseIncomeApi = () => axios.get(`${API_URL}/expenseIncome`, getConfig());

const updateExpenseIncomeDataApi = (data) => axios.put(`${API_URL}/expenseIncome`, data, getConfig());

const deleteExpenseIncomeDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/expenseIncome`, config);
};
export {
  addExpenseIncomeApi,
  getExpenseIncomeApi,
  updateExpenseIncomeDataApi,
  deleteExpenseIncomeDataApi
};
