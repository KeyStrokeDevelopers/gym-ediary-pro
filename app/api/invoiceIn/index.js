import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addInvoiceInApi = (data) => axios.post(`${API_URL}/invoiceIn`, data, getConfig());

const getInvoiceInApi = (data) => axios.post(`${API_URL}/invoiceIn/order`, data, getConfig());

const updateInvoiceInDataApi = (data) => axios.put(`${API_URL}/invoiceIn`, data, getConfig());

const deleteInvoiceInDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/invoiceIn`, config);
};
export {
  addInvoiceInApi,
  getInvoiceInApi,
  updateInvoiceInDataApi,
  deleteInvoiceInDataApi
};
