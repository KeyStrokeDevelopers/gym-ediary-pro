import { toast } from 'react-toastify';
import {
  FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, ADD_PACKAGE_DATA, SET_PACKAGE_DETAILS_FIELD,
  ERROR_PACKAGE_DATA, SHOW_DETAIL_PACKAGE, HIDE_DETAIL_PACKAGE, SUBMIT_PACKAGE_DATA, CLOSE_PACKAGE_FORM, LOADING_ACTION_PACKAGE
} from './actionConstants';
import {
  addPackageApi, getPackageApi, updatePackageDataApi, deletePackageDataApi
} from '../api/package';

const fetchPackageData = packageData => ({
  type: FETCH_PACKAGE_DATA,
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
  payload: error
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

const viewError = (error) => {
  const { response } = error;
  const { data } = response;
  const { message } = data;
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });
};

export const submitPackageData = (data) => (dispatch) => {
  addPackageApi(data).then((response) => {
    toast.success('Package Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorPackageData(err));
    });
};

export const getPackageData = () => (dispatch) => {
  getPackageApi().then((response) => {
    dispatch(fetchPackageData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPackageData(err));
  });
};

export const updatePackageData = (data) => (dispatch) => {
  updatePackageDataApi(data).then((response) => {
    toast.success('Package Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPackageData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPackageData(err));
  });
};

export const deletePackageData = (data) => (dispatch) => {
  deletePackageDataApi(data).then((response) => {
    toast.success('Package Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchPackageData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorPackageData(err));
  });
};
