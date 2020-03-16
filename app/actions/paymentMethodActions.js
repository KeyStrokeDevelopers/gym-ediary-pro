import {
  FETCH_PAYMENT_METHOD_DATA, SEARCH_PAYMENT_METHOD_DATA, EDIT_PAYMENT_METHOD_DATA, ADD_PAYMENT_METHOD_DATA, SET_PAYMENT_METHOD_DETAILS_FIELD,
  ERROR_PAYMENT_METHOD_DATA, SHOW_DETAIL_PAYMENT_METHOD, HIDE_DETAIL_PAYMENT_METHOD, SUBMIT_PAYMENT_METHOD_DATA, CLOSE_PAYMENT_METHOD_FORM, LOADING_ACTION_PAYMENT_METHOD, CLOSE_PAYMENT_METHOD_NOTIF, DELETE_PAYMENT_METHOD_DATA, ACTIVE_PAYMENT_METHOD_DATA
} from './actionConstants';
import {
  addPaymentMethodApi, getPaymentMethodApi, updatePaymentMethodDataApi, deletePaymentMethodDataApi, activePaymentMethodDataApi
} from '../api/paymentMethod';

const fetchPaymentMethodData = paymentMethod => ({
  type: FETCH_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

const setDeletePaymentMethodData = paymentMethod => ({
  type: DELETE_PAYMENT_METHOD_DATA,
  payload: paymentMethod
});

const setActivePaymentMethodData = paymentMethod => ({
  type: ACTIVE_PAYMENT_METHOD_DATA,
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
  payload: error.response.data.message
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

export const closeNotifAction = () => ({
  type: CLOSE_PAYMENT_METHOD_NOTIF
});

export const submitPaymentMethodData = (data) => (dispatch) => {
  addPaymentMethodApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorPaymentMethodData(err));
  });
};

export const getPaymentMethodData = () => (dispatch) => {
  getPaymentMethodApi().then((response) => {
    dispatch(fetchPaymentMethodData(response.data));
  }).catch((err) => {
    dispatch(errorPaymentMethodData(err));
  });
};

export const updatePaymentMethodData = (data) => (dispatch) => {
  updatePaymentMethodDataApi(data).then((response) => {
    dispatch(fetchPaymentMethodData(response.data));
  }).catch((err) => {
    dispatch(errorPaymentMethodData(err));
  });
};

export const deletePaymentMethodData = (data) => (dispatch) => {
  deletePaymentMethodDataApi(data).then((response) => {
    dispatch(setDeletePaymentMethodData(response.data));
  }).catch((err) => {
    dispatch(errorPaymentMethodData(err));
  });
};

export const activePaymentMethodData = (data) => (dispatch) => {
  activePaymentMethodDataApi(data).then((response) => {
    dispatch(setActivePaymentMethodData(response.data));
  }).catch((err) => {
    dispatch(errorPaymentMethodData(err));
  });
};
