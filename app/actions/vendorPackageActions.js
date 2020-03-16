import {
  FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, ADD_PACKAGE_DATA, SET_PACKAGE_DETAILS_FIELD,
  ERROR_PACKAGE_DATA, SHOW_DETAIL_PACKAGE, HIDE_DETAIL_PACKAGE, SUBMIT_PACKAGE_DATA, CLOSE_PACKAGE_FORM, LOADING_ACTION_PACKAGE, CLOSE_PACKAGE_NOTIF, DELETE_PACKAGE_DATA, ACTIVE_PACKAGE_DATA
} from './actionConstants';
import {
  addPackageApi, getPackageApi, updatePackageDataApi, deletePackageDataApi, activePackageDataApi
} from '../api/package';

const fetchPackageData = packageData => ({
  type: FETCH_PACKAGE_DATA,
  payload: packageData
});

const setDeletePackageData = packageData => ({
  type: DELETE_PACKAGE_DATA,
  payload: packageData
});

const setActivePackageData = packageData => ({
  type: ACTIVE_PACKAGE_DATA,
  payload: packageData
});
const submitAction = (packageData) => ({
  type: SUBMIT_PACKAGE_DATA,
  payload: packageData
});

export const addPackageData = () => ({
  type: ADD_PACKAGE_DATA
});

export const closeAction = () => ({
  type: CLOSE_PACKAGE_FORM
});

export const showDetailAction = packageData => ({
  type: SHOW_DETAIL_PACKAGE,
  payload: packageData
});

export const editPackageData = packageData => ({
  type: EDIT_PACKAGE_DATA,
  payload: packageData
});

export const searchPackageData = packageData => ({
  type: SEARCH_PACKAGE_DATA,
  payload: packageData
});

const errorPackageData = error => ({
  type: ERROR_PACKAGE_DATA,
  payload: error.response.data.message
});

export const setDetailField = (data) => ({
  type: SET_PACKAGE_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_PACKAGE
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_PACKAGE
});

export const closeNotifAction = () => ({
  type: CLOSE_PACKAGE_NOTIF
});

export const submitPackageData = (data) => (dispatch) => {
  addPackageApi(data).then((response) => {
    dispatch(submitAction(response.data));
  }).catch((err) => {
    dispatch(errorPackageData(err));
  });
};

export const getPackageData = () => (dispatch) => {
  getPackageApi().then((response) => {
    dispatch(fetchPackageData(response.data));
  }).catch((err) => {
    dispatch(errorPackageData(err));
  });
};

export const updatePackageData = (data) => (dispatch) => {
  updatePackageDataApi(data).then((response) => {
    dispatch(fetchPackageData(response.data));
  }).catch((err) => {
    dispatch(errorPackageData(err));
  });
};

export const deletePackageData = (data) => (dispatch) => {
  deletePackageDataApi(data).then((response) => {
    dispatch(setDeletePackageData(response.data));
  }).catch((err) => {
    dispatch(errorPackageData(err));
  });
};

export const activePackageData = (data) => (dispatch) => {
  activePackageDataApi(data).then((response) => {
    dispatch(setActivePackageData(response.data));
  }).catch((err) => {
    dispatch(errorPackageData(err));
  });
};
