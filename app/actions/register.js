import { toast } from 'react-toastify';
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS } from './actionConstants';
import history from '../utils/history';
import { registerationApi } from '../api/register';

const registrationSuccess = () => {
  history.push('/login');
  return {
    type: REGISTRATION_SUCCESS
  };
};

const registrationFailed = () => ({
  type: REGISTRATION_FAILED
});

const registration = (data) => (dispatch) => {
  registerationApi(data).then(() => {
    toast.success('Registration success', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(registrationSuccess());
  })
    .catch(() => {
      toast.error('Request Failed', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(registrationFailed());
    });
};

export default registration;
