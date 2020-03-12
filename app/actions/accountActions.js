import {
  FETCH_ACCOUNT_DATA, SEARCH_ACCOUNT_DATA, EDIT_ACCOUNT_DATA, ADD_ACCOUNT_DATA, SET_ACCOUNT_DETAILS_FIELD,
  ERROR_ACCOUNT_DATA, SHOW_DETAIL_ACCOUNT, HIDE_DETAIL_ACCOUNT, SUBMIT_ACCOUNT_DATA, CLOSE_ACCOUNT_FORM, LOADING_ACTION_ACCOUNT, SUBMIT_SALARY_DATA, SET_SALARY_DATA, CLOSE_ACCOUNT_NOTIF
} from './actionConstants';

import {
  addAccountApi, getAccountApi, updateAccountDataApi, deleteAccountDataApi, addSalaryApi, getSalaryDataApi
} from '../api/account';

const fetchAccountData = accountData => ({
  type: FETCH_ACCOUNT_DATA,
  payload: accountData
});

const submitAction = accountData => ({
  type: SUBMIT_ACCOUNT_DATA,
  payload: accountData
});

const submitSalaryAction = salaryData => ({
  type: SUBMIT_SALARY_DATA,
  payload: salaryData
});

const setSalaryData = salaryData => ({
  type: SET_SALARY_DATA,
  payload: salaryData
});

export const closeNotifAction = () => ({
  type: CLOSE_ACCOUNT_NOTIF
});

export const addAccountData = () => ({
  type: ADD_ACCOUNT_DATA
});

export const closeAction = () => ({
  type: CLOSE_ACCOUNT_FORM
});

export const showDetailAction = accountData => ({
  type: SHOW_DETAIL_ACCOUNT,
  payload: accountData
});

export const editAccountData = accountData => ({
  type: EDIT_ACCOUNT_DATA,
  payload: accountData
});

export const searchAccountData = accountData => ({
  type: SEARCH_ACCOUNT_DATA,
  payload: accountData
});

const errorAccountData = error => ({
  type: ERROR_ACCOUNT_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_ACCOUNT_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_ACCOUNT
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_ACCOUNT
});

export const submitAccountData = (data) => (dispatch) => {
  addAccountApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};

export const submitSalaryData = (data) => (dispatch) => {
  addSalaryApi(data).then((response) => {
    dispatch(submitSalaryAction(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};

export const getSalaryData = (data) => (dispatch) => {
  getSalaryDataApi(data).then((response) => {
    dispatch(setSalaryData(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};

export const getAccountData = (memberId) => (dispatch) => {
  getAccountApi(memberId).then((response) => {
    dispatch(fetchAccountData(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};

export const updateAccountData = (data) => (dispatch) => {
  updateAccountDataApi(data).then((response) => {
    dispatch(fetchAccountData(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};

export const deleteAccountData = (data) => (dispatch) => {
  deleteAccountDataApi(data).then((response) => {
    dispatch(fetchAccountData(response.data));
  }).catch((err) => {
    dispatch(errorAccountData(err));
  });
};
