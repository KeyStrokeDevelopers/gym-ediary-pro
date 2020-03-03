import { toast } from 'react-toastify';
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

const loginError = err => {
  console.log('erro in login ', err);
  return {
    type: types.LOGIN_ERROR,
    payload: err
  };
};

export const signIn = (data) => (dispatch) => {
  signInApi(data).then((response) => {
    toast.success('Sigin in success', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(setStaffInfo(response.data));
  })
    .catch((err) => {
      toast.error('Registered, Contact or password is incorrect', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(loginError(err));
    });
};

export const initialData = () => (dispatch) => {
  getInitialData().then((response) => {
    dispatch(setInitialStaffInfo(response.data));
  })
    .catch((err) => {
      dispatch(loginError(err));
    });
};
