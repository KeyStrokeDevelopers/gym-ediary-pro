import { toast } from 'react-toastify';
import {
  FETCH_PAYMENT_METHOD_DATA, SEARCH_PAYMENT_METHOD_DATA, EDIT_PAYMENT_METHOD_DATA, ADD_PAYMENT_METHOD_DATA, SET_PAYMENT_METHOD_DETAILS_FIELD,
  ERROR_PAYMENT_METHOD_DATA, SHOW_DETAIL_PAYMENT_METHOD, HIDE_DETAIL_PAYMENT_METHOD, SUBMIT_PAYMENT_METHOD_DATA, CLOSE_PAYMENT_METHOD_FORM, LOADING_ACTION_PAYMENT_METHOD
} from './actionConstants';
import {
  addPaymentMethodApi, getPaymentMethodApi, updatePaymentMethodDataApi, deletePaymentMethodDataApi
} from '../api/paymentMethod';

const fetchPaymentMethodData = paymentMethod => ({
  type: FETCH_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

const submitAction = (paymentMethod) => ({
  type: SUBMIT_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

export const addPaymentMethodData = () => ({
  type: ADD_PAYMENT_METHOD_DATA
});

export const closeAction = () => ({
  type: CLOSE_PAYMENT_METHOD_FORM
});

export const showDetailAction = paymentMethod => ({
  type: SHOW_DETAIL_PAYMENT_METHOD,
  payload: paymentMethod
});

export const editPaymentMethodData = paymentMethod => ({
  type: EDIT_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

export const searchPaymentMethodData = paymentMethod => ({
  type: SEARCH_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

const errorPaymentMethodData = error => ({
  type: ERROR_PAYMENT_METHOD_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_PAYMENT_METHOD_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PAYMENT_METHOD
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PAYMENT_METHOD
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

export const submitPaymentMethodData = (data) => (dispatch) => {
  addPaymentMethodApi(data).then((response) => {
    toast.success('PaymentMethod Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorPaymentMethodData(err));
    });
};

export const getPaymentMethodData = () => (dispatch) => {
  getPaymentMethodApi().then((response) => {
    dispatch(fetchPaymentMethodData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPaymentMethodData(err));
  });
};

export const updatePaymentMethodData = (data) => (dispatch) => {
  updatePaymentMethodDataApi(data).then((response) => {
    toast.success('PaymentMethod Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPaymentMethodData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPaymentMethodData(err));
  });
};

export const deletePaymentMethodData = (data) => (dispatch) => {
  deletePaymentMethodDataApi(data).then((response) => {
    toast.success('PaymentMethod Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPaymentMethodData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPaymentMethodData(err));
  });
};
