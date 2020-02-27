import { toast } from 'react-toastify';
import {
  FETCH_MEDIA_DATA, SEARCH_MEDIA_DATA, EDIT_MEDIA_DATA, ADD_MEDIA_DATA, SET_MEDIA_DETAILS_FIELD,
  ERROR_MEDIA_DATA, SHOW_DETAIL_MEDIA, HIDE_DETAIL_MEDIA, SUBMIT_MEDIA_DATA, CLOSE_MEDIA_FORM, LOADING_ACTION_MEDIA
} from './actionConstants';

import {
  addMediaApi, getMediaApi, updateMediaDataApi, deleteMediaDataApi
} from '../api/media';

const fetchMediaData = mediaData => ({
  type: FETCH_MEDIA_DATA,
  payload: mediaData
});

const submitAction = mediaData => ({
  type: SUBMIT_MEDIA_DATA,
  payload: mediaData
});

export const addMediaData = () => ({
  type: ADD_MEDIA_DATA
});

export const closeAction = () => ({
  type: CLOSE_MEDIA_FORM
});

export const showDetailAction = mediaData => ({
  type: SHOW_DETAIL_MEDIA,
  payload: mediaData
});

export const editMediaData = mediaData => ({
  type: EDIT_MEDIA_DATA,
  payload: mediaData
});

export const searchMediaData = mediaData => ({
  type: SEARCH_MEDIA_DATA,
  payload: mediaData
});

const errorMediaData = error => ({
  type: ERROR_MEDIA_DATA,
  payload: error
});

export const setDetailField = (data) => ({
  type: SET_MEDIA_DETAILS_FIELD,
  payload: data
});

export const loadingAction = () => ({
  type: LOADING_ACTION_MEDIA
});

export const hideDetailAction = () => ({
  type: HIDE_DETAIL_MEDIA
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

export const submitMediaData = (data) => (dispatch) => {
  addMediaApi(data).then((response) => {
    toast.success('Media Data Add Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(submitAction(response.data));
  })
    .catch((err) => {
      viewError(err);
      dispatch(errorMediaData(err));
    });
};

export const getMediaData = () => (dispatch) => {
  getMediaApi().then((response) => {
    dispatch(fetchMediaData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMediaData(err));
  });
};

export const updateMediaData = (data) => (dispatch) => {
  updateMediaDataApi(data).then((response) => {
    toast.success('Media Data Updated Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchMediaData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMediaData(err));
  });
};

export const deleteMediaData = (data) => (dispatch) => {
  deleteMediaDataApi(data).then((response) => {
    toast.success('Media Data Remove Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(fetchMediaData(response.data));
  }).catch((err) => {
    viewError(err);
    dispatch(errorMediaData(err));
  });
};
