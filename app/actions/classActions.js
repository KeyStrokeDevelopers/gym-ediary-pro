import {
  FETCH_CLASS_DATA, SEARCH_CLASS_DATA, EDIT_CLASS_DATA, ADD_CLASS_DATA, SET_CLASS_DETAILS_FIELD,
  ERROR_CLASS_DATA, SHOW_DETAIL_CLASS, HIDE_DETAIL_CLASS, SUBMIT_CLASS_DATA, CLOSE_CLASS_FORM, LOADING_ACTION_CLASS, CLOSE_CLASS_NOTIF, ACTIVE_CLASS_DATA, DELETE_CLASS_DATA
} from './actionConstants';
import {
  addClassApi, getClassApi, updateClassDataApi, deleteClassDataApi, activeClassDataApi
} from '../api/class';

const fetchClassData = classData => ({
  type: FETCH_CLASS_DATA,
  payload: classData
});

const setActiveClassData = classData => ({
  type: ACTIVE_CLASS_DATA,
  payload: classData
});

const setDeleteClassData = classData => ({
  type: DELETE_CLASS_DATA,
  payload: classData
});

const submitAction = classData => ({
  type: SUBMIT_CLASS_DATA,
  payload: classData
});

export const addClassData = () => ({
  type: ADD_CLASS_DATA
});

export const closeAction = () => ({
  type: CLOSE_CLASS_FORM
});

export const showDetailAction = classData => ({
  type: SHOW_DETAIL_CLASS,
  payload: classData
});

export const editClassData = classData => ({
  type: EDIT_CLASS_DATA,
  payload: classData
});

export const searchClassData = classData => ({
  type: SEARCH_CLASS_DATA,
  payload: classData
});

const errorClassData = error => ({
  type: ERROR_CLASS_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_CLASS_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_CLASS
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_CLASS
});

export const closeNotifAction = () => ({
  type: CLOSE_CLASS_NOTIF
});

export const submitClassData = (data) => (dispatch) => {
  addClassApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorClassData(err));
  });
};

export const getClassData = () => (dispatch) => {
  getClassApi().then((response) => {
    dispatch(fetchClassData(response.data));
  }).catch((err) => {
    dispatch(errorClassData(err));
  });
};

export const updateClassData = (data) => (dispatch) => {
  updateClassDataApi(data).then((response) => {
    dispatch(fetchClassData(response.data));
  }).catch((err) => {
    dispatch(errorClassData(err));
  });
};

export const deleteClassData = (data) => (dispatch) => {
  deleteClassDataApi(data).then((response) => {
    dispatch(setDeleteClassData(response.data));
  }).catch((err) => {
    dispatch(errorClassData(err));
  });
};

export const activeClassData = (data) => (dispatch) => {
  activeClassDataApi(data).then((response) => {
    dispatch(setActiveClassData(response.data));
  }).catch((err) => {
    dispatch(errorClassData(err));
  });
};
