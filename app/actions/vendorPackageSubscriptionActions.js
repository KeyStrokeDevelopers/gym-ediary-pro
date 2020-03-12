import {
  FETCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SEARCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, EDIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, ADD_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SET_VENDOR_PACKAGE_SUBSCRIPTION_DETAILS_FIELD,
  ERROR_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SHOW_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, HIDE_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, SUBMIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, CLOSE_VENDOR_PACKAGE_SUBSCRIPTION_FORM, LOADING_ACTION_VENDOR_PACKAGE_SUBSCRIPTION, CLOSE_PACKAGE_SUBSCRIPTION_NOTIF
} from './actionConstants';

import {
  addVendorPackageSubscriptionApi, getVendorPackageApi, updateVendorPackageSubscriptionDataApi, deleteVendorPackageSubscriptionDataApi, getVendorPackageSubscriptionDataByMemberIdApi
} from '../api/vendorPackageSubscription';

const fetchVendorPackageSubscriptionData = vendorPackageSubscriptionData => ({
  type: FETCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: vendorPackageSubscriptionData
});

const submitAction = vendorPackageSubscriptionData => ({
  type: SUBMIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: vendorPackageSubscriptionData
});

export const addVendorPackageSubscriptionData = () => ({
  type: ADD_VENDOR_PACKAGE_SUBSCRIPTION_DATA
});

export const closeAction = () => ({
  type: CLOSE_VENDOR_PACKAGE_SUBSCRIPTION_FORM
});

export const showDetailAction = vendorPackageSubscriptionData => ({
  type: SHOW_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION,
  payload: vendorPackageSubscriptionData
});

export const editVendorPackageSubscriptionData = vendorPackageSubscriptionData => ({
  type: EDIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: vendorPackageSubscriptionData
});

export const searchVendorPackageSubscriptionData = vendorPackageSubscriptionData => ({
  type: SEARCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: vendorPackageSubscriptionData
});

export const closeNotifAction = () => ({
  type: CLOSE_PACKAGE_SUBSCRIPTION_NOTIF
});

const errorVendorPackageSubscriptionData = error => ({
  type: ERROR_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_VENDOR_PACKAGE_SUBSCRIPTION_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_VENDOR_PACKAGE_SUBSCRIPTION
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION
});

export const submitVendorPackageSubscriptionData = (data) => (dispatch) => {
  addVendorPackageSubscriptionApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const getVendorPackageSubscriptionData = () => (dispatch) => {
  getVendorPackageApi().then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const getVendorPackageDataByMemberId = (memberId) => (dispatch) => {
  getVendorPackageSubscriptionDataByMemberIdApi(memberId).then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const updateVendorPackageSubscriptionData = (data) => (dispatch) => {
  updateVendorPackageSubscriptionDataApi(data).then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const deleteVendorPackageSubscriptionData = (data) => (dispatch) => {
  deleteVendorPackageSubscriptionDataApi(data).then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};
