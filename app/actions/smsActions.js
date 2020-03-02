import { toast } from 'react-toastify';
import {
  FETCH_SMS_DATA, SEARCH_SMS_DATA, EDIT_SMS_DATA, ADD_SMS_DATA, SET_SMS_DETAILS_FIELD, FETCH_SMS_ACTIVE_DATA,
  ERROR_SMS_DATA, SHOW_DETAIL_SMS, HIDE_DETAIL_SMS, CLOSE_SMS_FORM, LOADING_ACTION_SMS
} from './actionConstants';
import {
  addSmsApi, getSmsActiveApi, getSmsPackApi, updateSmsDataApi, deleteSmsDataApi
} from '../api/sms';

const fetchSmsData = smsData => ({
  type: FETCH_SMS_DATA,
  payload: smsData
});

const fetchSmsActiveData = smsData => ({
  type: FETCH_SMS_ACTIVE_DATA,
  payload: smsData
});

export const addSmsData = () => ({
  type: ADD_SMS_DATA
});

export const closeAction = () => ({
  type: CLOSE_SMS_FORM
});

export const showDetailAction = smsData => ({
  type: SHOW_DETAIL_SMS,
  payload: smsData
});

export const editSmsData = smsData => ({
  type: EDIT_SMS_DATA,
  payload: smsData
});

export const searchSmsData = smsData => ({
  type: SEARCH_SMS_DATA,
  payload: smsData
});

const errorSmsData = error => ({
  type: ERROR_SMS_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_SMS_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_SMS
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_SMS
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

export const getSmsActiveData = () => (dispatch) => {
  getSmsActiveApi().then((response) => {
    dispatch(fetchSmsActiveData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorSmsData(err));
  });
};

export const submitSmsData = (data) => (dispatch) => {
  addSmsApi(data).then(() => {
    toast.success('Sms Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(getSmsActiveData());
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorSmsData(err));
    });
};

export const getSmsData = () => (dispatch) => {
  getSmsPackApi().then((response) => {
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorSmsData(err));
  });
};

export const updateSmsData = (data) => (dispatch) => {
  updateSmsDataApi(data).then((response) => {
    toast.success('Sms Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorSmsData(err));
  });
};

export const deleteSmsData = (data) => (dispatch) => {
  deleteSmsDataApi(data).then((response) => {
    toast.success('Sms Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorSmsData(err));
  });
};
