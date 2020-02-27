import { toast } from 'react-toastify';
import {
  FETCH_BANK_DATA, SEARCH_BANK_DATA, EDIT_BANK_DATA, ADD_BANK_DATA, SET_BANK_DETAILS_FIELD,
  ERROR_BANK_DATA, SHOW_DETAIL_BANK, HIDE_DETAIL_BANK, SUBMIT_BANK_DATA, CLOSE_BANK_FORM, LOADING_ACTION_BANK
} from './actionConstants';
import {
  addBankApi, getBankApi, updateBankDataApi, deleteBankDataApi
} from '../api/bank';

const fetchBankData = bankData => ({
  type: FETCH_BANK_DATA,
  payload: bankData
});

const submitAction = (bankData) => ({
  type: SUBMIT_BANK_DATA,
  payload: bankData
});

export const addBankData = () => ({
  type: ADD_BANK_DATA
});

export const closeAction = () => ({
  type: CLOSE_BANK_FORM
});

export const showDetailAction = bankData => ({
  type: SHOW_DETAIL_BANK,
  payload: bankData
});

export const editBankData = bankData => ({
  type: EDIT_BANK_DATA,
  payload: bankData
});

export const searchBankData = bankData => ({
  type: SEARCH_BANK_DATA,
  payload: bankData
});

const errorBankData = error => ({
  type: ERROR_BANK_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_BANK_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_BANK
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_BANK
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

export const submitBankData = (data) => (dispatch) => {
  addBankApi(data).then((response) => {
    toast.success('Bank Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorBankData(err));
    });
};

export const getBankData = () => (dispatch) => {
  getBankApi().then((response) => {
    dispatch(fetchBankData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorBankData(err));
  });
};

export const updateBankData = (data) => (dispatch) => {
  updateBankDataApi(data).then((response) => {
    toast.success('Bank Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchBankData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorBankData(err));
  });
};

export const deleteBankData = (data) => (dispatch) => {
  deleteBankDataApi(data).then((response) => {
    toast.success('Bank Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchBankData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorBankData(err));
  });
};
