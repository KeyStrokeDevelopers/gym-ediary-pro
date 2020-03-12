
import notifT from 'dan-api/ui/notifType';
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, CLOSE_REGISTRATION_NOTIF } from '../../actions/actionConstants';

const initialState = {
  registrationInfo: {},
  notifMsg: '',
  notifType: '', // success or error
  openNoti: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        notifMsg: 'Registration success',
        notifType: notifT.success,
        openNoti: true,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        notifMsg: action.payload,
        notifType: notifT.error,
        openNoti: true
      };

    case CLOSE_REGISTRATION_NOTIF:
      return {
        ...state,
        openNoti: false
      };

    default:
      return state;
  }
}
