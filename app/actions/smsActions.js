import {
  FETCH_SMS_DATA, SEARCH_SMS_DATA, EDIT_SMS_DATA, ADD_SMS_DATA, SET_SMS_DETAILS_FIELD, FETCH_SMS_ACTIVE_DATA,
  ERROR_SMS_DATA, SHOW_DETAIL_SMS, HIDE_DETAIL_SMS, CLOSE_SMS_FORM, LOADING_ACTION_SMS, CLOSE_SMS_NOTIF
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
  payload: error.response.data.message
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

export const closeNotifAction = () => ({
  type: CLOSE_SMS_NOTIF
});

export const getSmsActiveData = () => (dispatch) => {
  getSmsActiveApi().then((response) => {
    dispatch(fetchSmsActiveData(response.data));
  }).catch((err) => {
    dispatch(errorSmsData(err));
  });
};

export const submitSmsData = (data) => (dispatch) => {
  addSmsApi(data).then(() => {
    dispatch(getSmsActiveData());
  }).catch((err) => {
    dispatch(errorSmsData(err));
  });
};

export const getSmsData = () => (dispatch) => {
  getSmsPackApi().then((response) => {
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    dispatch(errorSmsData(err));
  });
};

export const updateSmsData = (data) => (dispatch) => {
  updateSmsDataApi(data).then((response) => {
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    dispatch(errorSmsData(err));
  });
};

export const deleteSmsData = (data) => (dispatch) => {
  deleteSmsDataApi(data).then((response) => {
    dispatch(fetchSmsData(response.data));
  }).catch((err) => {
    dispatch(errorSmsData(err));
  });
};
