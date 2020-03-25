import * as types from './actionConstants';
import { signInApi, getInitialData } from '../api/signIn';
import history from '../utils/history';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };

const setStaffInfo = staffData => {
  if (staffData.token) {
    window.localStorage.setItem('token', staffData.token);
    history.push('/app');
  }
  return {
    type: types.LOGIN_STAFF,
    payload: staffData
  };
};

const setInitialStaffInfo = staffData => ({
  type: types.STAFF_INITIAL_IFNO,
  payload: staffData
});

const loginError = (err) => {
  window.localStorage.removeItem('token');
  history.push('/login');
  return ({
    type: types.LOGIN_ERROR,
    payload: err.message
  });
};

export const closeNotifAction = () => ({
  type: types.CLOSE_LOGIN_NOTIF
});

export const signIn = (data) => (dispatch) => {
  signInApi(data).then((response) => {
    dispatch(setStaffInfo(response.data));
  }).catch((err) => {
    dispatch(loginError(err));
  });
};

export const initialData = () => (dispatch) => {
  getInitialData().then((response) => {
    dispatch(setInitialStaffInfo(response.data));
  }).catch((err) => {
    dispatch(loginError(err));
  });
};
