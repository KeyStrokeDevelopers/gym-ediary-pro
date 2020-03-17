import {
  FETCH_STAFF_DATA, SEARCH_STAFF_DATA, EDIT_STAFF_DATA, ADD_STAFF_DATA, SET_STAFF_DETAILS_FIELD,
  ERROR_STAFF_DATA, SHOW_DETAIL_STAFF, HIDE_DETAIL_STAFF, SUBMIT_STAFF_DATA, CLOSE_STAFF_FORM, LOADING_ACTION_STAFF, FETCH_ACCESS_DATA, SET_STAFF_ATTENDANCE_DATA, SET_STAFF_PROFILE_ATTENDANCE_DATA, CLOSE_STAFF_NOTIF, MARK_STAFF_ATTENDANCE, UPDATED_STAFF_DATA
} from './actionConstants';
import {
  addStaffApi, getStaffApi, updateStaffDataApi, deleteStaffDataApi, fetchAccessDataApi, changePasswordApi, getStaffAttendanceDataApi, markStaffAttendanceApi, fetchStaffAttendanceDataApi
} from '../api/staff';

const fetchStaffData = staffData => ({
  type: FETCH_STAFF_DATA,
  payload: staffData
});

const updatedStaffData = staffData => ({
  type: UPDATED_STAFF_DATA,
  payload: staffData
});

const submitAction = (staffData) => ({
  type: SUBMIT_STAFF_DATA,
  payload: staffData
});

export const addStaffData = () => ({
  type: ADD_STAFF_DATA
});

export const closeAction = () => ({
  type: CLOSE_STAFF_FORM
});

export const showDetailAction = staffData => ({
  type: SHOW_DETAIL_STAFF,
  payload: staffData
});

export const editStaffData = staffData => ({
  type: EDIT_STAFF_DATA,
  payload: staffData
});

export const searchStaffData = staffData => ({
  type: SEARCH_STAFF_DATA,
  payload: staffData
});

const errorStaffData = error => ({
  type: ERROR_STAFF_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_STAFF_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_STAFF
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_STAFF
});

export const closeNotifAction = () => ({
  type: CLOSE_STAFF_NOTIF
});

const setAccessData = (accessData) => ({
  type: FETCH_ACCESS_DATA,
  payload: accessData
});

const setStaffAttendanceData = (attendanceData) => ({
  type: SET_STAFF_ATTENDANCE_DATA,
  payload: attendanceData
});

const markStaffAttendance = (attendanceData) => ({
  type: MARK_STAFF_ATTENDANCE,
  payload: attendanceData
});

const setStaffProfileAttendanceData = (attendanceData) => ({
  type: SET_STAFF_PROFILE_ATTENDANCE_DATA,
  payload: attendanceData
});

export const fetchAccessData = () => (dispatch) => {
  fetchAccessDataApi().then((response) => {
    dispatch(setAccessData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const submitStaffData = (data) => (dispatch) => {
  addStaffApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const getStaffData = () => (dispatch) => {
  getStaffApi().then((response) => {
    dispatch(fetchStaffData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const updateStaffData = (data) => (dispatch) => {
  updateStaffDataApi(data).then((response) => {
    dispatch(updatedStaffData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const deleteStaffData = (data) => (dispatch) => {
  deleteStaffDataApi(data).then((response) => {
    dispatch(fetchStaffData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const changePassword = (newPassword, staffId) => (dispatch) => {
  changePasswordApi(newPassword, staffId).then((response) => {
    dispatch(fetchStaffData(response.data.staffData));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const getStaffAttendanceData = (date) => (dispatch) => {
  getStaffAttendanceDataApi(date).then((response) => {
    dispatch(setStaffAttendanceData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const fetchStaffAttendanceData = (data) => (dispatch) => {
  fetchStaffAttendanceDataApi(data).then((response) => {
    dispatch(setStaffProfileAttendanceData(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};

export const markAttendance = (data) => (dispatch) => {
  markStaffAttendanceApi(data).then((response) => {
    dispatch(markStaffAttendance(response.data));
  }).catch((err) => {
    dispatch(errorStaffData(err));
  });
};
