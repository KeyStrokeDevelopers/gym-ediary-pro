import {
  FETCH_PURPOSE_DATA, SEARCH_PURPOSE_DATA, EDIT_PURPOSE_DATA, ADD_PURPOSE_DATA, SET_PURPOSE_DETAILS_FIELD,
  ERROR_PURPOSE_DATA, SHOW_DETAIL_PURPOSE, HIDE_DETAIL_PURPOSE, SUBMIT_PURPOSE_DATA, CLOSE_PURPOSE_FORM, LOADING_ACTION_PURPOSE, FETCH_ACCESS_DATA, CLOSE_PURPOSE_NOTIF
} from './actionConstants';
import {
  addPurposeApi, getPurposeApi, updatePurposeDataApi, deletePurposeDataApi, fetchAccessDataApi
} from '../api/purpose';

const fetchPurposeData = purposeData => ({
  type: FETCH_PURPOSE_DATA,
  payload: purposeData
});

const submitAction = (purposeData) => ({
  type: SUBMIT_PURPOSE_DATA,
  payload: purposeData
});

export const addPurposeData = () => ({
  type: ADD_PURPOSE_DATA
});

export const closeAction = () => ({
  type: CLOSE_PURPOSE_FORM
});

export const showDetailAction = purposeData => ({
  type: SHOW_DETAIL_PURPOSE,
  payload: purposeData
});

export const editPurposeData = purposeData => ({
  type: EDIT_PURPOSE_DATA,
  payload: purposeData
});

export const searchPurposeData = purposeData => ({
  type: SEARCH_PURPOSE_DATA,
  payload: purposeData
});

const errorPurposeData = error => ({
  type: ERROR_PURPOSE_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_PURPOSE_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PURPOSE
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PURPOSE
});

export const closeNotifAction = () => ({
  type: CLOSE_PURPOSE_NOTIF
});

const setAccessData = (accessData) => ({
  type: FETCH_ACCESS_DATA,
  payload: accessData
});

export const fetchAccessData = () => (dispatch) => {
  fetchAccessDataApi().then((response) => {
    dispatch(setAccessData(response.data));
  }).catch((err) => {
    dispatch(errorPurposeData(err));
  });
};

export const submitPurposeData = (data) => (dispatch) => {
  addPurposeApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorPurposeData(err));
  });
};

export const getPurposeData = () => (dispatch) => {
  getPurposeApi().then((response) => {
    dispatch(fetchPurposeData(response.data));
  }).catch((err) => {
    dispatch(errorPurposeData(err));
  });
};

export const updatePurposeData = (data) => (dispatch) => {
  updatePurposeDataApi(data).then((response) => {
    dispatch(fetchPurposeData(response.data));
  }).catch((err) => {
    dispatch(errorPurposeData(err));
  });
};

export const deletePurposeData = (data) => (dispatch) => {
  deletePurposeDataApi(data).then((response) => {
    dispatch(fetchPurposeData(response.data));
  }).catch((err) => {
    dispatch(errorPurposeData(err));
  });
};
