import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, CLOSE_REGISTRATION_NOTIF } from './actionConstants';
import history from '../utils/history';
import { registerationApi } from '../api/register';

const registrationSuccess = () => {
  history.push('/login');
  return {
    type: REGISTRATION_SUCCESS
  };
};

const registrationFailed = (err) => {
  console.log('error-----', err.response);
  return ({
    type: REGISTRATION_FAILED,
    payload: err.response.data.message
  });
};

export const closeNotifAction = () => ({
  type: CLOSE_REGISTRATION_NOTIF
});

export const closeRegistrationNotifAction = () => ({
  type: CLOSE_REGISTRATION_NOTIF
});

export const registration = (data) => (dispatch) => {
  registerationApi(data).then(() => {
    dispatch(registrationSuccess());
  }).catch((err) => {
    dispatch(registrationFailed(err));
  });
};
