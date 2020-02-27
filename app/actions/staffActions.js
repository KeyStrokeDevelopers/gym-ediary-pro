import { toast } from 'react-toastify';
import {
  FETCH_STAFF_DATA, SEARCH_STAFF_DATA, EDIT_STAFF_DATA, ADD_STAFF_DATA, SET_STAFF_DETAILS_FIELD,
  ERROR_STAFF_DATA, SHOW_DETAIL_STAFF, HIDE_DETAIL_STAFF, SUBMIT_STAFF_DATA, CLOSE_STAFF_FORM, LOADING_ACTION_STAFF, FETCH_ACCESS_DATA
} from './actionConstants';
import {
  addStaffApi, getStaffApi, updateStaffDataApi, deleteStaffDataApi, fetchAccessDataApi, changePasswordApi
} from '../api/staff';

const fetchStaffData = staffData => ({
  type: FETCH_STAFF_DATA,
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
  payload: error
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


const setAccessData = (accessData) => ({
  type: FETCH_ACCESS_DATA,
  payload: accessData
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

export const fetchAccessData = () => (dispatch) => {
  fetchAccessDataApi().then((response) => {
    dispatch(setAccessData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};

export const submitStaffData = (data) => (dispatch) => {
  addStaffApi(data).then((response) => {
    toast.success('Staff Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};

export const getStaffData = () => (dispatch) => {
  getStaffApi().then((response) => {
    dispatch(fetchStaffData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};

export const updateStaffData = (data) => (dispatch) => {
  updateStaffDataApi(data).then((response) => {
    toast.success('Staff Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchStaffData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};

export const deleteStaffData = (data) => (dispatch) => {
  deleteStaffDataApi(data).then((response) => {
    toast.success('Staff Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchStaffData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};

export const changePassword = (newPassword, staffId) => (dispatch) => {
  changePasswordApi(newPassword, staffId).then((response) => {
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchStaffData(response.data.staffData));
  }).catch((err) => {
    viewError(err);
    dispatch(errorStaffData(err));
  });
};
