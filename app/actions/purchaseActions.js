import {
  FETCH_PURCHASE_DATA, SEARCH_PURCHASE_DATA, EDIT_PURCHASE_DATA, ADD_PURCHASE_DATA, SET_PURCHASE_DETAILS_FIELD, GET_GYM_INFO_DATA,
  ERROR_PURCHASE_DATA, SHOW_DETAIL_PURCHASE, HIDE_DETAIL_PURCHASE, SUBMIT_PURCHASE_DATA, CLOSE_PURCHASE_FORM, LOADING_ACTION_PURCHASE, SET_VALUE_IN_CART, RESET_CART, DELETE_CART_VALUE, SET_ACCOUNT_DATA, HANDLE_NEXT_STEP, HANDLE_BACK_STEP, SHOPING_AGAIN, SET_BILL_INFO_DATA, SET_DISCOUNT, SET_DISCOUNT_IN_VALUE, CLOSE_PURCHASE_NOTIF
} from './actionConstants';

import {
  addPurchaseApi, getPurchaseApi, updatePurchaseDataApi, deletePurchaseDataApi, getGymInfoApi
} from '../api/purchase';

const fetchPurchaseData = purchaseData => ({
  type: FETCH_PURCHASE_DATA,
  payload: purchaseData
});

const submitAction = purchaseData => ({
  type: SUBMIT_PURCHASE_DATA,
  payload: purchaseData
});

const fetchGymInfoData = gymInfoData => ({
  type: GET_GYM_INFO_DATA,
  payload: gymInfoData
});

export const setDiscount = (value) => ({
  type: SET_DISCOUNT,
  payload: value
});

export const setDiscountInValue = (value) => ({
  type: SET_DISCOUNT_IN_VALUE,
  payload: value
});

export const handleNextStep = () => ({
  type: HANDLE_NEXT_STEP
});

export const shopingAgain = () => ({
  type: SHOPING_AGAIN
});

export const handleBack = () => ({
  type: HANDLE_BACK_STEP
});

export const setAccountInfo = accountData => ({
  type: SET_ACCOUNT_DATA,
  payload: accountData
});

export const setBillInfoData = billInfoData => ({
  type: SET_BILL_INFO_DATA,
  payload: billInfoData
});

export const resetCart = () => ({
  type: RESET_CART
});

export const deleteCartValue = (index) => ({
  type: DELETE_CART_VALUE,
  payload: index
});

export const addPurchaseData = () => ({
  type: ADD_PURCHASE_DATA
});

export const closeAction = () => ({
  type: CLOSE_PURCHASE_FORM
});

export const showDetailAction = purchaseData => ({
  type: SHOW_DETAIL_PURCHASE,
  payload: purchaseData
});

export const setInCart = cartData => ({
  type: SET_VALUE_IN_CART,
  payload: cartData
});

export const editPurchaseData = purchaseData => ({
  type: EDIT_PURCHASE_DATA,
  payload: purchaseData
});

export const searchPurchaseData = purchaseData => ({
  type: SEARCH_PURCHASE_DATA,
  payload: purchaseData
});

const errorPurchaseData = error => ({
  type: ERROR_PURCHASE_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_PURCHASE_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PURCHASE
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PURCHASE
});

export const closeNotifAction = () => ({
  type: CLOSE_PURCHASE_NOTIF
});

export const submitPurchaseData = (data) => (dispatch) => {
  console.log('purdata   submit purchase data hit ---***---', data);
  addPurchaseApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorPurchaseData(err));
  });
};

export const getPurchaseData = (data) => (dispatch) => {
  getPurchaseApi(data).then((response) => {
    dispatch(fetchPurchaseData(response.data));
  }).catch((err) => {
    dispatch(errorPurchaseData(err));
  });
};

export const updatePurchaseData = (data) => (dispatch) => {
  updatePurchaseDataApi(data).then((response) => {
    dispatch(fetchPurchaseData(response.data));
  }).catch((err) => {
    dispatch(errorPurchaseData(err));
  });
};

export const deletePurchaseData = (data) => (dispatch) => {
  deletePurchaseDataApi(data).then((response) => {
    dispatch(fetchPurchaseData(response.data));
  }).catch((err) => {
    dispatch(errorPurchaseData(err));
  });
};


export const getGymInfoData = () => (dispatch) => {
  getGymInfoApi().then((response) => {
    dispatch(fetchGymInfoData(response.data));
  }).catch((err) => {
    dispatch(errorPurchaseData(err));
  });
};
