import {
  FETCH_SUBSCRIPTION_DATA, FETCH_SUBSCRIPTION_ACTIVE_DATA, SEARCH_SUBSCRIPTION_DATA, EDIT_SUBSCRIPTION_DATA, ADD_SUBSCRIPTION_DATA, SET_SUBSCRIPTION_DETAILS_FIELD,
  ERROR_SUBSCRIPTION_DATA, SHOW_DETAIL_SUBSCRIPTION, HIDE_DETAIL_SUBSCRIPTION, CLOSE_SUBSCRIPTION_FORM, LOADING_ACTION_SUBSCRIPTION, CLOSE_SUBSCRIPTION_NOTIF
} from './actionConstants';
import {
  addSubscriptionApi, getSubscriptionApi, updateSubscriptionDataApi, deleteSubscriptionDataApi, getSubscriptionActiveApi
} from '../api/subscription';

const fetchSubscriptionData = data => ({
  type: FETCH_SUBSCRIPTION_DATA,
  payload: data
});

const fetchSubscriptionActiveData = data => ({
  type: FETCH_SUBSCRIPTION_ACTIVE_DATA,
  payload: data
});

export const addSubscriptionData = () => ({
  type: ADD_SUBSCRIPTION_DATA
});

export const closeAction = () => ({
  type: CLOSE_SUBSCRIPTION_FORM
});

export const showDetailAction = data => ({
  type: SHOW_DETAIL_SUBSCRIPTION,
  payload: data
});

export const editSubscriptionData = data => ({
  type: EDIT_SUBSCRIPTION_DATA,
  payload: data
});

export const searchSubscriptionData = data => ({
  type: SEARCH_SUBSCRIPTION_DATA,
  payload: data
});

const errorSubscriptionData = error => ({
  type: ERROR_SUBSCRIPTION_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_SUBSCRIPTION_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_SUBSCRIPTION
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_SUBSCRIPTION
});

export const closeNotifAction = () => ({
  type: CLOSE_SUBSCRIPTION_NOTIF
});

export const getSubscriptionActiveData = () => (dispatch) => {
  getSubscriptionActiveApi().then((response) => {
    dispatch(fetchSubscriptionActiveData(response.data));
  }).catch((err) => {
    dispatch(errorSubscriptionData(err));
  });
};

export const submitSubscriptionData = (data) => (dispatch) => {
  addSubscriptionApi(data).then(() => {
    dispatch(getSubscriptionActiveData());
  }).catch((err) => {
    dispatch(errorSubscriptionData(err));
  });
};

export const getMasterPackageData = () => (dispatch) => {
  getSubscriptionApi().then((response) => {
    dispatch(fetchSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorSubscriptionData(err));
  });
};

export const updateSubscriptionData = (data) => (dispatch) => {
  updateSubscriptionDataApi(data).then((response) => {
    dispatch(fetchSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorSubscriptionData(err));
  });
};

export const deleteSubscriptionData = (data) => (dispatch) => {
  deleteSubscriptionDataApi(data).then((response) => {
    dispatch(fetchSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorSubscriptionData(err));
  });
};
