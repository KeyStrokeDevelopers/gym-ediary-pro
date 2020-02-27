import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

const addVendorPackageSubscriptionApi = (data) => axios.post(`${API_URL}/vendorPackageSubscription`, data, getConfig());

const getVendorPackageApi = () => axios.get(`${API_URL}/vendorPackageSubscription`, getConfig());

const getVendorPackageSubscriptionDataByMemberIdApi = (memberId) => axios.get(`${API_URL}/vendorPackageSubscription/${memberId}`, getConfig());

const updateVendorPackageSubscriptionDataApi = (data) => axios.put(`${API_URL}/vendorPackageSubscription`, data, getConfig());

const deleteVendorPackageSubscriptionDataApi = (dataId) => {
  const config = getConfig();
  config.data = { dataId };
  return axios.delete(`${API_URL}/vendorPackageSubscription`, config);
};
export {
  addVendorPackageSubscriptionApi,
  getVendorPackageApi,
  getVendorPackageSubscriptionDataByMemberIdApi,
  updateVendorPackageSubscriptionDataApi,
  deleteVendorPackageSubscriptionDataApi
};
