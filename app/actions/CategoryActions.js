import { toast } from 'react-toastify';
import {
  FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, ADD_CATEGORY_DATA, SET_CATEGORY_DETAILS_FIELD,
  ERROR_CATEGORY_DATA, SHOW_DETAIL_CATEGORY, HIDE_DETAIL_CATEGORY, SUBMIT_CATEGORY_DATA, CLOSE_CATEGORY_FORM, LOADING_ACTION_CATEGORY
} from './actionConstants';
import {
  addCategoryApi, getCategoryApi, updateCategoryDataApi, deleteCategoryDataApi
} from '../api/category';

const fetchCategoryData = categoryData => ({
  type: FETCH_CATEGORY_DATA,
  payload: categoryData
});

const submitAction = (categoryData) => ({
  type: SUBMIT_CATEGORY_DATA,
  payload: categoryData
});

export const addCategoryData = () => ({
  type: ADD_CATEGORY_DATA
});

export const closeAction = () => ({
  type: CLOSE_CATEGORY_FORM
});

export const showDetailAction = categoryData => ({
  type: SHOW_DETAIL_CATEGORY,
  payload: categoryData
});

export const editCategoryData = categoryData => ({
  type: EDIT_CATEGORY_DATA,
  payload: categoryData
});

export const searchCategoryData = categoryData => ({
  type: SEARCH_CATEGORY_DATA,
  payload: categoryData
});

const errorCategoryData = error => ({
  type: ERROR_CATEGORY_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_CATEGORY_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_CATEGORY
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_CATEGORY
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

export const submitCategoryData = (data) => (dispatch) => {
  addCategoryApi(data).then((response) => {
    toast.success('Category Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorCategoryData(err));
    });
};

export const getCategoryData = () => (dispatch) => {
  getCategoryApi().then((response) => {
    dispatch(fetchCategoryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorCategoryData(err));
  });
};

export const updateCategoryData = (data) => (dispatch) => {
  updateCategoryDataApi(data).then((response) => {
    toast.success('Category Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchCategoryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorCategoryData(err));
  });
};

export const deleteCategoryData = (data) => (dispatch) => {
  deleteCategoryDataApi(data).then((response) => {
    toast.success('Category Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchCategoryData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorCategoryData(err));
  });
};
