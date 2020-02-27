import { toast } from 'react-toastify';
import {
  FETCH_INVOICE_IN_DATA, SEARCH_INVOICE_IN_DATA, EDIT_INVOICE_IN_DATA, ADD_INVOICE_IN_DATA, SET_INVOICE_IN_DETAILS_FIELD,
  ERROR_INVOICE_IN_DATA, SHOW_DETAIL_INVOICE_IN, HIDE_DETAIL_INVOICE_IN, SUBMIT_INVOICE_IN_DATA, CLOSE_INVOICE_IN_FORM, LOADING_ACTION_INVOICE_IN
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
  payload: error
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

const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const submitInvoiceInData = (data) => (dispatch) => {
  addInvoiceInApi(data).then((response) => {
    toast.success('InvoiceIn Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorInvoiceInData(err));
    });
};

export const getInvoiceInData = (data) => (dispatch) => {
  getInvoiceInApi(data).then((response) => {
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorInvoiceInData(err));
  });
};

export const updateInvoiceInData = (data) => (dispatch) => {
  updateInvoiceInDataApi(data).then((response) => {
    toast.success('InvoiceIn Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorInvoiceInData(err));
  });
};

export const deleteInvoiceInData = (data) => (dispatch) => {
  deleteInvoiceInDataApi(data).then((response) => {
    toast.success('InvoiceIn Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchInvoiceInData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorInvoiceInData(err));
  });
};
