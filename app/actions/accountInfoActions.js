import {
  FETCH_ACCOUNT_INFO_DATA, SEARCH_ACCOUNT_INFO_DATA, EDIT_ACCOUNT_INFO_DATA, ADD_ACCOUNT_INFO_DATA, SET_ACCOUNT_INFO_DETAILS_FIELD,
  ERROR_ACCOUNT_INFO_DATA, SHOW_DETAIL_ACCOUNT_INFO, HIDE_DETAIL_ACCOUNT_INFO, SUBMIT_ACCOUNT_INFO_DATA, CLOSE_ACCOUNT_INFO_FORM, LOADING_ACTION_ACCOUNT_INFO, CLOSE_ACCOUNT_INFO_NOTIF
} from './actionConstants';

import {
  addAccountInfoApi, getAccountInfoApi, updateAccountInfoDataApi, deleteAccountInfoDataApi, getVendorDataApi, getCustomerDataApi
} from '../api/accountInfo';

const fetchAccountInfoData = accountInfoData => ({
  type: FETCH_ACCOUNT_INFO_DATA,
  payload: accountInfoData
});

const submitAction = accountInfoData => ({
  type: SUBMIT_ACCOUNT_INFO_DATA,
  payload: accountInfoData
});

export const addAccountInfoData = () => ({
  type: ADD_ACCOUNT_INFO_DATA
});

export const closeAction = () => ({
  type: CLOSE_ACCOUNT_INFO_FORM
});

export const showDetailAction = accountInfoData => ({
  type: SHOW_DETAIL_ACCOUNT_INFO,
  payload: accountInfoData
});

export const editAccountInfoData = accountInfoData => ({
  type: EDIT_ACCOUNT_INFO_DATA,
  payload: accountInfoData
});

export const searchAccountInfoData = accountInfoData => ({
  type: SEARCH_ACCOUNT_INFO_DATA,
  payload: accountInfoData
});

const errorAccountInfoData = error => ({
  type: ERROR_ACCOUNT_INFO_DATA,
  payload: error.response.data.message
});

export const closeNotifAction = () => ({
  type: CLOSE_ACCOUNT_INFO_NOTIF
});

export const setDetailField = (data) => ({
  type: SET_ACCOUNT_INFO_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_ACCOUNT_INFO
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_ACCOUNT_INFO
});

export const submitAccountInfoData = (data) => (dispatch) => {
  addAccountInfoApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};

export const getAccountInfoData = () => (dispatch) => {
  getAccountInfoApi().then((response) => {
    dispatch(fetchAccountInfoData(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};

export const getCustomerData = () => (dispatch) => {
  getCustomerDataApi().then((response) => {
    dispatch(fetchAccountInfoData(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};

export const getVendorData = () => (dispatch) => {
  getVendorDataApi().then((response) => {
    dispatch(fetchAccountInfoData(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};

export const updateAccountInfoData = (data) => (dispatch) => {
  updateAccountInfoDataApi(data).then((response) => {
    dispatch(fetchAccountInfoData(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};

export const deleteAccountInfoData = (data) => (dispatch) => {
  deleteAccountInfoDataApi(data).then((response) => {
    dispatch(fetchAccountInfoData(response.data));
  }).catch((err) => {
    dispatch(errorAccountInfoData(err));
  });
};
