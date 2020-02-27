import { toast } from 'react-toastify';
import {
  FETCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SEARCH_VENDOR_PACKAGE_SUBSCRIPTION_DATA, EDIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, ADD_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SET_VENDOR_PACKAGE_SUBSCRIPTION_DETAILS_FIELD,
  ERROR_VENDOR_PACKAGE_SUBSCRIPTION_DATA, SHOW_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, HIDE_DETAIL_VENDOR_PACKAGE_SUBSCRIPTION, SUBMIT_VENDOR_PACKAGE_SUBSCRIPTION_DATA, CLOSE_VENDOR_PACKAGE_SUBSCRIPTION_FORM, LOADING_ACTION_VENDOR_PACKAGE_SUBSCRIPTION
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

const errorVendorPackageSubscriptionData = error => ({
  type: ERROR_VENDOR_PACKAGE_SUBSCRIPTION_DATA,
  payload: error
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

const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const submitVendorPackageSubscriptionData = (data) => (dispatch) => {
  addVendorPackageSubscriptionApi(data).then((response) => {
    toast.success('PackageSubscription Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorVendorPackageSubscriptionData(err));
    });
};

export const getVendorPackageSubscriptionData = () => (dispatch) => {
  getVendorPackageApi().then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const getVendorPackageDataByMemberId = (memberId) => (dispatch) => {
  getVendorPackageSubscriptionDataByMemberIdApi(memberId).then((response) => {
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const updateVendorPackageSubscriptionData = (data) => (dispatch) => {
  updateVendorPackageSubscriptionDataApi(data).then((response) => {
    toast.success('PackageSubscription Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};

export const deleteVendorPackageSubscriptionData = (data) => (dispatch) => {
  deleteVendorPackageSubscriptionDataApi(data).then((response) => {
    toast.success('PackageSubscription Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchVendorPackageSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorVendorPackageSubscriptionData(err));
  });
};
