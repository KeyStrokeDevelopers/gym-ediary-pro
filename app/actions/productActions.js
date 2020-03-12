import {
  FETCH_PRODUCT_SHOPING_DATA, SEARCH_PRODUCT_SHOPING_DATA, EDIT_PRODUCT_SHOPING_DATA, ADD_PRODUCT_SHOPING_DATA, SET_PRODUCT_SHOPING_DETAILS_FIELD,
  ERROR_PRODUCT_SHOPING_DATA, SHOW_DETAIL_PRODUCT_SHOPING, HIDE_DETAIL_PRODUCT_SHOPING, SUBMIT_PRODUCT_SHOPING_DATA, CLOSE_PRODUCT_SHOPING_FORM, LOADING_ACTION_PRODUCT_SHOPING, FETCH_PRODUCT_QUANTITY, CLOSE_PRODUCT_SHOPING_NOTIF
} from './actionConstants';

import {
  addProductApi, getProductApi, updateProductDataApi, deleteProductDataApi, fetchProductQuantityApi
} from '../api/product';

const fetchProductData = productData => ({
  type: FETCH_PRODUCT_SHOPING_DATA,
  payload: productData
});

const submitAction = productData => ({
  type: SUBMIT_PRODUCT_SHOPING_DATA,
  payload: productData
});

const setProductQuantity = productQuantity => ({
  type: FETCH_PRODUCT_QUANTITY,
  payload: productQuantity
});

export const addProductData = () => ({
  type: ADD_PRODUCT_SHOPING_DATA
});

export const closeAction = () => ({
  type: CLOSE_PRODUCT_SHOPING_FORM
});

export const showDetailAction = productData => ({
  type: SHOW_DETAIL_PRODUCT_SHOPING,
  payload: productData
});

export const editProductData = productData => ({
  type: EDIT_PRODUCT_SHOPING_DATA,
  payload: productData
});

export const searchProductData = productData => ({
  type: SEARCH_PRODUCT_SHOPING_DATA,
  payload: productData
});

const errorProductData = error => ({
  type: ERROR_PRODUCT_SHOPING_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_PRODUCT_SHOPING_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PRODUCT_SHOPING
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PRODUCT_SHOPING
});

export const closeNotifAction = () => ({
  type: CLOSE_PRODUCT_SHOPING_NOTIF
});

export const submitProductData = (data) => (dispatch) => {
  addProductApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorProductData(err));
  });
};

export const getProductData = () => (dispatch) => {
  getProductApi().then((response) => {
    dispatch(fetchProductData(response.data));
  }).catch((err) => {
    dispatch(errorProductData(err));
  });
};

export const updateProductData = (data) => (dispatch) => {
  updateProductDataApi(data).then((response) => {
    dispatch(fetchProductData(response.data));
  }).catch((err) => {
    dispatch(errorProductData(err));
  });
};

export const deleteProductData = (data) => (dispatch) => {
  deleteProductDataApi(data).then((response) => {
    dispatch(fetchProductData(response.data));
  }).catch((err) => {
    dispatch(errorProductData(err));
  });
};


export const fetchProductQuantity = (productId) => (dispatch) => {
  fetchProductQuantityApi(productId).then((response) => {
    dispatch(setProductQuantity(response.data));
  }).catch((err) => {
    dispatch(errorProductData(err));
  });
};
