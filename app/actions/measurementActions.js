import { toast } from 'react-toastify';
import {
  FETCH_MEASUREMENT_DATA, SEARCH_MEASUREMENT_DATA, EDIT_MEASUREMENT_DATA, ADD_MEASUREMENT_DATA, SET_MEASUREMENT_DETAILS_FIELD,
  ERROR_MEASUREMENT_DATA, SHOW_DETAIL_MEASUREMENT, HIDE_DETAIL_MEASUREMENT, SUBMIT_MEASUREMENT_DATA, CLOSE_MEASUREMENT_FORM, LOADING_ACTION_MEASUREMENT
} from './actionConstants';

import {
  addMeasurementApi, getMeasurementApi, updateMeasurementDataApi, deleteMeasurementDataApi
} from '../api/measurement';

const fetchMeasurementData = measurementData => ({
  type: FETCH_MEASUREMENT_DATA,
  payload: measurementData
});

const submitAction = measurementData => ({
  type: SUBMIT_MEASUREMENT_DATA,
  payload: measurementData
});

export const addMeasurementData = () => ({
  type: ADD_MEASUREMENT_DATA
});

export const closeAction = () => ({
  type: CLOSE_MEASUREMENT_FORM
});

export const showDetailAction = measurementData => ({
  type: SHOW_DETAIL_MEASUREMENT,
  payload: measurementData
});

export const editMeasurementData = measurementData => ({
  type: EDIT_MEASUREMENT_DATA,
  payload: measurementData
});

export const searchMeasurementData = measurementData => ({
  type: SEARCH_MEASUREMENT_DATA,
  payload: measurementData
});

const errorMeasurementData = error => ({
  type: ERROR_MEASUREMENT_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_MEASUREMENT_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_MEASUREMENT
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_MEASUREMENT
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

export const submitMeasurementData = (data) => (dispatch) => {
  addMeasurementApi(data).then((response) => {
    toast.success('Measurement Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorMeasurementData(err));
    });
};

export const getMeasurementData = () => (dispatch) => {
  getMeasurementApi().then((response) => {
    dispatch(fetchMeasurementData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMeasurementData(err));
  });
};

export const updateMeasurementData = (data) => (dispatch) => {
  updateMeasurementDataApi(data).then((response) => {
    toast.success('Measurement Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchMeasurementData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMeasurementData(err));
  });
};

export const deleteMeasurementData = (data) => (dispatch) => {
  deleteMeasurementDataApi(data).then((response) => {
    toast.success('Measurement Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchMeasurementData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMeasurementData(err));
  });
};
