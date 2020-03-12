import {
  FETCH_INVOICE_IN_DATA, SEARCH_INVOICE_IN_DATA, EDIT_INVOICE_IN_DATA, ADD_INVOICE_IN_DATA, SET_INVOICE_IN_DETAILS_FIELD,
  ERROR_INVOICE_IN_DATA, SHOW_DETAIL_INVOICE_IN, HIDE_DETAIL_INVOICE_IN, SUBMIT_INVOICE_IN_DATA, CLOSE_INVOICE_IN_FORM, LOADING_ACTION_INVOICE_IN, CLOSE_INVOICE_IN_NOTIF
} from './actionConstants';

import {
  addInvoiceInApi, getInvoiceInApi, updateInvoiceInDataApi, deleteInvoiceInDataApi
} from '../api/invoiceIn';

const fetchInvoiceInData = invoiceData => ({
  type: FETCH_INVOICE_IN_DATA,
  payload: invoiceData
});

const submitAction = invoiceData => ({
  type: SUBMIT_INVOICE_IN_DATA,
  payload: invoiceData
});

export const addInvoiceInData = () => ({
  type: ADD_INVOICE_IN_DATA
});

export const closeAction = () => ({
  type: CLOSE_INVOICE_IN_FORM
});

export const showDetailAction = invoiceData => ({
  type: SHOW_DETAIL_INVOICE_IN,
  payload: invoiceData
});

export const editInvoiceInData = invoiceData => ({
  type: EDIT_INVOICE_IN_DATA,
  payload: invoiceData
});

export const searchInvoiceInData = invoiceData => ({
  type: SEARCH_INVOICE_IN_DATA,
  payload: invoiceData
});

const errorInvoiceInData = error => ({
  type: ERROR_INVOICE_IN_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_INVOICE_IN_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_INVOICE_IN
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_INVOICE_IN
});

export const closeNotifAction = () => ({
  type: CLOSE_INVOICE_IN_NOTIF
});

export const submitInvoiceInData = (data) => (dispatch) => {
  addInvoiceInApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorInvoiceInData(err));
  });
};

export const getInvoiceInData = (data) => (dispatch) => {
  getInvoiceInApi(data).then((response) => {
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    dispatch(errorInvoiceInData(err));
  });
};

export const updateInvoiceInData = (data) => (dispatch) => {
  updateInvoiceInDataApi(data).then((response) => {
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    dispatch(errorInvoiceInData(err));
  });
};

export const deleteInvoiceInData = (data) => (dispatch) => {
  deleteInvoiceInDataApi(data).then((response) => {
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    dispatch(errorInvoiceInData(err));
  });
};
