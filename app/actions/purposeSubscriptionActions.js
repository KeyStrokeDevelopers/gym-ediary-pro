import { toast } from 'react-toastify';
import {
  FETCH_PURPOSE_SUBSCRIPTION_DATA, SEARCH_PURPOSE_SUBSCRIPTION_DATA, EDIT_PURPOSE_SUBSCRIPTION_DATA, ADD_PURPOSE_SUBSCRIPTION_DATA, SET_PURPOSE_SUBSCRIPTION_DETAILS_FIELD,
  ERROR_PURPOSE_SUBSCRIPTION_DATA, SHOW_DETAIL_PURPOSE_SUBSCRIPTION, HIDE_DETAIL_PURPOSE_SUBSCRIPTION, SUBMIT_PURPOSE_SUBSCRIPTION_DATA, CLOSE_PURPOSE_SUBSCRIPTION_FORM, LOADING_ACTION_PURPOSE_SUBSCRIPTION
} from './actionConstants';

import {
  addPurposeSubscriptionApi, getPurposeSubscriptionApi, updatePurposeSubscriptionDataApi, deletePurposeSubscriptionDataApi
} from '../api/purposeSubscription';

const fetchPurposeSubscriptionData = purposeSubscriptionData => ({
  type: FETCH_PURPOSE_SUBSCRIPTION_DATA,
  payload: purposeSubscriptionData
});

const submitAction = purposeSubscriptionData => ({
  type: SUBMIT_PURPOSE_SUBSCRIPTION_DATA,
  payload: purposeSubscriptionData
});

export const addPurposeSubscriptionData = () => ({
  type: ADD_PURPOSE_SUBSCRIPTION_DATA
});

export const closeAction = () => ({
  type: CLOSE_PURPOSE_SUBSCRIPTION_FORM
});

export const showDetailAction = purposeSubscriptionData => ({
  type: SHOW_DETAIL_PURPOSE_SUBSCRIPTION,
  payload: purposeSubscriptionData
});

export const editPurposeSubscriptionData = purposeSubscriptionData => ({
  type: EDIT_PURPOSE_SUBSCRIPTION_DATA,
  payload: purposeSubscriptionData
});

export const searchPurposeSubscriptionData = purposeSubscriptionData => ({
  type: SEARCH_PURPOSE_SUBSCRIPTION_DATA,
  payload: purposeSubscriptionData
});

const errorPurposeSubscriptionData = error => ({
  type: ERROR_PURPOSE_SUBSCRIPTION_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_PURPOSE_SUBSCRIPTION_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PURPOSE_SUBSCRIPTION
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PURPOSE_SUBSCRIPTION
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

export const submitPurposeSubscriptionData = (data) => (dispatch) => {
  addPurposeSubscriptionApi(data).then((response) => {
    toast.success('PurposeSubscription Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorPurposeSubscriptionData(err));
    });
};

export const getPurposeSubscriptionData = () => (dispatch) => {
  getPurposeSubscriptionApi().then((response) => {
    dispatch(fetchPurposeSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPurposeSubscriptionData(err));
  });
};

export const updatePurposeSubscriptionData = (data) => (dispatch) => {
  updatePurposeSubscriptionDataApi(data).then((response) => {
    toast.success('PurposeSubscription Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPurposeSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPurposeSubscriptionData(err));
  });
};

export const deletePurposeSubscriptionData = (data) => (dispatch) => {
  deletePurposeSubscriptionDataApi(data).then((response) => {
    toast.success('PurposeSubscription Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPurposeSubscriptionData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPurposeSubscriptionData(err));
  });
};
