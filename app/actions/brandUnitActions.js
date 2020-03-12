import {
  FETCH_BRAND_UNIT_DATA, SEARCH_BRAND_UNIT_DATA, EDIT_BRAND_UNIT_DATA, ADD_BRAND_UNIT_DATA, SET_BRAND_UNIT_DETAILS_FIELD,
  ERROR_BRAND_UNIT_DATA, SHOW_DETAIL_BRAND_UNIT, HIDE_DETAIL_BRAND_UNIT, SUBMIT_BRAND_UNIT_DATA, CLOSE_BRAND_UNIT_FORM, LOADING_ACTION_BRAND_UNIT, CLOSE_BRAND_UNIT_NOTIF
} from './actionConstants';

import {
  addBrandUnitApi, getBrandUnitApi, updateBrandUnitDataApi, deleteBrandUnitDataApi
} from '../api/brandUnit';

const fetchBrandUnitData = brandUnitData => ({
  type: FETCH_BRAND_UNIT_DATA,
  payload: brandUnitData
});

const submitAction = brandUnitData => ({
  type: SUBMIT_BRAND_UNIT_DATA,
  payload: brandUnitData
});

export const addBrandUnitData = () => ({
  type: ADD_BRAND_UNIT_DATA
});

export const closeAction = () => ({
  type: CLOSE_BRAND_UNIT_FORM
});

export const showDetailAction = brandUnitData => ({
  type: SHOW_DETAIL_BRAND_UNIT,
  payload: brandUnitData
});

export const editBrandUnitData = brandUnitData => ({
  type: EDIT_BRAND_UNIT_DATA,
  payload: brandUnitData
});

export const searchBrandUnitData = brandUnitData => ({
  type: SEARCH_BRAND_UNIT_DATA,
  payload: brandUnitData
});

const errorBrandUnitData = error => ({
  type: ERROR_BRAND_UNIT_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_BRAND_UNIT_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_BRAND_UNIT
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_BRAND_UNIT
});

export const closeNotifAction = () => ({
  type: CLOSE_BRAND_UNIT_NOTIF
});

export const submitBrandUnitData = (data) => (dispatch) => {
  addBrandUnitApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorBrandUnitData(err));
  });
};

export const getBrandUnitData = () => (dispatch) => {
  getBrandUnitApi().then((response) => {
    dispatch(fetchBrandUnitData(response.data));
  }).catch((err) => {
    dispatch(errorBrandUnitData(err));
  });
};

export const updateBrandUnitData = (data) => (dispatch) => {
  updateBrandUnitDataApi(data).then((response) => {
    dispatch(fetchBrandUnitData(response.data));
  }).catch((err) => {
    dispatch(errorBrandUnitData(err));
  });
};

export const deleteBrandUnitData = (data) => (dispatch) => {
  deleteBrandUnitDataApi(data).then((response) => {
    dispatch(fetchBrandUnitData(response.data));
  }).catch((err) => {
    dispatch(errorBrandUnitData(err));
  });
};
