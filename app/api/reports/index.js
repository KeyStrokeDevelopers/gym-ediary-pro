import axios from 'axios';
import { API_URL, getConfig } from '../../components/Common/constant';

export const getPendingPaymentsApi = () => axios.get(`${API_URL}/reports/pendingPayments`, getConfig());

export const getReportsApi = (data) => axios.post(`${API_URL}/reports`, data, getConfig());

export const getExpiringMembershipsApi = () => axios.get(`${API_URL}/reports/expiringMemberships`, getConfig());

export const getExpiredMembersApi = () => axios.get(`${API_URL}/reports/expiredMembers`, getConfig());

export const getNonActiveMembersApi = () => axios.get(`${API_URL}/reports/nonActiveMembers`, getConfig());

export const getClassesApi = () => axios.get(`${API_URL}/reports/classes`, getConfig());

export const getRegistrationDataApi = (data) => axios.post(`${API_URL}/reports/registration`, data, getConfig());

export const markAttendanceApi = (data) => axios.post(`${API_URL}/attendance`, data, getConfig());

export const getAttendanceApi = (data) => axios.post(`${API_URL}/attendance/getAttendance`, data, getConfig());

export const getRenewalDataApi = (data) => axios.post(`${API_URL}/reports/renewal`, data, getConfig());

export const handleDndApi = (memberId) => axios.get(`${API_URL}/reports/dnd/${memberId}`, getConfig());

export const handleCallApi = (memberId) => axios.get(`${API_URL}/reports/call/${memberId}`, getConfig());

export const getCurrentStockApi = (data) => axios.post(`${API_URL}/reports/currentStock`, data, getConfig());
