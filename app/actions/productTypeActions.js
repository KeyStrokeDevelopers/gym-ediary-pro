import {
  FETCH_PRODUCT_TYPE_DATA, SEARCH_PRODUCT_TYPE_DATA, EDIT_PRODUCT_TYPE_DATA, ADD_PRODUCT_TYPE_DATA, SET_PRODUCT_TYPE_DETAILS_FIELD,
  ERROR_PRODUCT_TYPE_DATA, SHOW_DETAIL_PRODUCT_TYPE, HIDE_DETAIL_PRODUCT_TYPE, SUBMIT_PRODUCT_TYPE_DATA, CLOSE_PRODUCT_TYPE_FORM, LOADING_ACTION_PRODUCT_TYPE, CLOSE_PRODUCT_TYPE_NOTIF
} from './actionConstants';

import {
  addProductTypeApi, getProductTypeApi, updateProductTypeDataApi, deleteProductTypeDataApi
} from '../api/productType';

const fetchProductTypeData = productTypeData => ({
  type: FETCH_PRODUCT_TYPE_DATA,
  payload: productTypeData
});

const submitAction = productTypeData => ({
  type: SUBMIT_PRODUCT_TYPE_DATA,
  payload: productTypeData
});

export const addProductTypeData = () => ({
  type: ADD_PRODUCT_TYPE_DATA
});

export const closeAction = () => ({
  type: CLOSE_PRODUCT_TYPE_FORM
});

export const showDetailAction = productTypeData => ({
  type: SHOW_DETAIL_PRODUCT_TYPE,
  payload: productTypeData
});

export const editProductTypeData = productTypeData => ({
  type: EDIT_PRODUCT_TYPE_DATA,
  payload: productTypeData
});

export const searchProductTypeData = productTypeData => ({
  type: SEARCH_PRODUCT_TYPE_DATA,
  payload: productTypeData
});

const errorProductTypeData = error => ({
  type: ERROR_PRODUCT_TYPE_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_PRODUCT_TYPE_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PRODUCT_TYPE
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PRODUCT_TYPE
});

export const closeNotifAction = () => ({
  type: CLOSE_PRODUCT_TYPE_NOTIF
});

export const submitProductTypeData = (data) => (dispatch) => {
  addProductTypeApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorProductTypeData(err));
  });
};

export const getProductTypeData = () => (dispatch) => {
  getProductTypeApi().then((response) => {
    dispatch(fetchProductTypeData(response.data));
  }).catch((err) => {
    dispatch(errorProductTypeData(err));
  });
};

export const updateProductTypeData = (data) => (dispatch) => {
  updateProductTypeDataApi(data).then((response) => {
    dispatch(fetchProductTypeData(response.data));
  }).catch((err) => {
    dispatch(errorProductTypeData(err));
  });
};

export const deleteProductTypeData = (data) => (dispatch) => {
  deleteProductTypeDataApi(data).then((response) => {
    dispatch(fetchProductTypeData(response.data));
  }).catch((err) => {
    dispatch(errorProductTypeData(err));
  });
};
