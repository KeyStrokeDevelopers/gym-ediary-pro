import {
  FETCH_ENQUIRY_DATA, SEARCH_ENQUIRY_DATA, EDIT_ENQUIRY_DATA, ADD_ENQUIRY_DATA, SET_ENQUIRY_DETAILS_FIELD,
  ERROR_ENQUIRY_DATA, SHOW_DETAIL_ENQUIRY, HIDE_DETAIL_ENQUIRY, SUBMIT_ENQUIRY_DATA, CLOSE_ENQUIRY_FORM, LOADING_ACTION_ENQUIRY, CLOSE_ENQUIRY_NOTIF, UPDATE_ENQUIRY_DATA,
} from './actionConstants';
import {
  addEnquiryApi, getEnquiryApi, updateEnquiryDataApi, deleteEnquiryDataApi
} from '../api/enquiry';

const fetchEnquiryData = enquiryData => ({
  type: FETCH_ENQUIRY_DATA,
  payload: enquiryData
});

const updatedEnquiryData = enquiryData => ({
  type: UPDATE_ENQUIRY_DATA,
  payload: enquiryData
});

const submitAction = (enquiryData) => ({
  type: SUBMIT_ENQUIRY_DATA,
  payload: enquiryData
});

export const addEnquiryData = () => ({
  type: ADD_ENQUIRY_DATA
});

export const closeAction = () => ({
  type: CLOSE_ENQUIRY_FORM
});

export const showDetailAction = enquiryData => ({
  type: SHOW_DETAIL_ENQUIRY,
  payload: enquiryData
});

export const editEnquiryData = enquiryData => ({
  type: EDIT_ENQUIRY_DATA,
  payload: enquiryData
});

export const searchEnquiryData = enquiryData => ({
  type: SEARCH_ENQUIRY_DATA,
  payload: enquiryData
});

const errorEnquiryData = error => ({
  type: ERROR_ENQUIRY_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_ENQUIRY_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_ENQUIRY
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_ENQUIRY
});

export const closeNotifAction = () => ({
  type: CLOSE_ENQUIRY_NOTIF
});


export const submitEnquiryData = (data) => (dispatch) => {
  addEnquiryApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorEnquiryData(err));
  });
};

export const getEnquiryData = () => (dispatch) => {
  getEnquiryApi().then((response) => {
    dispatch(fetchEnquiryData(response.data));
  }).catch((err) => {
    dispatch(errorEnquiryData(err));
  });
};

export const updateEnquiryData = (data) => (dispatch) => {
  updateEnquiryDataApi(data).then((response) => {
    dispatch(updatedEnquiryData(response.data));
  }).catch((err) => {
    dispatch(errorEnquiryData(err));
  });
};

export const deleteEnquiryData = (data) => (dispatch) => {
  deleteEnquiryDataApi(data).then((response) => {
    dispatch(fetchEnquiryData(response.data));
  }).catch((err) => {
    dispatch(errorEnquiryData(err));
  });
};
