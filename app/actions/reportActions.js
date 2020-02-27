import { toast } from 'react-toastify';
import {
  FETCH_PENDING_PAYMENTS_DATA, FETCH_REPORTS_DATA, FETCH_EXPIRING_MEMBERSHIPS_DATA, FETCH_EXPIRED_MEMBERS_DATA, FETCH_NON_ACTIVE_MEMBERS_DATA, FETCH_CLASSES_DATA, FETCH_ALL_NEW_REGISTERED_DATA, FETCH_ALL_RENEWED_MEMBERSHIP_DATA, SET_ATTENDANCE, UPDATED_DATA, ERROR_REPORTS_DATA
} from './actionConstants';
import {
  getPendingPaymentsApi, getReportsApi, getExpiringMembershipsApi, getExpiredMembersApi, getNonActiveMembersApi, getClassesApi, getRegistrationDataApi, getRenewalDataApi, markAttendanceApi, getAttendanceApi, handleDndApi, handleCallApi
} from '../api/reports';

const fetchPendingPaymentsData = reportData => ({
  type: FETCH_PENDING_PAYMENTS_DATA,
  payload: reportData
});

const fetchReportsData = reportData => ({
  type: FETCH_REPORTS_DATA,
  payload: reportData
});

const fetchExpiringMembershipsData = reportData => ({
  type: FETCH_EXPIRING_MEMBERSHIPS_DATA,
  payload: reportData
});

const fetchExpiredMembersData = reportData => ({
  type: FETCH_EXPIRED_MEMBERS_DATA,
  payload: reportData
});

const fetchNonActiveMembersData = reportData => ({
  type: FETCH_NON_ACTIVE_MEMBERS_DATA,
  payload: reportData
});

const fetchClassesData = reportData => ({
  type: FETCH_CLASSES_DATA,
  payload: reportData
});

const fetchRegistrationData = reportData => ({
  type: FETCH_ALL_NEW_REGISTERED_DATA,
  payload: reportData
});

const fetchAllRenewalData = reportData => ({
  type: FETCH_ALL_RENEWED_MEMBERSHIP_DATA,
  payload: reportData
});

const errorReportsData = error => ({
  type: ERROR_REPORTS_DATA,
  payload: error
});

const setMarkAttendance = () => ({
  type: UPDATED_DATA
});

const setAttendance = attendance => ({
  type: SET_ATTENDANCE,
  payload: attendance
});

const updateData = () => ({
  type: UPDATED_DATA
});


const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const getPendingPaymentsData = () => (dispatch) => {
  getPendingPaymentsApi().then((response) => {
    dispatch(fetchPendingPaymentsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getReportsData = (data) => (dispatch) => {
  getReportsApi(data).then((response) => {
    dispatch(fetchReportsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getExpiringMembershipsData = () => (dispatch) => {
  getExpiringMembershipsApi().then((response) => {
    dispatch(fetchExpiringMembershipsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getExpiredMembersData = () => (dispatch) => {
  getExpiredMembersApi().then((response) => {
    dispatch(fetchExpiredMembersData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getNonActiveMembersData = () => (dispatch) => {
  getNonActiveMembersApi().then((response) => {
    dispatch(fetchNonActiveMembersData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getClassesData = () => (dispatch) => {
  getClassesApi().then((response) => {
    dispatch(fetchClassesData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getRegistrationData = (data) => (dispatch) => {
  getRegistrationDataApi(data).then((response) => {
    dispatch(fetchRegistrationData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getRenewalData = (data) => (dispatch) => {
  getRenewalDataApi(data).then((response) => {
    dispatch(fetchAllRenewalData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const markAttendance = (data) => (dispatch) => {
  markAttendanceApi(data).then((response) => {
    dispatch(setMarkAttendance(response));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const getAttendance = (memberId) => (dispatch) => {
  getAttendanceApi(memberId).then((response) => {
    dispatch(setAttendance(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};


export const handleDnd = (memberId) => (dispatch) => {
  handleDndApi(memberId).then((response) => {
    dispatch(updateData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};

export const handleCall = (memberId) => (dispatch) => {
  handleCallApi(memberId).then((response) => {
    dispatch(updateData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorReportsData(err));
  });
};
