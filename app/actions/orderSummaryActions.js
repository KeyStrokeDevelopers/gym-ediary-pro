import { toast } from 'react-toastify';
import {
  FETCH_ORDER_SUMMARY_DATA, SEARCH_ORDER_SUMMARY_DATA, EDIT_ORDER_SUMMARY_DATA, ADD_ORDER_SUMMARY_DATA, SET_ORDER_SUMMARY_DETAILS_FIELD,
  ERROR_ORDER_SUMMARY_DATA, SHOW_DETAIL_ORDER_SUMMARY, HIDE_DETAIL_ORDER_SUMMARY, SUBMIT_ORDER_SUMMARY_DATA, CLOSE_ORDER_SUMMARY_FORM, LOADING_ACTION_ORDER_SUMMARY
} from './actionConstants';

import {
  addOrderSummaryApi, getOrderSummaryApi, updateOrderSummaryDataApi, deleteOrderSummaryDataApi
} from '../api/orderSummary';

const fetchOrderSummaryData = orderSummaryData => ({
  type: FETCH_ORDER_SUMMARY_DATA,
  payload: orderSummaryData
});

const submitAction = orderSummaryData => ({
  type: SUBMIT_ORDER_SUMMARY_DATA,
  payload: orderSummaryData
});

export const addOrderSummaryData = () => ({
  type: ADD_ORDER_SUMMARY_DATA
});

export const closeAction = () => ({
  type: CLOSE_ORDER_SUMMARY_FORM
});

export const showDetailAction = orderSummaryData => ({
  type: SHOW_DETAIL_ORDER_SUMMARY,
  payload: orderSummaryData
});

export const editOrderSummaryData = orderSummaryData => ({
  type: EDIT_ORDER_SUMMARY_DATA,
  payload: orderSummaryData
});

export const searchOrderSummaryData = orderSummaryData => ({
  type: SEARCH_ORDER_SUMMARY_DATA,
  payload: orderSummaryData
});

const errorOrderSummaryData = error => ({
  type: ERROR_ORDER_SUMMARY_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_ORDER_SUMMARY_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_ORDER_SUMMARY
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_ORDER_SUMMARY
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

export const submitOrderSummaryData = (data) => (dispatch) => {
  addOrderSummaryApi(data).then((response) => {
    toast.success('OrderSummary Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorOrderSummaryData(err));
    });
};

export const getOrderSummaryData = () => (dispatch) => {
  getOrderSummaryApi().then((response) => {
    dispatch(fetchOrderSummaryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorOrderSummaryData(err));
  });
};

export const updateOrderSummaryData = (data) => (dispatch) => {
  updateOrderSummaryDataApi(data).then((response) => {
    toast.success('OrderSummary Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchOrderSummaryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorOrderSummaryData(err));
  });
};

export const deleteOrderSummaryData = (data) => (dispatch) => {
  deleteOrderSummaryDataApi(data).then((response) => {
    toast.success('OrderSummary Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchOrderSummaryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorOrderSummaryData(err));
  });
};
