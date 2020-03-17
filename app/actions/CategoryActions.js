import {
  FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, ADD_CATEGORY_DATA, SET_CATEGORY_DETAILS_FIELD,
  ERROR_CATEGORY_DATA, SHOW_DETAIL_CATEGORY, HIDE_DETAIL_CATEGORY, SUBMIT_CATEGORY_DATA, CLOSE_CATEGORY_FORM, LOADING_ACTION_CATEGORY, CLOSE_CATEGORY_NOTIF, DELETE_CATEGORY_DATA, ACTIVE_CATEGORY_DATA, UPDATED_CATEGORY_DATA
} from './actionConstants';
import {
  addCategoryApi, getCategoryApi, updateCategoryDataApi, deleteCategoryDataApi, activeCategoryDataApi
} from '../api/category';

const fetchCategoryData = categoryData => ({
  type: FETCH_CATEGORY_DATA,
  payload: categoryData
});

const setUpdatedCategoryData = categoryData => ({
  type: UPDATED_CATEGORY_DATA,
  payload: categoryData
});

const setDeleteCategoryData = categoryData => ({
  type: DELETE_CATEGORY_DATA,
  payload: categoryData
});

const setActiveCategoryData = categoryData => ({
  type: ACTIVE_CATEGORY_DATA,
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
  payload: error.response.data.message
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

export const closeNotifAction = () => ({
  type: CLOSE_CATEGORY_NOTIF
});

export const submitCategoryData = (data) => (dispatch) => {
  addCategoryApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorCategoryData(err));
  });
};

export const getCategoryData = () => (dispatch) => {
  getCategoryApi().then((response) => {
    dispatch(fetchCategoryData(response.data));
  }).catch((err) => {
    dispatch(errorCategoryData(err));
  });
};

export const updateCategoryData = (data) => (dispatch) => {
  updateCategoryDataApi(data).then((response) => {
    dispatch(setUpdatedCategoryData(response.data));
  }).catch((err) => {
    dispatch(errorCategoryData(err));
  });
};

export const deleteCategoryData = (data) => (dispatch) => {
  deleteCategoryDataApi(data).then((response) => {
    dispatch(setDeleteCategoryData(response.data));
  }).catch((err) => {
    dispatch(errorCategoryData(err));
  });
};

export const activeCategoryData = (data) => (dispatch) => {
  activeCategoryDataApi(data).then((response) => {
    dispatch(setActiveCategoryData(response.data));
  }).catch((err) => {
    dispatch(errorCategoryData(err));
  });
};
