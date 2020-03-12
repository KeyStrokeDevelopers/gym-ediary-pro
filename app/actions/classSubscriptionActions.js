import {
  FETCH_CLASS_SUBSCRIPTION_DATA, SEARCH_CLASS_SUBSCRIPTION_DATA, EDIT_CLASS_SUBSCRIPTION_DATA, ADD_CLASS_SUBSCRIPTION_DATA, SET_CLASS_SUBSCRIPTION_DETAILS_FIELD,
  ERROR_CLASS_SUBSCRIPTION_DATA, SHOW_DETAIL_CLASS_SUBSCRIPTION, HIDE_DETAIL_CLASS_SUBSCRIPTION, SUBMIT_CLASS_SUBSCRIPTION_DATA, CLOSE_CLASS_SUBSCRIPTION_FORM, LOADING_ACTION_CLASS_SUBSCRIPTION,
  CLOSE_CLASS_SUBSCRIPTION_NOTIF
} from './actionConstants';

import {
  addClassSubscriptionApi, getClassSubscriptionDataApi, updateClassSubscriptionDataApi, deleteClassSubscriptionDataApi
} from '../api/classSubscription';

const fetchClassSubscriptionData = classSubscriptionData => ({
  type: FETCH_CLASS_SUBSCRIPTION_DATA,
  payload: classSubscriptionData
});

const submitAction = classSubscriptionData => ({
  type: SUBMIT_CLASS_SUBSCRIPTION_DATA,
  payload: classSubscriptionData
});

export const addClassSubscriptionData = () => ({
  type: ADD_CLASS_SUBSCRIPTION_DATA
});

export const closeAction = () => ({
  type: CLOSE_CLASS_SUBSCRIPTION_FORM
});

export const showDetailAction = classSubscriptionData => ({
  type: SHOW_DETAIL_CLASS_SUBSCRIPTION,
  payload: classSubscriptionData
});

export const editClassSubscriptionData = classSubscriptionData => ({
  type: EDIT_CLASS_SUBSCRIPTION_DATA,
  payload: classSubscriptionData
});

export const searchClassSubscriptionData = classSubscriptionData => ({
  type: SEARCH_CLASS_SUBSCRIPTION_DATA,
  payload: classSubscriptionData
});

const errorClassSubscriptionData = error => ({
  type: ERROR_CLASS_SUBSCRIPTION_DATA,
  payload: error.response.data.message
});

export const closeNotifAction = () => ({
  type: CLOSE_CLASS_SUBSCRIPTION_NOTIF
});

export const setDetailField = (data) => ({
  type: SET_CLASS_SUBSCRIPTION_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_CLASS_SUBSCRIPTION
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_CLASS_SUBSCRIPTION
});

export const submitClassSubscriptionData = (data) => (dispatch) => {
  addClassSubscriptionApi(data).then((response) => {
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      dispatch(errorClassSubscriptionData(err));
    });
};

export const getClassDataByMemberId = (memberId) => (dispatch) => {
  getClassSubscriptionDataApi(memberId).then((response) => {
    dispatch(fetchClassSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorClassSubscriptionData(err));
  });
};

export const updateClassSubscriptionData = (data) => (dispatch) => {
  updateClassSubscriptionDataApi(data).then((response) => {
    dispatch(fetchClassSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorClassSubscriptionData(err));
  });
};

export const deleteClassSubscriptionData = (data) => (dispatch) => {
  deleteClassSubscriptionDataApi(data).then((response) => {
    dispatch(fetchClassSubscriptionData(response.data));
  }).catch((err) => {
    dispatch(errorClassSubscriptionData(err));
  });
};
