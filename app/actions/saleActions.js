import {
  FETCH_SALE_DATA, SEARCH_SALE_DATA, EDIT_SALE_DATA, ADD_SALE_DATA, SET_SALE_DETAILS_FIELD, GET_GYM_INFO_DATA_SALE,
  ERROR_SALE_DATA, SHOW_DETAIL_SALE, HIDE_DETAIL_SALE, SUBMIT_SALE_DATA, CLOSE_SALE_FORM, LOADING_ACTION_SALE, SET_VALUE_IN_CART_SALE, RESET_CART_SALE, DELETE_CART_VALUE_SALE, SET_ACCOUNT_DATA_SALE, HANDLE_NEXT_STEP_SALE, HANDLE_BACK_STEP_SALE, SHOPING_AGAIN_SALE, SET_BILL_INFO_DATA_SALE, SET_DISCOUNT_SALE, SET_DISCOUNT_IN_VALUE_SALE, SET_PAID_AMOUNT, CLOSE_SALE_NOTIF
} from './actionConstants';
import {
  addSaleApi, getSaleApi, updateSaleDataApi, deleteSaleDataApi, getGymInfoApi, cancelSaleApi
} from '../api/sale';

const fetchSaleData = saleData => ({
  type: FETCH_SALE_DATA,
  payload: saleData
});

const submitAction = saleData => ({
  type: SUBMIT_SALE_DATA,
  payload: saleData
});

const fetchGymInfoData = gymInfoData => ({
  type: GET_GYM_INFO_DATA_SALE,
  payload: gymInfoData
});

export const setDiscount = (value) => ({
  type: SET_DISCOUNT_SALE,
  payload: value
});

export const setDiscountInValue = (value) => ({
  type: SET_DISCOUNT_IN_VALUE_SALE,
  payload: value
});

export const setPaidAmount = (paidAmount) => ({
  type: SET_PAID_AMOUNT,
  payload: paidAmount
});

export const handleNextStep = () => ({
  type: HANDLE_NEXT_STEP_SALE
});

export const shopingAgain = () => ({
  type: SHOPING_AGAIN_SALE
});

export const handleBack = () => ({
  type: HANDLE_BACK_STEP_SALE
});

export const setCustomerInfo = accountData => ({
  type: SET_ACCOUNT_DATA_SALE,
  payload: accountData
});

export const setBillInfoData = billInfoData => ({
  type: SET_BILL_INFO_DATA_SALE,
  payload: billInfoData
});

export const resetCart = () => ({
  type: RESET_CART_SALE
});

export const deleteCartValue = (index) => ({
  type: DELETE_CART_VALUE_SALE,
  payload: index
});

export const addSaleData = () => ({
  type: ADD_SALE_DATA
});

export const closeAction = () => ({
  type: CLOSE_SALE_FORM
});

export const showDetailAction = saleData => ({
  type: SHOW_DETAIL_SALE,
  payload: saleData
});

export const setInCart = cartData => ({
  type: SET_VALUE_IN_CART_SALE,
  payload: cartData
});

const cancelInvoiceData = saleData => ({
  type: EDIT_SALE_DATA,
  payload: saleData
});

export const searchSaleData = saleData => ({
  type: SEARCH_SALE_DATA,
  payload: saleData
});

const errorSaleData = error => ({
  type: ERROR_SALE_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_SALE_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_SALE
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_SALE
});

export const closeNotifAction = () => ({
  type: CLOSE_SALE_NOTIF
});


export const submitSaleData = (data) => (dispatch) => {
  addSaleApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};

export const getSaleData = (data) => (dispatch) => {
  getSaleApi(data).then((response) => {
    dispatch(fetchSaleData(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};

export const updateSaleData = (data) => (dispatch) => {
  updateSaleDataApi(data).then((response) => {
    dispatch(fetchSaleData(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};

export const deleteSaleData = (data) => (dispatch) => {
  deleteSaleDataApi(data).then((response) => {
    dispatch(fetchSaleData(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};


export const getGymInfoData = () => (dispatch) => {
  getGymInfoApi().then((response) => {
    dispatch(fetchGymInfoData(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};

export const cancelInvoice = (data) => (dispatch) => {
  cancelSaleApi(data).then((response) => {
    dispatch(cancelInvoiceData(response.data));
  }).catch((err) => {
    dispatch(errorSaleData(err));
  });
};
